---
title: "Triển khai trên EC2, EBS và Nạp Chỉ mục RAG"
date: 2026-11-26
weight: 2
chapter: false
pre: " <b> 5.4.2 </b> "
---

#### Bước 1: Khởi tạo Amazon EC2 trong `Private App Subnet` & Gắn Ổ đĩa EBS (`gp3`)

1. Mở **EC2 Console** (`ap-southeast-1`) và khởi tạo máy chủ với cấu hình:
   - **Name:** `medimind-app-server`
   - **AMI:** Ubuntu Server 22.04 LTS hoặc Amazon Linux 2023 (64-bit x86)
   - **Instance Type:** `t3.micro` (Free Tier PoC) hoặc `t3.small` (2 vCPU, 2 GB RAM khuyến nghị cho EasyOCR + ChromaDB)
   - **Network:** VPC `medimind-vpc`, Subnet `medimind-private-app-a` (`10.0.11.0/24`), **Auto-assign public IP: Disable**
   - **Security Group:** `sg-medimind-ec2`
   - **IAM Instance Profile:** `medimind-ec2-role`
   - **Storage:** Ổ hệ thống 10–15 GB `gp3` + ổ đĩa dữ liệu **20 GB `gp3` EBS được mã hóa KMS** (`/dev/sdf`) chuyên dùng lưu bền vững ChromaDB và `/uploads` (giữ tổng dung lượng EBS $\le 30\text{ GB}$ nếu muốn tối ưu 100% trong gói Free Tier).

#### Bước 2: Kết nối qua Session Manager & Mount Ổ đĩa EBS

1. Trên **EC2 Console**, chọn `medimind-app-server` -> **Connect** -> **Session Manager** (hoặc dùng `aws ssm start-session --target <INSTANCE_ID>`).
2. Cài đặt Docker, `awscli`, `jq`, định dạng ổ đĩa EBS và phân quyền cho `appuser` (`UID/GID 1000`):

```bash
# Cài đặt Docker và công cụ hỗ trợ (Ubuntu)
sudo apt-get update && sudo apt-get install -y docker.io jq awscli
sudo systemctl enable --now docker

# Kiểm tra thiết bị, định dạng và mount ổ đĩa EBS 20 GB
lsblk
sudo mkfs -t ext4 /dev/nvme1n1
sudo mkdir -p /mnt/medimind-data
sudo mount /dev/nvme1n1 /mnt/medimind-data

# Tự động mount lại sau khi khởi động lại EC2
echo "UUID=$(sudo blkid -s UUID -o value /dev/nvme1n1) /mnt/medimind-data ext4 defaults,nofail 0 2" | sudo tee -a /etc/fstab

# Tạo các thư mục dữ liệu bền vững thuộc quyền UID/GID 1000 (appuser)
sudo mkdir -p /mnt/medimind-data/{medical_vectordb,uploads,instance,hf_cache}
sudo chown -R 1000:1000 /mnt/medimind-data
```

#### Bước 3: Nạp Secrets từ AWS Secrets Manager & Khởi chạy Container

1. Đọc 3 nhóm Secrets vào tệp biến môi trường bảo mật (`/etc/medimind.env`, `chmod 600`) và tạo Log Group `/medimind/clinical-api` trên CloudWatch:

```bash
export AWS_REGION=ap-southeast-1
export ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
export ECR_URI="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

aws logs create-log-group --log-group-name /medimind/clinical-api --region $AWS_REGION || true

# Chuyển JSON từ Secrets Manager thành các biến KEY=VALUE
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

2. Kéo Docker Image từ Amazon ECR và khởi chạy `medimind-clinical-api` gắn volume EBS cùng log driver CloudWatch:

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

#### Bước 4: Nạp 364 Tài liệu Y khoa vào ChromaDB & Lên lịch Sao lưu S3

```bash
# Tạo chỉ mục Vector ChromaDB trên ổ đĩa EBS bền vững
sudo docker exec medimind-clinical-api python ingest.py

# Kiểm tra metadata collection đang hoạt động và readiness probe
ls -lh /mnt/medimind-data/medical_vectordb/active_collection.json
curl -s http://localhost:8000/health
curl -s http://localhost:8000/ready
```

Thiết lập lịch đồng bộ hằng ngày bản snapshot ChromaDB và tệp tải lên sang bucket **Amazon S3** đã mã hóa (`Backup / Archive`):

```bash
(sudo crontab -l 2>/dev/null; echo "0 2 * * * aws s3 sync /mnt/medimind-data/medical_vectordb s3://medimind-clinical-backup-${ACCOUNT_ID}/backups/medical_vectordb --delete && aws s3 sync /mnt/medimind-data/uploads s3://medimind-clinical-backup-${ACCOUNT_ID}/backups/uploads") | sudo crontab -
```
