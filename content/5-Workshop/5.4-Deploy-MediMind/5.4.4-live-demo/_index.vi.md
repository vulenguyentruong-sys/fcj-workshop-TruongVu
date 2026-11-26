---
title: "Kiểm chứng Sản phẩm Thực tế (Live Demo)"
date: 2026-11-26
weight: 4
chapter: false
pre: " <b> 5.4.4 </b> "
---

Khi CloudFront và ALB Health Check báo trạng thái `Healthy`, truy cập `https://medimind.yourdomain.com` (hoặc `http://localhost:8000` khi chạy Docker cục bộ) để kiểm chứng toàn bộ **5 kịch bản Live Demo lâm sàng**.

#### Bước 1: Xác thực Đa kênh (`Luồng 7a, 7b, 8`)

Kiểm tra đăng ký tài khoản, gửi OTP 6 số và đăng nhập Google OAuth 2.0:
- **Đăng ký & OTP qua Email/SMS:** Đăng ký qua `POST /api/auth/register` hoặc yêu cầu mã OTP qua `POST /api/auth/otp/send` (đi qua NAT Gateway tới Gmail SMTP `smtp.gmail.com:587` hoặc SpeedSMS) và xác thực tại `POST /api/auth/otp/verify`.
- **Google OAuth 2.0:** Chọn **Đăng nhập bằng Google** (`GET /api/auth/google/login` -> màn hình cấp quyền Google -> `/api/auth/google/callback`) và kiểm tra bản ghi người dùng được lưu trong **Amazon RDS PostgreSQL** (bảng `users`).

#### Bước 2: Sàng lọc Lâm sàng, Bẫy Phủ định & Grounded RAG (`POST /api/chat`)

Kiểm chứng cả luồng vượt cấp cứu 115 lẫn khả năng chống bẫy phủ định của `core/triage.py` và `core/rag_service.py`:

```bash
# Ca 1 — Cờ đỏ Cấp cứu (Kỳ vọng: Mức Đỏ, cảnh báo gọi 115 tức thì)
curl -s -X POST https://medimind.yourdomain.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tôi đau thắt ngực dữ dội, vã mồ hôi và khó thở lan ra cánh tay trái", "history": []}' | jq .

# Ca 2 — Bẫy Phủ định & Grounded RAG (Kỳ vọng: Không báo động giả, định tuyến Tai Mũi Họng, trích dẫn ChromaDB)
curl -s -X POST https://medimind.yourdomain.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tôi bị đau rát họng, sốt nhẹ 38 độ từ hôm qua nhưng không khó thở, không đau ngực", "history": []}' | jq .
```

- **Kết quả Ca 1:** `risk_level: "red"`, kích hoạt hướng dẫn **Gọi Cấp cứu 115** ngay lập tức, bỏ qua luồng hỏi bệnh thông thường.
- **Kết quả Ca 2:** Bộ phân tích phủ định nhận diện đúng cụm *"không khó thở, không đau ngực"* (không báo nhầm cấp cứu), định tuyến chuyên khoa **Tai Mũi Họng** và đính kèm nguồn trích dẫn thực tế từ **364 tài liệu ChromaDB** (*Bộ Y Tế / kcb.vn / MedlinePlus NIH*).

#### Bước 3: Pipeline OCR Đối soát Song song 8 Bước (`POST /api/prescription/scan`)

Tải ảnh đơn thuốc hoặc phiếu xét nghiệm sinh hóa máu qua giao diện Web SPA hoặc `POST /api/prescription/scan` / `POST /api/upload-lab` để kiểm chứng pipeline (`core/pipeline_orchestrator.py`):

| Bước | Tên Giai đoạn | Kết quả Kiểm chứng |
| :---: | :--- | :--- |
| `[0]` | **Intake & Kiểm tra Chất lượng** | Phát hiện ảnh mờ, tối, lóa sáng và tùy chọn che PII trên ảnh. |
| `[1]` | **Tiền xử lý Nhẹ** | Giữ bản ảnh gốc + xoay thẳng/cắt vùng + tăng tương phản CLAHE khi ảnh tối. |
| `[2]` | **Trích xuất Song song** | Chạy đồng thời **EasyOCR** (`core/ocr_parallel_service.py`) và **Vision LLM** (`nvidia/nemotron-3.5-super-vl:free`). |
| `[3]` | **Đối chiếu Từng trường** | So khớp hai kết quả; tự động bật `needs_review=True` nếu tên thuốc, liều hoặc chỉ số lệch nhau. |
| `[4]` | **Chuẩn hóa & Grounding** | Ánh xạ hoạt chất, đơn vị và khung giờ uống (*Sáng – Trưa – Chiều – Tối*). |
| `[5]` | **Kiểm tra Luật Lâm sàng** | Gắn cờ chỉ số Cao/Thấp, cảnh báo tương tác thuốc và dị ứng của người bệnh. |
| `[6]` | **Diễn giải Lâm sàng** | AI chỉ diễn giải trên JSON đã chuẩn hóa, không bịa thông tin ngoài dữ liệu. |
| `[7]` | **Xác nhận Human-in-the-Loop** | Người bệnh kiểm tra và xác nhận qua `POST /api/prescription/confirm` trước khi lưu `prescription_history`. |

#### Bước 4: Tư vấn Dinh dưỡng Lâm sàng (`POST /api/nutrition/analyze`)

Nhập tình trạng bệnh lý và dị ứng (VD: *"Đau dạ dày, không cay, dị ứng hải sản"*):
- `core/nutrition_rules.py` thực thi lọc dị ứng tất định **Fail-Closed** trên **2.462 công thức ViFoodRec** (2.367 món ăn + 95 đồ uống).
- `core/nutrition_ai.py` chọn tối đa **6 món an toàn** với tên món, nguyên liệu và lượng `kcal` khóa chặt theo danh mục gốc.

#### Bước 5: Tóm tắt Tiền khám 30 Giây & Đặt lịch 2.144 Cơ sở Y tế (`Luồng 9`)

1. Khởi tạo và xác nhận phiên hỏi bệnh (`POST /api/intake/session` -> `POST /api/intake/message` -> `POST /api/intake/confirm-summary`) để xuất **Hồ sơ Tóm tắt Tiền khám 30 Giây** (bệnh sử HPI, lý do khám, dị ứng, thuốc đang dùng).
2. Tra cứu mạng lưới **2.144 cơ sở y tế** (1.505 tại TP.HCM + 639 tại Hà Nội) và đặt lịch hẹn khám:

```bash
curl -s "https://medimind.yourdomain.com/api/facilities?city=TP.HCM&limit=5" | jq .
curl -s "https://medimind.yourdomain.com/api/facilities/map-markers?city=Ha%20Noi" | jq '.[0:3]'
```
