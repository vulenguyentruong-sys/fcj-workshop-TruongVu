---
title: "Bảo mật, Kiểm định Chất lượng & Giám sát"
date: 2026-11-26
weight: 5
chapter: false
pre: " <b> 5.5. </b> "
---

#### Bảo mật Tầng Ứng dụng (Application Hardening)

Bên cạnh lớp bảo vệ biên (**AWS WAF**, **CloudFront** và **VPC 3 tầng cô lập**), MediMind áp dụng phòng thủ đa tầng trực tiếp trong mã nguồn:

| Lớp Bảo vệ | Tệp Thực thi | Quy tắc & Giới hạn Cưỡng chế |
| :--- | :--- | :--- |
| **Kiểm tra Tệp & Magic Bytes** | `core/storage_service.py` | Chỉ cho phép `jpg`, `jpeg`, `png`, `pdf`, `docx`, `doc`; tối đa `10 MB` (`5 MB` base64); kiểm tra chữ ký nhị phân (Magic Bytes) và chặn Path Traversal (`is_safe_path`). |
| **Chống Decompression & Zip Bomb** | `core/storage_service.py` | Giới hạn ảnh $\le 25\text{ MP}$ và cạnh $\le 8000\text{px}$; PDF $\le 30\text{ trang}$; DOCX giải nén $\le 50\text{ MB}$, $\le 500$ mục và tỷ lệ nén $< 50\text{x}$. |
| **CSRF & Rate Limiting** | `core/csrf_protection.py`, `core/rate_limit_service.py` | Xác thực CSRF token cho mọi thao tác thay đổi dữ liệu và giới hạn tần suất theo IP thực từ ALB header. |
| **RBAC & Che PII trong Log** | `core/models.py`, `core/logging_redaction.py` | Kiểm tra `owner_id` trên mọi API hồ sơ (chống IDOR) và tự động ẩn danh số điện thoại, email, API key trước khi đẩy log về CloudWatch. |

#### Cơ chế Chịu lỗi & Circuit Breaker (`core/circuit_breaker.py`)

Nhằm ngăn ngừa sập dây chuyền khi nhà cung cấp AI ngoài (OpenRouter / Gemini) gặp sự cố hoặc giới hạn quota, `core/circuit_breaker.py` bọc các lời gọi AI bằng máy trạng thái 3 bước an toàn đa luồng (`failure_threshold=5`, `cooldown_seconds=30.0`):

{{< mermaid >}}
graph LR
    CLOSED["CLOSED (Suy luận AI Bình thường)"] -->|"5 lỗi tạm thời liên tiếp"| OPEN["OPEN (Ngắt mạch 0ms -> Fallback Engine)"]
    OPEN -->|"Sau 30 giây Cooldown"| HALF["HALF_OPEN (Cho phép 1 Request Thử)"]
    HALF -->|"Thành công"| CLOSED
    HALF -->|"Thất bại"| OPEN
{{< /mermaid >}}

{{% notice info %}}
**Cam kết An toàn Lâm sàng:** Bộ lọc **Tiền kiểm Cấp cứu** (`core/triage.py`) chạy tất định *trước* Circuit Breaker. Mọi ca Cờ đỏ nguy kịch (`115`) luôn được phản hồi tức thì kể cả khi mạch AI đang ở trạng thái `OPEN`.
{{% /notice %}}

#### Kiểm thử Tự động & Ngưỡng Quality Gates

Chạy toàn bộ **83 tệp kiểm thử tự động (`tests/test_*.py`)** và đối chiếu với bộ tiêu chuẩn đóng băng SHA-256 trong `evaluation/quality_gates.json`:

```bash
pytest -q
```

| Nhóm Kiểm định | Chỉ tiêu (`evaluation/quality_gates.json`) | Ngưỡng Bắt buộc |
| :--- | :--- | :---: |
| **An toàn Lâm sàng** | `emergency_recall_min` | **100%** (`1.0`) |
| **An toàn Lâm sàng** | `negation_accuracy_pct_min` | **100.0%** |
| **An toàn Lâm sàng** | `unsafe_advice_rate_pct_max` | **0.0%** |
| **An toàn Lâm sàng** | `false_reassurance_rate_pct_max` | **0.0%** |
| **An toàn Lâm sàng** | `visual_hallucination_rate_pct_max` | **0.0%** |
| **An toàn Lâm sàng** | `fallback_safety_rate_pct_min` & `guardrail_success_rate_pct_min` | **100.0%** |
| **Truy xuất RAG** | `holdout_recall_at_5_min` | **$\ge$ 85%** |
| **Truy xuất RAG** | `candidate_recall_at_20_min` | **$\ge$ 90%** |
| **Truy xuất RAG** | `expansion_recall_at_5_min` (Đa ngữ Việt–Anh) | **$\ge$ 91%** |
| **Truy xuất RAG** | `expansion_candidate_recall_at_20_min` | **$\ge$ 95%** |

#### Giám sát Vận hành, Prometheus/Grafana & AWS Budgets

1. **Stack Giám sát Cục bộ (`monitoring/docker-compose.observability.yml`):** Thu thập metrics từ endpoint `/metrics` (`PORT=8000`) vào **Prometheus (`:9090`)** và **Grafana (`:3000`)**, kết hợp dashboard `/system`:

```bash
docker compose -f monitoring/docker-compose.observability.yml up -d
```

2. **5 Luật Cảnh báo SRE & SIEM (`monitoring/alert_rules.yml`):**
   - `HighHttpErrorRate` (tỷ lệ lỗi HTTP 5xx `> 5%` trong 1 phút)
   - `HighRequestLatency` (độ trễ P95 `> 2.0s` trong 1 phút)
   - `EmergencyTriageSpike` (số ca triage cờ đỏ cấp cứu tăng đột biến)
   - `HighMemoryLoad` (`medimind_system_memory_load_percent > 90%`)
   - `SecurityAttackSpike` (tấn công brute-force / fuzzing / tải tệp độc hại `> 5` sự kiện/phút)
3. **AWS CloudWatch & AWS Budgets:** Theo dõi log ứng dụng đã ẩn danh PII tại `/medimind/clinical-api` và cài đặt cảnh báo ngân sách **AWS Budgets** ở ngưỡng **$20.00/tháng** cho môi trường Dev/PoC.
