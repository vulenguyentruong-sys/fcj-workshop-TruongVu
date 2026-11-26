---
title: "Khởi tạo RDS PostgreSQL, S3 và Secrets Manager"
date: 2026-11-26
weight: 2
chapter: false
pre: " <b> 5.3.2 </b> "
---

#### Bước 1: Khởi tạo Amazon RDS for PostgreSQL (Private DB Subnet)

Trong khi môi trường phát triển cục bộ dùng SQLite (`sqlite:///./instance/medimind.db`), môi trường Production sử dụng **Amazon RDS for PostgreSQL** thông qua biến `DATABASE_URL` và driver `psycopg2-binary` để đảm bảo toàn vẹn giao dịch ACID và chịu tải đồng thời cao.

1. Trên **RDS Console**, tạo **DB Subnet Group** tên `medimind-db-subnet-group` trong `medimind-vpc` gồm 2 subnet `medimind-private-db-a` (`10.0.21.0/24`) và `medimind-private-db-b` (`10.0.22.0/24`).
2. Khởi tạo DB instance thuộc gói Free Tier với cấu hình:
   - **Engine:** PostgreSQL 16.x
   - **DB Instance Identifier:** `medimind-pg-db`
   - **Instance Class:** `db.t4g.micro` (2 vCPU, 1 GB RAM — miễn phí 750 giờ/tháng trong 12 tháng đầu)
   - **Storage:** 20 GB `gp3` SSD bật **Storage Encryption (AWS KMS)**
   - **Connectivity:** VPC `medimind-vpc`, DB Subnet Group `medimind-db-subnet-group`, **Public access: No**, Security Group: `sg-medimind-rds` (`TCP 5432`)
   - **Initial Database Name:** `medimind` | Master Username: `medimind_admin`

Khi ứng dụng khởi động trên EC2 (`create_app()`), SQLAlchemy (`core/models.py`) sẽ tự động khởi tạo và migrate 6 bảng dữ liệu quan hệ:

| Tên bảng (`__tablename__`) | Lớp ORM | Dữ liệu Lưu trữ |
| :--- | :--- | :--- |
| `users` | `User` | Tài khoản (`patient` / `doctor`), mật khẩu băm an toàn, Google `sub`, BHYT & hồ sơ lâm sàng |
| `medical_documents` | `MedicalDocument` | Siêu dữ liệu đơn thuốc/xét nghiệm, đường dẫn lưu trữ, phân quyền `owner_id`, chẩn đoán |
| `prescription_history` | `PrescriptionHistory` | Lộ trình uống thuốc đã được người bệnh xác nhận (*Sáng – Trưa – Chiều – Tối*) |
| `clinical_consultations` | `ClinicalConsultation` | Điểm & tầng nguy cơ Triage, chẩn đoán phân biệt sơ bộ, nguồn trích dẫn y khoa |
| `intake_sessions` | `IntakeSessionRecord` | Trạng thái hỏi bệnh đa lượt & Bản Tóm tắt Tiền khám 30 giây đã xác nhận |
| `medical_appointments` | `MedicalAppointment` | Lịch hẹn khám bệnh tại mạng lưới 2.144 cơ sở y tế |

#### Bước 2: Tạo Bucket Amazon S3 Sao lưu Mã hóa & Lifecycle Policy

MediMind lưu trực tiếp chỉ mục ChromaDB và ảnh mới tải lên trên Amazon EBS để đọc/ghi tốc độ cao, đồng thời đồng bộ sao lưu được mã hóa lên **Amazon S3**:

```bash
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
BACKUP_BUCKET="medimind-clinical-backup-${ACCOUNT_ID}"

aws s3api create-bucket \
  --bucket $BACKUP_BUCKET \
  --region ap-southeast-1 \
  --create-bucket-configuration LocationConstraint=ap-southeast-1

# Chặn hoàn toàn truy cập công khai và bật Versioning
aws s3api put-public-access-block \
  --bucket $BACKUP_BUCKET \
  --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

aws s3api put-bucket-versioning \
  --bucket $BACKUP_BUCKET \
  --versioning-configuration Status=Enabled
```

Áp dụng **S3 Lifecycle Policy** (`lifecycle.json`) để tự động chuyển bản sao lưu sang **S3 Standard-IA** sau 30 ngày và **S3 Glacier** sau 90 ngày:

```json
{
  "Rules": [
    {
      "ID": "MediMindBackupArchiveTiering",
      "Status": "Enabled",
      "Filter": { "Prefix": "backups/" },
      "Transitions": [
        { "Days": 30, "StorageClass": "STANDARD_IA" },
        { "Days": 90, "StorageClass": "GLACIER" }
      ]
    }
  ]
}
```

```bash
aws s3api put-bucket-lifecycle-configuration \
  --bucket $BACKUP_BUCKET \
  --lifecycle-configuration file://lifecycle.json
```

#### Bước 3: Lưu Biến Bí mật trong AWS Secrets Manager

Khởi tạo **3 nhóm Secrets** (`$0.40/secret/tháng` = `$1.20/tháng`) để không bao giờ lưu cứng mật khẩu hay API Key trong Docker Image hoặc mã nguồn Git:

```bash
# 1. Nhóm App & Kết nối RDS PostgreSQL
aws secretsmanager create-secret \
  --name medimind/app-db \
  --description "MediMind Flask secret key and RDS PostgreSQL URI" \
  --secret-string '{
    "SECRET_KEY": "<GENERATED_64_HEX_SECRET>",
    "DATABASE_URL": "postgresql+psycopg2://medimind_admin:<DB_PASS>@<RDS_ENDPOINT>:5432/medimind"
  }' --region ap-southeast-1

# 2. Nhóm Xác thực Đa kênh, OTP & Bản đồ
aws secretsmanager create-secret \
  --name medimind/auth-otp \
  --description "Google OAuth 2.0, Gmail SMTP, SpeedSMS, and Maps keys" \
  --secret-string '{
    "GOOGLE_CLIENT_ID": "<GOOGLE_CLIENT_ID>",
    "GOOGLE_CLIENT_SECRET": "<GOOGLE_CLIENT_SECRET>",
    "GOOGLE_REDIRECT_URI": "https://medimind.yourdomain.com/auth/google/callback",
    "SMTP_USERNAME": "<EMAIL>@gmail.com",
    "SMTP_PASSWORD": "<GMAIL_APP_PASSWORD>",
    "SPEEDSMS_AUTH_TOKEN": "<SPEEDSMS_TOKEN>",
    "GOOGLE_MAPS_API_KEY": "<MAPS_API_KEY>"
  }' --region ap-southeast-1

# 3. Nhóm API Key OpenRouter Tách biệt theo Tác vụ
aws secretsmanager create-secret \
  --name medimind/ai-providers \
  --description "Separate OpenRouter keys for Chat, OCR, and Nutrition workloads" \
  --secret-string '{
    "AI_PROVIDER": "openrouter",
    "OPENROUTER_API_KEY": "<OPENROUTER_PRIMARY_KEY>",
    "OPENROUTER_CHAT_API_KEY": "<OPENROUTER_CHAT_KEY>",
    "OPENROUTER_OCR_API_KEY": "<OPENROUTER_OCR_KEY>",
    "OPENROUTER_NUTRITION_API_KEY": "<OPENROUTER_NUTRITION_KEY>"
  }' --region ap-southeast-1
```
