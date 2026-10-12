---
title: "Worklog Tuần 3"
date: 2026-09-28
weight: 3
chapter: false
pre: " <b> 1.3. </b> "
---

### Mục tiêu tuần 3:

- Nắm vững kiến thức về Vận hành (Operate) và Giám sát hệ thống (Monitoring) trên nền tảng AWS.
- Thực hành triển khai giải pháp giám sát trực quan bằng cách tích hợp Grafana với Amazon Cloudwatch.
- Hiểu rõ quy trình cấp quyền bảo mật (IAM Role & User) cho các dịch vụ bên thứ ba truy cập tài nguyên AWS.
- Tham gia chuỗi sự kiện công nghệ và networking (AWS Cloud & AI Day Watch Party & Fireside Chat với CTO Werner Vogels).

### Các công việc đã làm trong tuần này:
| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu |
|:---:|---|:---:|:---:|---|
| 2 | - Nghiên cứu tài liệu tổng quan về các phương pháp Tối ưu hóa hệ thống (Operational Excellence, Security, Reliability, Performance, Cost Optimization). <br>&emsp; - Lập kế hoạch cho bài lab System Monitor với Grafana. | 28/09/2026 | 28/09/2026 | [The First Cloud Journey - Optimizing the system](https://cloudjourney.awsstudygroup.com/3-optimize/) |
| 3 | - **Thực hành Kiến trúc Mạng & Compute:** <br>&emsp; + Tạo VPC và Subnet mới. <br>&emsp; + Cấu hình Security Group cho phép truy cập. <br>&emsp; + Khởi tạo một Linux EC2 Instance làm máy chủ giám sát. | 29/09/2026 | 29/09/2026 | [Lab - Preparatory steps (Step 1-3)](https://000029.awsstudygroup.com/2-prerequiste/) |
| 4 | - **Thực hành Bảo mật (IAM):** <br>&emsp; + Khởi tạo IAM User và tạo Access Key. <br>&emsp; + Tạo IAM Role với các quyền cần thiết để đọc metrics từ Cloudwatch. <br>&emsp; + Gán (Assign) IAM Role vừa tạo cho Linux EC2 Instance. | 30/09/2026 | 30/09/2026 | [Lab - Preparatory steps (Step 4-6)](https://000029.awsstudygroup.com/2-prerequiste/) |
| 5 | - **Thực hành Triển khai & Tích hợp:** <br>&emsp; + Cài đặt Grafana lên Linux EC2 Instance. <br>&emsp; + Kết nối Data Source giữa Grafana và Amazon Cloudwatch. <br>&emsp; + Thiết kế Dashboard để trực quan hóa các chỉ số hiệu suất hệ thống. | 01/10/2026 | 01/10/2026 | [Lab - Installing & Monitoring with Grafana](https://000029.awsstudygroup.com/) |
| 6 | - Dọn dẹp an toàn toàn bộ tài nguyên lab đã khởi tạo (EC2, VPC, IAM, Access Key). <br>&emsp; - **Tham dự sự kiện Offline:** Có mặt tại văn phòng AWS Bitexco tham gia buổi Fireside Chat cùng Tiến sĩ Werner Vogels (CTO toàn cầu của Amazon). <br>&emsp; - Hoàn thiện bài thu hoạch sự kiện Watch Party và Fireside Chat. | 02/10/2026 | 02/10/2026 | [Lab - Clean up resources](https://000029.awsstudygroup.com/5-cleanup/) <br> [Báo cáo Fireside Chat](../4-EventParticipated/4.3-Event3/) |

### Kết quả đạt được tuần 3:

&emsp;◉ Thứ 2 - Thứ 4:
<br>&emsp;&emsp;○ Hiểu được 5 trụ cột tối ưu hóa hệ thống (Well-Architected Framework) theo tiêu chuẩn enterprise.
<br>&emsp;&emsp;○ Thành thạo việc khởi tạo hạ tầng mạng cơ bản (VPC/Subnet/Security Group) để cô lập môi trường thực hành.
<br>&emsp;&emsp;○ Nắm vững cách quản lý danh tính và quyền truy cập với IAM (User, Role, Access Key), đảm bảo nguyên tắc đặc quyền tối thiểu (least privilege).

&emsp;◉ Thứ 5 - Thứ 6:
<br>&emsp;&emsp;○ Thiết lập thành công hệ thống giám sát (Monitoring System) trực quan bằng Grafana, lấy dữ liệu trực tiếp từ Amazon Cloudwatch.
<br>&emsp;&emsp;○ Duy trì kỷ luật dọn dẹp tài nguyên (Clean up) triệt để, đảm bảo tài khoản an toàn tuyệt đối ở mức chi phí $0.
<br>&emsp;&emsp;○ Tham gia trọn vẹn buổi Fireside Chat cùng TS. Werner Vogels (CTO Amazon), tiếp thu triết lý "Now Go Build", mở rộng tư duy thiết kế hệ thống phân tán và phát triển mạnh mẽ kỹ năng networking.
