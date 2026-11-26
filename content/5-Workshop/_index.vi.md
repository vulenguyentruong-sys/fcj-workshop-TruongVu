---
title: "Workshop"
date: 2026-11-26
weight: 5
chapter: false
pre: " <b> 5. </b> "
---

# Xây dựng & Triển khai MediMind Clinical AI trên AWS

#### Tổng quan

**MediMind Clinical AI** là nền tảng trợ lý y tế lâm sàng đa phương thức khép kín, hỗ trợ sàng lọc triệu chứng ban đầu, đối soát đơn thuốc/phiếu xét nghiệm và tư vấn dinh dưỡng cá nhân hóa cho người bệnh và bác sĩ tại Việt Nam. Trong bài workshop thực hành này, bạn sẽ đóng gói ứng dụng Python/Docker (`app.py` và `core/main_fastapi.py`), khởi tạo hạ tầng **AWS VPC 3 tầng mạng (`10.0.0.0/16`)** tuân thủ chuẩn bảo mật **HIPAA** tại khu vực **`ap-southeast-1` (Singapore)**, và triển khai hoàn chỉnh hệ thống với **Hybrid RAG (BM25 + ChromaDB + Cross-Encoder Reranker)**, **Double Guardrails** và **Pipeline OCR**.

{{% notice info %}}
**Kết quả & Chỉ số Trọng tâm của Workshop**
- **An toàn Lâm sàng:** Đạt **100% Emergency Recall** (`emergency_recall_min = 1.0`), **100% Negation Accuracy** (xử lý bẫy phủ định) và **0.0%** tỷ lệ lời khuyên nguy hiểm trên 83 tệp kiểm thử tự động `pytest` cùng 4 bộ dữ liệu đánh giá (308 mẫu).
- **Tri thức Y khoa Chuẩn hóa:** Hybrid RAG lập chỉ mục trên **364 tài liệu y khoa chuẩn** (*Bộ Y Tế, kcb.vn, MedlinePlus NIH*), **2.462 món ăn & đồ uống Việt Nam (ViFoodRec)** với cơ chế lọc dị ứng tất định (*Fail-Closed*), và mạng lưới **2.144 cơ sở y tế** (1.505 tại TP.HCM và 639 tại Hà Nội).
- **Tối ưu Chi phí:** Chỉ **$16.26/tháng** ($195.12/năm) ở môi trường Dev/PoC Workshop nhờ tận dụng AWS Free Tier + OpenRouter `:free` models, và **$104.60/tháng** (**$0.00418/phiên tư vấn**) ở quy mô Production 10.000 người dùng/tháng.
{{% /notice %}}

#### Mục tiêu Thực hành Workshop

Sau khi hoàn thành bài workshop này, bạn sẽ nắm vững quy trình:
1. Thiết kế **VPC 3 tầng cô lập** (`Public Subnet`, `Private App Subnet`, `Private Database Subnet`) kèm Security Group lồng nhau để chặn hoàn toàn truy cập Internet trực tiếp vào máy chủ ứng dụng và cơ sở dữ liệu.
2. Khởi tạo **Amazon RDS for PostgreSQL**, **Amazon S3** (với Lifecycle Policy) và **AWS Secrets Manager** để nạp khóa bí mật ở thời điểm chạy thông qua **EC2 IAM Role** theo nguyên tắc đặc quyền tối thiểu.
3. Đóng gói Docker Image bảo mật (non-root `appuser`, `python:3.11-slim`), đẩy lên **Amazon ECR**, gắn ổ đĩa **Amazon EBS (`gp3`)** lưu trữ bền vững chỉ mục **ChromaDB** và nạp 364 tài liệu y khoa.
4. Công bố ứng dụng an toàn qua **Amazon Route 53**, **AWS WAF**, **Amazon CloudFront**, **AWS Certificate Manager (TLS 1.3)** và **Application Load Balancer (ALB)**.
5. Kiểm chứng sản phẩm trực tiếp qua 5 kịch bản lâm sàng (cờ đỏ 115, bẫy phủ định, OCR 8 bước, dinh dưỡng ViFoodRec, tóm tắt 30s & đặt lịch), giám sát bằng **Prometheus/Grafana + CloudWatch**, và dọn dẹp triệt để tài nguyên AWS.

#### Nội dung

1. [Tổng quan về Workshop](5.1-Workshop-overview/)
2. [Các bước chuẩn bị](5.2-Prerequiste/)
3. [Khởi tạo Hạ tầng AWS 3 Tầng](5.3-AWS-Infrastructure/)
4. [Đóng gói Container & Triển khai MediMind AI](5.4-Deploy-MediMind/)
5. [Bảo mật, Kiểm định Chất lượng & Giám sát](5.5-Security-Testing/)
6. [Dọn dẹp tài nguyên](5.6-Cleanup/)
