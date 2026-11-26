---
title: "Các bước chuẩn bị"
date: 2026-11-26
weight: 2
chapter: false
pre: " <b> 5.2. </b> "
---

#### Tài khoản & Công cụ Cần thiết

Trước khi khởi tạo hạ tầng AWS hoặc build Docker image, bạn cần chuẩn bị đầy đủ các thành phần sau:
- **Tài khoản AWS** có quyền truy cập khu vực **Asia Pacific (Singapore) `ap-southeast-1`** để khởi tạo VPC, EC2, EBS, RDS, S3, ECR, ALB, CloudFront, WAF, Route 53, ACM, Secrets Manager và CloudWatch.
- **Công cụ trên máy trạm (Workstation):**
  - **AWS CLI v2** (`aws --version`) đã cấu hình qua `aws configure` (`region = ap-southeast-1`).
  - **Docker Engine 24.0+** & **Docker Compose 2.20+** (hoặc Docker Desktop).
  - **Python 3.11+** và **Git** để chạy `pytest` và kiểm tra dữ liệu đánh giá cục bộ.
- **Khóa API AI & Dịch vụ Tích hợp:**
  - **OpenRouter API Key** (tận dụng các mô hình `:free` như `nvidia/nemotron-3.5-super-vl:free` và `nvidia/nemotron-3.5-lightning:free` với chi phí token `$0.00`) và/hoặc **Google Gemini API Key**.
  - *(Tùy chọn cho đăng nhập & bản đồ đầy đủ)* Google OAuth 2.0 Client ID/Secret, Gmail SMTP App Password, SpeedSMS Auth Token và Google Maps Platform API Key.

#### Chính sách Quyền IAM cho Triển khai Workshop

Gắn chính sách IAM đặc quyền tối thiểu sau vào tài khoản/nhóm triển khai Workshop:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "MediMindWorkshopProvisioning",
      "Effect": "Allow",
      "Action": [
        "ec2:*",
        "rds:*",
        "elasticloadbalancing:*",
        "s3:*",
        "ecr:*",
        "secretsmanager:*",
        "cloudfront:*",
        "wafv2:*",
        "acm:*",
        "route53:*",
        "logs:*",
        "cloudwatch:*",
        "ssm:*",
        "budgets:*",
        "iam:CreateRole",
        "iam:DeleteRole",
        "iam:GetRole",
        "iam:PassRole",
        "iam:AttachRolePolicy",
        "iam:DetachRolePolicy",
        "iam:PutRolePolicy",
        "iam:DeleteRolePolicy",
        "iam:CreateInstanceProfile",
        "iam:DeleteInstanceProfile",
        "iam:AddRoleToInstanceProfile",
        "iam:RemoveRoleFromInstanceProfile",
        "iam:CreateServiceLinkedRole"
      ],
      "Resource": "*"
    }
  ]
}
```

#### Kiểm tra Mã nguồn MediMind & Cấu hình `.env`

1. Truy cập thư mục mã nguồn dự án MediMind Clinical AI và rà soát cấu trúc:

```text
chatbot_medical/
├── app.py                     # Máy chủ Flask chính & hơn 50 route REST/SPA
├── core/
│   ├── main_fastapi.py        # FastAPI gateway (gắn WSGIMiddleware, /docs, /health, /ready)
│   ├── triage.py              # Double Guardrails, cờ đỏ cấp cứu & xử lý bẫy phủ định
│   ├── pipeline_orchestrator.py # Pipeline OCR & diễn giải lâm sàng 8 bước
│   ├── rag_service.py         # Dịch vụ Hybrid RAG (BM25 + ChromaDB + BGE Reranker)
│   ├── nutrition_service.py   # Lọc dị ứng tất định Fail-Closed trên ViFoodRec
│   ├── circuit_breaker.py     # Bộ ngắt mạch AI 3 trạng thái (CLOSED / OPEN / HALF_OPEN)
│   ├── storage_service.py     # Kiểm tra Magic Bytes & chống Zip/Decompression Bomb
│   └── models.py              # 6 bảng dữ liệu SQLAlchemy ORM
├── data/                      # 364 tài liệu RAG, 2.462 món ViFoodRec, 2.144 cơ sở y tế
├── evaluation/                # quality_gates.json & 4 bộ dữ liệu benchmark định lượng
├── monitoring/                # Cấu hình Prometheus, Grafana & luật cảnh báo Wazuh
├── tests/                     # 83 tệp kiểm thử tự động pytest
├── Dockerfile                 # Image python:3.11-slim chạy quyền non-root appuser cổng 8000
├── docker-compose.yml         # Cấu hình chạy cục bộ với volume tương đương EBS
└── ingest.py                  # Script nạp chỉ mục vector ChromaDB
```

2. Tạo tệp `.env` từ `.env.example` và rà soát các biến môi trường trọng yếu:

```bash
cp .env.example .env
```

Bảng đối chiếu biến môi trường giữa Local Dev và AWS Production (`core/settings.py`):

| Biến môi trường | Giá trị Local Dev | Giá trị AWS Production | Vai trò |
| :--- | :--- | :--- | :--- |
| `SECRET_KEY` | Chuỗi hex 64 ký tự ngẫu nhiên | Đọc từ Secrets Manager | Khóa ký Session Flask & CSRF token |
| `DATABASE_URL` | `sqlite:///./instance/medimind.db` | `postgresql+psycopg2://...` | Chuỗi kết nối CSDL (RDS `:5432` trên AWS) |
| `PORT` / `HOST` | `8000` / `0.0.0.0` | `8000` / `0.0.0.0` | Cổng lắng nghe của Uvicorn/FastAPI |
| `TRUST_PROXY_HEADERS` | `false` | `true` | Tin cậy header `X-Forwarded-*` từ ALB/CloudFront |
| `SESSION_COOKIE_SECURE` | `false` | `true` | Bắt buộc Cookie chỉ truyền qua HTTPS |
| `AI_PROVIDER` | `openrouter` | `openrouter` | Điều hướng suy luận AI qua OpenRouter |
| `OPENROUTER_CHAT_MODEL` | `openrouter/free` | `openrouter/free` | Mô hình chat lâm sàng & kiểm chứng nguồn |
| `OPENROUTER_OCR_MODEL` | `nvidia/nemotron-3.5-super-vl:free` | `nvidia/nemotron-3.5-super-vl:free` | Vision LLM bóc tách đơn thuốc/xét nghiệm |
| `OPENROUTER_NUTRITION_MODEL` | `nvidia/nemotron-3.5-lightning:free` | `nvidia/nemotron-3.5-lightning:free` | Mô hình xếp hạng thực đơn dinh dưỡng |
| `VECTOR_DB_PATH` | `./medical_vectordb` | `/app/medical_vectordb` | Thư mục lưu chỉ mục ChromaDB trên EBS |
| `AI_CIRCUIT_BREAKER_ENABLED` | `true` | `true` | Tự động ngắt mạch chuyển Fallback sau 5 lỗi |

#### Kiểm thử Khởi chạy Cục bộ với Docker Compose

Xác nhận container build thành công, nạp được chỉ mục ChromaDB và vượt qua các endpoint kiểm tra sức khỏe trước khi đưa lên AWS:

```bash
# 1. Khởi chạy ứng dụng FastAPI + Flask bằng Docker Compose trên cổng 8000
docker compose up -d

# 2. Nạp chỉ mục ChromaDB từ 364 tài liệu y khoa chuẩn hóa
docker compose run --rm medical-api python ingest.py

# 3. Kiểm tra liveness và readiness probe
curl -f http://localhost:8000/health
curl -f http://localhost:8000/ready
```

{{% notice tip %}}
Sau khi `docker compose up -d` chạy ổn định, bạn có thể mở giao diện Web SPA tại `http://localhost:8000`, tài liệu Swagger UI tại `http://localhost:8000/docs` và trang giám sát hệ thống tại `http://localhost:8000/system`.
{{% /notice %}}
