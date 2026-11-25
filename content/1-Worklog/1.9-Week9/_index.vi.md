---
title: "Worklog Tuần 9"
date: 2026-11-09
weight: 9
chapter: false
pre: " <b> 1.9. </b> "
---

### Mục tiêu tuần 9:

- Học cách triển khai ứng dụng trên Docker kết hợp với các dịch vụ AWS bao gồm EC2, RDS và Amazon ECR.
- Nắm bắt quy trình cấu hình mạng (VPC) và thiết lập Security Groups để đảm bảo an toàn cho cơ sở dữ liệu và ứng dụng.
- Đóng gói ứng dụng, đẩy (push) image lên kho lưu trữ và sử dụng Docker Compose để triển khai.

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu |
| --- | --- | --- | --- | --- |
| 2 | - Đọc tổng quan về kiến trúc triển khai ứng dụng Docker trên AWS. <br> - Thực hành chạy thử ứng dụng bằng Docker ở môi trường máy trạm (Deploy on Local). | 09/11/2026 | 09/11/2026 | <https://000015.awsfcaj.com/1-introduction/> <br> <https://000015.awsfcaj.com/2-deploy-local/> |
| 3 | - Chuẩn bị môi trường mạng (VPC, Subnet, Security Groups). <br> - Khởi tạo và cấu hình cơ sở dữ liệu Amazon RDS (Launch RDS Instance). | 10/11/2026 | 10/11/2026 | <https://000015.awsfcaj.com/3-preparation/> <br> <https://000015.awsfcaj.com/4-configure-rds/> |
| 4 | - Khởi chạy và cấu hình Amazon EC2 instance (cài đặt Docker môi trường). <br> - Triển khai ứng dụng chạy trực tiếp bằng Docker Image trên EC2 kết nối với RDS. | 11/11/2026 | 11/11/2026 | <https://000015.awsfcaj.com/5-configure-ec2/> <br> <https://000015.awsfcaj.com/6-docker-image/> |
| 5 | - Thực hành viết và triển khai ứng dụng nhiều thành phần bằng Docker Compose trên EC2. <br> - Đóng gói và đẩy Docker Image lên Amazon Elastic Container Registry (Push Image). | 12/11/2026 | 12/11/2026 | <https://000015.awsfcaj.com/7-docker-compose/> <br> <https://000015.awsfcaj.com/8-push-image/> |
| 6 | - Kiểm tra, rà soát lại toàn bộ hệ thống. <br> - Dọn dẹp tài nguyên (Clean up resources) như EC2, RDS, ECR để tránh phát sinh chi phí không mong muốn. | 13/11/2026 | 13/11/2026 | <https://000015.awsfcaj.com/9-clean-up/> |


### Kết quả đạt được tuần 9:

- Hiểu rõ luồng triển khai một ứng dụng containerize (đóng gói bằng Docker) lên hạ tầng AWS.
- Khởi tạo và cấu hình thành công Amazon RDS, đảm bảo kết nối an toàn từ EC2 thông qua việc thiết lập Security Groups chuẩn xác.
- Biết cách thiết lập môi trường Docker trên Amazon EC2 và chạy ứng dụng độc lập bằng Docker Image.
- Sử dụng thành thạo Docker Compose để quản lý và triển khai các ứng dụng đa luồng/phức tạp trên EC2.
- Nắm được quy trình đẩy (push) và lưu trữ Docker Image một cách bảo mật trên Amazon ECR.
- Tuân thủ nguyên tắc quản lý chi phí bằng cách dọn dẹp sạch sẽ tài nguyên (terminate EC2, delete RDS & ECR repositories) sau khi hoàn thành bài lab.
