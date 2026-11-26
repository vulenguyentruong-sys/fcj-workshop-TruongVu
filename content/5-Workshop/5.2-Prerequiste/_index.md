---
title: "Prerequisites"
date: 2026-11-26
weight: 2
chapter: false
pre: " <b> 5.2. </b> "
---

#### Required Accounts & Local Tooling

Before provisioning AWS resources or building the container image, ensure you have:
- **AWS Account** with access to the **Asia Pacific (Singapore) `ap-southeast-1`** region and an IAM user/role authorized to create VPC, EC2, EBS, RDS, S3, ECR, ALB, CloudFront, WAF, Route 53, ACM, Secrets Manager, and CloudWatch resources.
- **Local Workstation Tools:**
  - **AWS CLI v2** (`aws --version`) configured via `aws configure` (`region = ap-southeast-1`).
  - **Docker Engine 24.0+** & **Docker Compose 2.20+** (or Docker Desktop).
  - **Python 3.11+** and **Git** (for running `pytest` and inspecting evaluation scripts locally).
- **AI & Integration Keys:**
  - **OpenRouter API Key** (free tier `:free` models such as `nvidia/nemotron-3.5-super-vl:free` and `nvidia/nemotron-3.5-lightning:free` for `$0.00` PoC inference) and/or **Google Gemini API Key**.
  - *(Optional for full auth/maps)* Google OAuth 2.0 Client ID/Secret, Gmail SMTP App Password, SpeedSMS Auth Token, and Google Maps Platform API Key.

#### IAM Permissions Policy for Workshop Deployment

Attach the following least-privilege IAM policy to the workshop deployment user or group (avoiding unrestricted `AdministratorAccess` where not required):

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

#### Inspecting the MediMind Codebase & Configuring `.env`

1. Clone or navigate to the MediMind Clinical AI repository and inspect the core structure:

```text
chatbot_medical/
├── app.py                     # Main Flask application & 50+ REST/SPA routes
├── core/
│   ├── main_fastapi.py        # FastAPI gateway (mounted with WSGIMiddleware, /docs, /health, /ready)
│   ├── triage.py              # Double Guardrails, emergency bypass & negation handling
│   ├── pipeline_orchestrator.py # 8-step OCR & clinical interpretation pipeline
│   ├── rag_service.py         # Hybrid BM25 + ChromaDB + BGE Reranker service
│   ├── nutrition_service.py   # ViFoodRec deterministic Fail-Closed Allergy Filtering
│   ├── circuit_breaker.py     # 3-state AI Circuit Breaker (CLOSED / OPEN / HALF_OPEN)
│   ├── storage_service.py     # Magic-byte & anti-Zip/Decompression Bomb validation
│   └── models.py              # 6 SQLAlchemy ORM tables
├── data/                      # 364 RAG documents, 2,462 ViFoodRec recipes, 2,144 facilities
├── evaluation/                # quality_gates.json & 4 quantitative benchmark datasets
├── monitoring/                # Prometheus, Grafana & Wazuh alert rules
├── tests/                     # 83 automated pytest test files
├── Dockerfile                 # Non-root python:3.11-slim image on port 8000
├── docker-compose.yml         # Local stack with EBS-equivalent volumes
└── ingest.py                  # ChromaDB vector & metadata ingestion script
```

2. Create your `.env` file from `.env.example` and verify the critical runtime parameters:

```bash
cp .env.example .env
```

Key environment variables used in both local Docker verification and AWS production (`core/settings.py`):

| Variable | Dev / Local Value | AWS Production Value | Purpose |
| :--- | :--- | :--- | :--- |
| `SECRET_KEY` | Random 64-char hex | From Secrets Manager | Flask session & CSRF signing key |
| `DATABASE_URL` | `sqlite:///./instance/medimind.db` | `postgresql+psycopg2://...` | SQLAlchemy DB URI (RDS `:5432` in AWS) |
| `PORT` / `HOST` | `8000` / `0.0.0.0` | `8000` / `0.0.0.0` | Uvicorn/FastAPI listening socket |
| `TRUST_PROXY_HEADERS` | `false` | `true` | Honors ALB/CloudFront `X-Forwarded-*` headers |
| `SESSION_COOKIE_SECURE` | `false` | `true` | Enforces HTTPS-only session cookies |
| `AI_PROVIDER` | `openrouter` | `openrouter` | Routes AI inference to OpenRouter |
| `OPENROUTER_CHAT_MODEL` | `openrouter/free` | `openrouter/free` | Primary clinical chat & verification model |
| `OPENROUTER_OCR_MODEL` | `nvidia/nemotron-3.5-super-vl:free` | `nvidia/nemotron-3.5-super-vl:free` | Multimodal Vision OCR schema extraction |
| `OPENROUTER_NUTRITION_MODEL` | `nvidia/nemotron-3.5-lightning:free` | `nvidia/nemotron-3.5-lightning:free` | Clinical nutrition meal ranking |
| `VECTOR_DB_PATH` | `./medical_vectordb` | `/app/medical_vectordb` | Persistent ChromaDB directory on EBS |
| `AI_CIRCUIT_BREAKER_ENABLED` | `true` | `true` | Enables fail-fast fallback after 5 errors |

#### Local Smoke Test with Docker Compose

Verify that the container builds, ingests the ChromaDB knowledge base, and passes liveness/readiness probes locally before deploying to AWS:

```bash
# 1. Start the containerized FastAPI + Flask application on port 8000
docker compose up -d

# 2. Build the ChromaDB vector index from the 364 curated medical documents
docker compose run --rm medical-api python ingest.py

# 3. Verify health, readiness, and API documentation endpoints
curl -f http://localhost:8000/health
curl -f http://localhost:8000/ready
```

{{% notice tip %}}
After `docker compose up -d` succeeds, you can preview the Web SPA at `http://localhost:8000`, Swagger UI at `http://localhost:8000/docs`, and the local observability dashboard at `http://localhost:8000/system`.
{{% /notice %}}
