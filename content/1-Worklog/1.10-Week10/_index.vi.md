---
title: "Worklog Tuần 10"
date: 2026-11-16
weight: 10
chapter: false
pre: " <b> 1.10. </b> "
---

### Mục tiêu tuần 10:

- Thiết lập quy trình CI/CD (Continuous Integration/Continuous Deployment) tự động hóa cho các container chạy trên dịch vụ Amazon Elastic Container Service (ECS).
- Tích hợp và so sánh việc triển khai CI/CD trên nhiều nền tảng khác nhau bao gồm: GitLab, GitHub Actions và AWS CodeBuild.
- Áp dụng các công cụ giám sát (monitoring) và quản lý log nâng cao của AWS để theo dõi hiệu suất và trạng thái của ứng dụng container.

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu |
| --- | --- | --- | --- | --- |
| 2 | - Đọc tổng quan về kiến trúc triển khai CI/CD với ECS Container. <br> - Chuẩn bị môi trường, tài nguyên và cấu hình ban đầu cho ECS (Preparation). | 16/11/2026 | 16/11/2026 | <https://000017.awsfcaj.com/1-introduction/> <br> <https://000017.awsfcaj.com/2-preparation/> |
| 3 | - **Thực hành triển khai CI/CD (Phần 1):** <br>&emsp; + Thiết lập luồng CI/CD tự động bằng GitLab. <br>&emsp; + Thiết lập luồng CI/CD tự động bằng GitHub Actions. | 17/11/2026 | 17/11/2026 | <https://000017.awsfcaj.com/3-cicd-gitlab/> <br> <http://000017.awsfcaj.com/4-cicd-github/> |
| 4 | - **Thực hành triển khai CI/CD (Phần 2):** <br>&emsp; + Triển khai CI/CD sử dụng dịch vụ native của AWS là CodeBuild. | 18/11/2026 | 18/11/2026 | <https://000017.awsfcaj.com/5-cicd-codebuild/> |
| 5 | - **Giám sát và Quản lý Log:** <br>&emsp; + Theo dõi hiệu suất ứng dụng container bằng Container Insights (CloudWatch). <br>&emsp; + Cấu hình bộ định tuyến log (Logs Router) với Firelens. | 19/11/2026 | 19/11/2026 | <https://000017.awsfcaj.com/6-monitoring-with-container-insights/> <br> <https://000017.awsfcaj.com/7-logs-router-with-firelens/> |
| 6 | - Kiểm tra tính ổn định của các luồng CI/CD vừa thiết lập. <br> - Dọn dẹp tài nguyên (Clean up resources) đã tạo trong quá trình lab để tối ưu chi phí. | 20/11/2026 | 20/11/2026 | <https://000017.awsfcaj.com/8-clean-up/> |


### Kết quả đạt được tuần 10:

- Hiểu rõ vai trò và cách thức hoạt động của luồng CI/CD trong việc tự động hóa quá trình triển khai mã nguồn lên Amazon ECS, giúp giảm thiểu lỗi thủ công và tăng tốc độ phát hành tính năng mới.
- Thiết lập thành công và nắm được sự khác biệt khi cấu hình CI/CD pipelines trên 3 công cụ phổ biến: GitLab, GitHub Actions và AWS CodeBuild.
- Bật và sử dụng thành thạo CloudWatch Container Insights để thu thập, tổng hợp và tóm tắt các số liệu đo lường, log của ứng dụng container.
- Triển khai thành công AWS FireLens làm bộ định tuyến log tùy chỉnh, giúp quản lý và phân phối log của các ECS task một cách linh hoạt.
- Thực hiện tốt việc rà soát và dọn dẹp tài nguyên AWS sau khi hoàn thành chuỗi bài thực hành.
