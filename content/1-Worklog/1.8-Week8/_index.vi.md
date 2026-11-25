---
title: "Nhật ký công việc Tuần 8"
date: 2026-11-09
weight: 8
chapter: false
pre: " <b> 1.8. </b> "
---

### Mục tiêu tuần 8:

- Nghiên cứu và triển khai kiến trúc Serverless trên AWS (Lambda, API Gateway, DynamoDB, S3).
- Hiểu và thiết lập quy trình Tích hợp và Triển khai liên tục (CI/CD) native trên AWS.
- Hoàn thành các bài thực hành lab triển khai hạ tầng theo tài liệu từ FCAJ.

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu |
| --- | --- | --- | --- | --- |
| 2 | - Đọc hiểu tài liệu lab từ hệ thống FCAJ <br> - Tìm hiểu tổng quan về kiến trúc Serverless trên AWS (API Gateway, Lambda, DynamoDB) | 02/11/2026 | 02/11/2026 | <https://000032.awsfcaj.com/> |
| 3 | - **Thực hành Lab Serverless:** <br>&emsp; + Khởi tạo AWS Lambda function (Prompt & Response Handler) <br>&emsp; + Cấu hình Amazon API Gateway để định tuyến request HTTP | 03/11/2026 | 03/11/2026 | <https://000032.awsfcaj.com/> |
| 4 | - **Thực hành Lab (tiếp theo):** <br>&emsp; + Tích hợp Amazon S3 để lưu trữ giao diện tĩnh (Frontend) <br>&emsp; + Thiết lập bảng Amazon DynamoDB lưu trữ metadata và audit log | 04/11/2026 | 04/11/2026 | <https://000032.awsfcaj.com/> |
| 5 | - Tìm hiểu quy trình CI/CD native trên AWS <br> - Làm quen với các dịch vụ cốt lõi: CodeCommit, CodeBuild, CodePipeline và CloudFormation (IaC) | 05/11/2026 | 05/11/2026 | <https://000032.awsfcaj.com/> |
| 6 | - **Thực hành Lab CI/CD:** <br>&emsp; + Thiết lập luồng CI/CD tự động build và push cho Frontend lên S3 <br>&emsp; + Tách bạch luồng deploy hạ tầng Backend qua CloudFormation | 06/11/2026 | 06/11/2026 | <https://000032.awsfcaj.com/> |


### Kết quả đạt được tuần 8:

- Nắm vững khái niệm và cách thức hoạt động của kiến trúc Serverless trên AWS.
- Thực hành thành công việc kết nối Amazon API Gateway với AWS Lambda để xử lý logic ứng dụng backend mà không cần quản lý máy chủ.
- Cấu hình thành công lưu trữ tĩnh trên S3 và cơ sở dữ liệu NoSQL tốc độ cao DynamoDB.
- Hiểu rõ vòng đời CI/CD và cách tự động hóa quy trình phát hành phần mềm.
- Thiết lập thành công hai luồng CI/CD tách biệt (Frontend và Backend) bằng AWS CodePipeline, sử dụng Infrastructure as Code (CloudFormation) để cập nhật tài nguyên hạ tầng một cách an toàn và đồng bộ.
