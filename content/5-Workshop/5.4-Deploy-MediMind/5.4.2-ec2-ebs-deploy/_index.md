---
title: "Deploy on EC2 with EBS & RAG Indexing"
date: 2026-11-26
weight: 2
chapter: false
pre: " <b> 5.4.2 </b> "
---

#### Step 1: Launch Amazon EC2 in `Private App Subnet` & Attach EBS (`gp3`)

1. Open the **EC2 Console** (`ap-southeast-1`) and launch an instance with:
   - **Name:** `medimind-app-server`
   - **AMI:** Ubuntu Server 22.04 LTS or Amazon Linux 2023 (64-bit x86)
   - **Instance Type:** `t3.micro` (Free Tier PoC) or `t3.small` (2 vCPU, 2 GB RAM recommended for EasyOCR + ChromaDB workloads)
   - **Network:** VPC `medimind-vpc`, Subnet `medimind-private-app-a` (`10.0.11.0/24`), **Auto-assign public IP: Disable**
   - **Security Group:** `sg-medimind-ec2`
   - **IAM Instance Profile:** `medimind-ec2-role`
   - **Storage:** Root volume 15 GB `gp3` + additional encrypted **20 GB `gp3` EBS data volume** (`/dev/sdf`, KMS encrypted) dedicated to persistent ChromaDB vectors and `/uploads` (total 35 GB; keep combined EBS $\le 30\text{ GB}$ if staying strictly within Free Tier).

#### Step 2: Connect Keylessly via Session Manager & Mount the EBS Volume

1. In the **EC2 Console**, select `medimind-app-server` -> **Connect** -> **Session Manager** (or run `aws ssm start-session --target <INSTANCE_ID>`).
2. Install Docker, `awscli`, and `jq`, then format and mount the encrypted EBS volume so the container's `appuser` (`1000:1000`) owns the persistent directories:

```bash
# Install Docker & utilities (Ubuntu example)
sudo apt-get update && sudo apt-get install -y docker.io jq awscli
sudo systemctl enable --now docker

# Format and mount the attached 20 GB EBS data volume (verify device name via lsblk)
lsblk
sudo mkfs -t ext4 /dev/nvme1n1
sudo mkdir -p /mnt/medimind-data
sudo mount /dev/nvme1n1 /mnt/medimind-data

# Persist mount across reboots
echo "UUID=$(sudo blkid -s UUID -o value /dev/nvme1n1) /mnt/medimind-data ext4 defaults,nofail 0 2" | sudo tee -a /etc/fstab

# Create persistent directories owned by container UID/GID 1000 (appuser)
sudo mkdir -p /mnt/medimind-data/{medical_vectordb,uploads,instance,hf_cache}
sudo chown -R 1000:1000 /mnt/medimind-data
```

#### Step 3: Inject Secrets from AWS Secrets Manager & Run the Container

1. Fetch the 3 secret groups into a locked-down runtime environment file (`/etc/medimind.env`, `chmod 600`) and create the CloudWatch Log Group `/medimind/clinical-api`:

```bash
export AWS_REGION=ap-southeast-1
export ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
export ECR_URI="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

aws logs create-log-group --log-group-name /medimind/clinical-api --region $AWS_REGION || true

# Render Secrets Manager JSON entries into KEY=VALUE pairs
sudo bash -c '
  : > /etc/medimind.env
  for SECRET_ID in medimind/app-db medimind/auth-otp medimind/ai-providers; do
    aws secretsmanager get-secret-value --secret-id $SECRET_ID --region ap-southeast-1 \
      --query SecretString --output text | jq -r "to_entries|map(\"\(.key)=\(.value|tostring)\")|.[]" >> /etc/medimind.env
  done
  cat <<EOF >> /etc/medimind.env
PORT=8000
HOST=0.0.0.0
FLASK_ENV=production
TRUST_PROXY_HEADERS=true
TRUSTED_PROXY_COUNT=1
SESSION_COOKIE_SECURE=true
VECTOR_DB_PATH=/app/medical_vectordb
RAG_VECTOR_SEARCH_ENABLED=true
AI_CIRCUIT_BREAKER_ENABLED=true
SYSTEM_METRICS_ENABLED=true
EOF
  chmod 600 /etc/medimind.env
'
```

2. Pull the ECR image and start `medimind-clinical-api` with EBS bind mounts and CloudWatch logging:

```bash
aws ecr get-login-password --region $AWS_REGION | \
  sudo docker login --username AWS --password-stdin $ECR_URI

sudo docker run -d \
  --name medimind-clinical-api \
  --restart unless-stopped \
  -p 8000:8000 \
  --env-file /etc/medimind.env \
  -v /mnt/medimind-data/medical_vectordb:/app/medical_vectordb \
  -v /mnt/medimind-data/uploads:/app/uploads \
  -v /mnt/medimind-data/instance:/app/instance \
  -v /mnt/medimind-data/hf_cache:/home/appuser/.cache/huggingface \
  --log-driver=awslogs \
  --log-opt awslogs-region=$AWS_REGION \
  --log-opt awslogs-group=/medimind/clinical-api \
  --log-opt awslogs-stream=ec2-app-server \
  ${ECR_URI}/medimind-clinical-ai:v1.0.0
```

#### Step 4: Ingest 364 Clinical Documents into ChromaDB & Schedule S3 Backups

```bash
# Build the ChromaDB vector collection on the persistent EBS volume
sudo docker exec medimind-clinical-api python ingest.py

# Verify active collection metadata and readiness probe
ls -lh /mnt/medimind-data/medical_vectordb/active_collection.json
curl -s http://localhost:8000/health
curl -s http://localhost:8000/ready
```

Configure a daily cron job to sync ChromaDB snapshots and medical uploads to your encrypted **Amazon S3** bucket (`Backup / Archive`):

```bash
(sudo crontab -l 2>/dev/null; echo "0 2 * * * aws s3 sync /mnt/medimind-data/medical_vectordb s3://medimind-clinical-backup-${ACCOUNT_ID}/backups/medical_vectordb --delete && aws s3 sync /mnt/medimind-data/uploads s3://medimind-clinical-backup-${ACCOUNT_ID}/backups/uploads") | sudo crontab -
```
