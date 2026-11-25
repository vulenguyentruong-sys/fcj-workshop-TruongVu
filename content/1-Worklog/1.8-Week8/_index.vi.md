---
title: "Worklog Tuần 8"
date: 2026-11-02
weight: 8
chapter: false
pre: " <b> 1.8. </b> "
---

### Mục tiêu tuần 8:

- Thực hành tối ưu hóa kích thước (right-sizing) cho máy chủ ảo Amazon EC2 thông qua workshop "CHOOSE THE CORRECT EC2 SIZE"[cite: 6].
- Học cách thu thập dữ liệu hiệu suất bằng CloudWatch Agent[cite: 6].
- Sử dụng AWS Compute Optimizer và Cost Optimization Hub để phân tích dữ liệu thực tế và nhận đề xuất cấu hình phù hợp nhất[cite: 6].

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu |
| --- | --- | --- | --- | --- |
| 2 | - Đọc hiểu tài liệu lab từ hệ thống FCAJ. <br> - Khởi tạo IAM Role cho Amazon CloudWatch Agent. <br> - Gắn IAM Role vào EC2 instance. | 02/11/2026 | 02/11/2026 | <https://000032.awsfcaj.com/2-create-iam-role/> <br> <https://000032.awsfcaj.com/3-attach-iam-role/> |
| 3 | - Làm quen với dịch vụ Amazon CloudWatch. <br> - Cài đặt CloudWatch Agent lên EC2 instance để thu thập CPU và memory metrics. | 03/11/2026 | 03/11/2026 | <https://000032.awsfcaj.com/4-cloudwatch-intro/> <br> <https://000032.awsfcaj.com/5-install-cloudwatch-agent/> |
| 4 | - Cập nhật và kiểm tra thông tin EC2. <br> - Xem xét các đề xuất right-sizing (tối ưu kích thước) cho EC2 trong Cost Optimization Hub dựa trên dữ liệu thực tế. | 04/11/2026 | 04/11/2026 | <https://000032.awsfcaj.com/6-ec2-updated-rec/> |
| 5 | - Tìm hiểu các Best Practices (thực hành tốt nhất) khi thực hiện right-sizing cho Amazon EC2. | 05/11/2026 | 05/11/2026 | <https://000032.awsfcaj.com/7-ec2-rs-best-practices/> |
| 6 | - Tối ưu hóa cấu hình tính toán dựa trên các đề xuất từ AWS Compute Optimizer. <br> - Dọn dẹp tài nguyên (Clean up resources) để tránh phát sinh phí ngoài Free Tier. | 06/11/2026 | 06/11/2026 | <https://000032.awsfcaj.com/> |


### Kết quả đạt được tuần 8:

- Khởi chạy thành công EC2 instance trong giới hạn Free Tier (t2.micro hoặc t3.micro)[cite: 6].
- Tạo và gắn thành công IAM Role, cấu hình cấp quyền cho Amazon CloudWatch Agent hoạt động trên EC2.
- Cài đặt và cấu hình CloudWatch Agent để thu thập chính xác các thông số về CPU và bộ nhớ (memory metrics)[cite: 6].
- Nắm bắt cách sử dụng AWS Compute Optimizer kết hợp với Cost Optimization Hub để nhận được các đề xuất cụ thể, dựa trên dữ liệu thực tế, về loại EC2 instance phù hợp nhất với khối lượng công việc (workload)[cite: 6].
- Hiểu rõ các Best Practices trong việc Right-sizing (chọn đúng kích thước) cho Amazon EC2 nhằm tối ưu hóa chi phí mà không làm giảm hiệu năng hệ thống.
- Hoàn thành toàn bộ workshop trong giới hạn tài khoản Free Tier (sử dụng EC2, CloudWatch free tier và các dịch vụ miễn phí như Compute Optimizer) và dọn dẹp tài nguyên (terminate EC2) đúng cách sau khi thực hành[cite: 6].
