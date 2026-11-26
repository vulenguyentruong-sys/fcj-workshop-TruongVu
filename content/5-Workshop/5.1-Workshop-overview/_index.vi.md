---
title: "Giới thiệu"
date: 2026-11-26
weight: 1
chapter: false
pre: " <b> 5.1. </b> "
---

#### Vấn đề Thực tiễn

Các bệnh viện tuyến đầu tại Việt Nam thường xuyên hoạt động ở mức **150% – 200% công suất**, khiến người bệnh phải chờ đợi 2–4 giờ và bác sĩ thiếu bản tóm tắt bệnh sử có cấu trúc trước khi thăm khám. Đồng thời, việc tra cứu qua các chatbot AI phổ thông tiềm ẩn nhiều rủi ro lâm sàng nghiêm trọng:
- **Bỏ sót "Giờ vàng" Cấp cứu & Bẫy phủ định:** Các bộ lọc từ khóa đơn giản dễ bỏ sót triệu chứng nguy kịch hoặc báo động giả khi người dùng nhập câu phủ định như *"tôi không khó thở"*.
- **Sai sót từ Đơn thuốc Viết tay & Tự dùng Kháng sinh:** Ảnh đơn thuốc mờ hoặc viết tắt dẫn đến nhầm liều, uống sai thời điểm trước/sau ăn hoặc tương tác dị ứng thuốc.
- **Ảo giác Tri thức Y khoa & Dị ứng Dinh dưỡng:** AI không kiểm soát có thể tự bịa nguồn trích dẫn y văn, bịa lượng calo hoặc gợi ý món ăn chứa thành phần gây dị ứng cho người bệnh.

#### 5 Phân hệ Lâm sàng Cốt lõi của MediMind Clinical AI

Để giải quyết khép kín các điểm nghẽn trên, mã nguồn dự án tổ chức 5 phân hệ nghiệp vụ gắn kết chặt chẽ:

| Phân hệ | Tệp Mã nguồn Chính | Năng lực & Quy mô Dữ liệu Thực tế |
| :--- | :--- | :--- |
| **1. Sàng lọc Lâm sàng & Double Guardrails** | `core/triage.py`, `core/intake_service.py`, `core/chat_service.py` | Phân tầng 3 mức nguy cơ (**Xanh – Vàng – Đỏ**), xử lý tiếng Việt không dấu & câu phủ định, kích hoạt khẩn **Cấp cứu 115**, hậu kiểm chặn tự kê đơn kháng sinh. |
| **2. Pipeline OCR Đối soát 8 Bước** | `core/pipeline_orchestrator.py`, `core/ocr_parallel_service.py`, `core/gemini_schema_service.py`, `core/reconciliation_service.py` | Chạy song song **EasyOCR** và **Vision LLM** (`nvidia/nemotron-3.5-super-vl:free` / Gemini), đối chiếu từng trường (`needs_review=True` khi sai lệch), chuẩn hóa thuốc/xét nghiệm theo luật và bắt buộc xác nhận *Human-in-the-Loop*. |
| **3. Hybrid Medical RAG Có căn cứ** | `core/rag_service.py`, `core/reranker_service.py`, `ingest.py` | Kết hợp tìm kiếm từ khóa **BM25**, vector **ChromaDB** trên **364 tài liệu y khoa chuẩn** (*Bộ Y Tế, kcb.vn, MedlinePlus NIH*), mở rộng truy vấn song ngữ Việt–Anh và tái xếp hạng `BAAI/bge-reranker-v2-m3`. |
| **4. Tư vấn Dinh dưỡng Lâm sàng** | `core/nutrition_service.py`, `core/nutrition_rules.py`, `core/nutrition_ai.py`, `core/recipe_catalog.py` | Lọc dị ứng tất định (*Fail-Closed Allergy Filtering*) trên **2.462 công thức món Việt (ViFoodRec: 2.367 món ăn + 95 đồ uống)**, khóa chặt nguyên liệu và `kcal`. |
| **5. Tóm tắt Tiền khám 30s & Đặt lịch** | `core/facilities_service.py`, `core/appointment_service.py`, `core/consultation_service.py` | Xuất **Bản tóm tắt Tiền khám** (bệnh sử HPI, dị ứng, thuốc đang dùng) và kết nối đặt lịch tại **2.144 cơ sở y tế** (1.505 tại TP.HCM + 639 tại Hà Nội) qua Google Maps. |

#### Kiến trúc AWS VPC 3 Tầng Mục tiêu (`ap-southeast-1`)

![Sơ đồ Kiến trúc AWS MediMind](/images/5-Workshop/5.1-Workshop-overview/aws_architecture_current.png)

##### Giải thích Chi tiết 9 Luồng Dữ liệu trên Kiến trúc:

1. **Luồng `1. DNS Query / Response`:** Trình duyệt người dùng phân giải tên miền hệ thống thông qua **Amazon Route 53** tới điểm biên gần nhất.
2. **Luồng `2. HTTPS : 443` (Bảo mật Biên & CDN):** Lưu lượng HTTPS đi qua tường lửa **AWS WAF** (lọc OWASP Top 10, SQLi/XSS, Rate Limiting) tới **Amazon CloudFront** được cấp chứng chỉ bởi **AWS Certificate Manager (ACM Global)** để lưu đệm tài nguyên tĩnh (`static/css`, `static/js`, `static/images`).
3. **Luồng `3. HTTPS : 443` (Ingress vào VPC):** Lưu lượng động (`/api/*`, `/auth/*`) đi qua **Internet Gateway** vào **`Amazon VPC (10.0.0.0/16)`** tại khu vực `ap-southeast-1`.
4. **Luồng `4. HTTPS : 443` (ALB TLS Termination):** **Application Load Balancer (ALB)** đặt tại `Public Subnet` thực hiện giải mã TLS bằng chứng chỉ **ACM Regional** và kiểm tra `/health`.
5. **Luồng `5. HTTP : 8000` (Tầng Ứng dụng Riêng tư):** ALB chuyển tiếp yêu cầu nội bộ qua cổng `8000` (`PORT=8000`) tới máy chủ **Amazon EC2** trong `Private App Subnet` (không có Public IP). EC2 kéo Docker Image từ **Amazon ECR**, đọc biến bí mật từ **AWS Secrets Manager**, đẩy log đã ẩn danh PII về **Amazon CloudWatch**, đọc/ghi chỉ mục **ChromaDB (`./medical_vectordb`)** và **`./uploads`** trên ổ đĩa **Amazon EBS (`gp3`)**, đồng thời sao lưu lên **Amazon S3**.
6. **Luồng `6. SQL : 5432` (Tầng Cơ sở dữ liệu Cô lập):** Ứng dụng kết nối qua cổng `5432` (`psycopg2-binary` + SQLAlchemy) tới **Amazon RDS for PostgreSQL** trong `Private Database Subnet`, quản lý 6 bảng ORM (`users`, `medical_documents`, `prescription_history`, `clinical_consultations`, `intake_sessions`, `medical_appointments`).
7. **Luồng `7a, 7b, 7c` (Kết nối Chiều ra qua NAT Gateway):** Mọi kết nối từ `Private App Subnet` ra Internet đều đi qua **NAT Gateway** và **Internet Gateway**:
   - **`7a. Token & UserInfo`:** Trao đổi mã xác thực với **Google OAuth 2.0** (`/api/auth/google/callback`).
   - **`7b. Send OTP`:** Gửi mã OTP 6 chữ số qua **Gmail SMTP** (`smtp.gmail.com:587`) và cổng SMS nội địa **SpeedSMS**.
   - **`7c. LLM / Vision AI`:** Gọi API suy luận tới **OpenRouter / Google Gemini** (`core/llm_provider.py`) với các khóa API tách biệt theo tác vụ Chat, OCR và Dinh dưỡng.
8. **Luồng `8. Google OAuth Consent`:** Trình duyệt người dùng tương tác trực tiếp với màn hình cấp quyền của **Google OAuth 2.0** trước khi điều hướng về callback hệ thống.
9. **Luồng `9. Google Maps API`:** Trình duyệt tải bản đồ và chỉ đường tới **2.144 cơ sở khám chữa bệnh** thông qua **Google Maps Platform API**.

#### Danh mục Dịch vụ AWS & Tích hợp Ngoài

| Tầng Kiến trúc | Dịch vụ / Thành phần | Vai trò trong MediMind Clinical AI |
| :--- | :--- | :--- |
| **Biên mạng & DNS** | **Amazon Route 53, AWS WAF, Amazon CloudFront, ACM** | Phân giải DNS sẵn sàng cao, tường lửa Layer-7, CDN miễn phí 1 TB/tháng, chứng chỉ TLS 1.3. |
| **Mạng VPC** | **Amazon VPC (`10.0.0.0/16`), ALB, NAT Gateway, IGW** | Tách biệt 3 tầng mạng (`Public`, `Private App`, `Private DB`), TLS termination, kiểm soát kết nối chiều ra. |
| **Tính toán & Lưu trữ** | **Amazon EC2, Amazon EBS (`gp3`), Amazon ECR, Amazon S3** | Chạy Docker container cổng `8000`, lưu bền vững ChromaDB & tệp tải lên trên EBS, lưu image riêng tư ở ECR, sao lưu dài hạn lên S3. |
| **Cơ sở dữ liệu** | **Amazon RDS for PostgreSQL (`db.t4g.micro`)** | CSDL quan hệ quản lý tập trung (`:5432`) trong `Private Database Subnet`, thay thế SQLite cục bộ cho môi trường Production. |
| **Bảo mật & Vận hành** | **AWS Secrets Manager, Amazon CloudWatch, AWS IAM, AWS Budgets** | Nạp bí mật động qua `EC2 IAM Role`, thu thập log đã che PII, cảnh báo ngân sách ngưỡng $20. |
| **Dịch vụ Ngoài** | **OpenRouter (`:free`), Google Gemini, Google OAuth, Gmail SMTP, SpeedSMS, Google Maps** | Suy luận Vision/Chat AI, xác thực đa kênh/OTP và định vị bản đồ 2.144 cơ sở y tế. |

#### Tổng hợp Dự toán Chi phí (`ap-southeast-1`)

| Kịch bản Vận hành | Quy mô Sử dụng Giả định | Chi phí Tháng (USD) | Đòn bẩy Tối ưu Chi phí |
| :--- | :--- | :---: | :--- |
| **Dev / PoC Workshop** | ~500 phiên tư vấn, ~200 lượt OCR/tháng; tận dụng AWS Free Tier (`t3.micro`, 20 GB EBS, `db.t4g.micro`, S3, ECR, CloudFront) + ~40 giờ bật ALB/NAT demo | **$16.26 / tháng**<br>*($195.12 / năm)* | Lưu ChromaDB trực tiếp trên EBS thay Managed Vector DB + dùng OpenRouter `:free` models (`$0.00` phí token). |
| **Production (10.000 MAU)** | Vận hành 24/7: 10.000 người dùng, 25.000 phiên tư vấn, 8.000 lượt OCR/tháng (`t3.medium` + 30 GB EBS + RDS + ALB/NAT + WAF + Secrets) | **$104.60 / tháng** | **$0.00418 / phiên tư vấn** (~105 VNĐ/lượt), tiết kiệm >95% so với Managed Vector DB và LLM thương mại. |
