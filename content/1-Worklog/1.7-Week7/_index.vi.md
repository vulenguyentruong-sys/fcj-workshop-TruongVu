---
title: "Worklog Tuần 7"
date: 2026-10-26
weight: 7
chapter: false
pre: " <b> 1.7. </b> "
---

<!-- {{% notice warning %}}
⚠️ **Lưu ý:** Các thông tin dưới đây chỉ nhằm mục đích tham khảo, vui lòng **không sao chép nguyên văn** cho bài báo cáo của bạn kể cả warning này.
{{% /notice %}} -->

### Mục tiêu tuần 7:

- Tiếp tục hoàn thành các bài lab nâng cao trên hệ thống The First Cloud Journey, tập trung vào Cơ sở dữ liệu (Database), Phân phối nội dung (CDN) và Triển khai hạ tầng dưới dạng code (IaC).
- Bắt tay vào giai đoạn thực thi (Implementation) cho dự án FCAJ Buildrathon cùng nhóm.
- Tích hợp các dịch vụ Serverless và AI/ML đã học vào kiến trúc thực tế của dự án.

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu |
| :---: | --- | :---: | :---: | --- |
| 2 | - Khởi động dự án & Thực hành Database: <br>&emsp; + Họp nhóm chốt lại bản thiết kế kiến trúc Serverless cho dự án. <br>&emsp; + Thực hành lab về Cơ sở dữ liệu NoSQL (Tạo bảng, thiết lập khóa chính/khóa phân loại). | 26/10/2026 | 26/10/2026 | [NoSQL Database Essentials with Amazon DynamoDB](https://000060.awsfcaj.com) |
| 3 | - Thực hành Phân phối nội dung: <br>&emsp; + Tìm hiểu cách lưu trữ website tĩnh và tăng tốc độ tải trang bằng CDN. <br>&emsp; + Hoàn thành lab thiết lập Amazon CloudFront kết hợp với S3. | 27/10/2026 | 27/10/2026 | [Content Delivery with Amazon CloudFront](https://000094.awsfcaj.com) |
| 4 | - Thực hành Infrastructure as Code (IaC): <br>&emsp; + Tìm hiểu cách tự động hóa triển khai hạ tầng qua các file template (YAML/JSON). <br>&emsp; + Hoàn thành bài lab khởi tạo tài nguyên bằng AWS CloudFormation. | 28/10/2026 | 28/10/2026 | [Infrastructure as Code with AWS CloudFormation](https://000037.awsfcaj.com) |
| 5 | - Triển khai dự án nhóm (Backend): <br>&emsp; + Cùng team viết code AWS Lambda xử lý logic dự án. <br>&emsp; + Kết nối API Gateway với Lambda và lưu trữ dữ liệu test xuống DynamoDB. | 29/10/2026 | 29/10/2026 | Tài liệu nội bộ nhóm & [AWS CLI](https://000011.awsfcaj.com) |
| 6 | - Triển khai dự án nhóm (Tích hợp AI & Testing): <br>&emsp; + Cùng nhóm tích hợp mô hình Generative AI (Amazon Bedrock) vào luồng xử lý. <br>&emsp; + Test end-to-end toàn bộ kiến trúc, debug các lỗi liên quan đến quyền IAM và fix lỗi CORS của API. | 30/10/2026 | 30/10/2026 | [AWS Study Group](https://cloudjourney.awsfcaj.com/) |

### Kết quả đạt được tuần 7:

- Nắm vững kiến thức và kỹ năng thực hành qua các bài lab chuyên sâu:
  * Hiểu rõ cơ chế hoạt động và cách thiết kế bảng tối ưu (Partition Key/Sort Key) trong hệ quản trị cơ sở dữ liệu NoSQL với Amazon DynamoDB.
  * Thiết lập thành công hệ thống phân phối nội dung tĩnh (Amazon CloudFront) để giảm độ trễ (latency) cho ứng dụng Frontend.
  * Làm quen với phương pháp triển khai hạ tầng dưới dạng mã (IaC) thông qua AWS CloudFormation, giúp tự động hóa quá trình tạo tài nguyên thay vì click thủ công trên Console.

- Đẩy mạnh tiến độ dự án FCAJ Buildrathon cùng team:
  * Chuyển hóa thành công bản vẽ kiến trúc (Architecture Diagram) thành các tài nguyên thực tế trên môi trường AWS.
  * Tích hợp mượt mà bộ ba Serverless (API Gateway - Lambda - DynamoDB) để xử lý logic Backend cho dự án.
  * Khắc phục thành công các lỗi phát sinh trong quá trình ghép nối hệ thống, đặc biệt là các vấn đề liên quan đến xác thực (IAM Roles) và giao tiếp giữa các dịch vụ AI (Amazon Bedrock).
  * Nâng cao kỹ năng làm việc nhóm (Teamwork), phân chia task hiệu quả và phối hợp debug chéo giữa các thành viên.
