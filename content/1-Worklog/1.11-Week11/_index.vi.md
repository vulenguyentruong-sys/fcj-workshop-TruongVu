---
title: "Worklog Tuần 11"
date: 2026-11-23
weight: 11
chapter: false
pre: " <b> 1.11. </b> "
---

### Mục tiêu tuần 11:

- Tìm hiểu chuyên sâu về các chiến lược tối ưu hóa chi phí (FinOps) trên hạ tầng AWS.
- Phân biệt rõ ràng các mô hình cam kết sử dụng tài nguyên: Savings Plans và Reserved Instances.
- Thực hành phân tích dữ liệu chi phí và đưa ra quyết định mua gói tiết kiệm phù hợp cho Compute và Database.

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu |
| --- | --- | --- | --- | --- |
| 2 | - Đọc tổng quan về chiến lược tối ưu hóa chi phí trên AWS. <br> - Tìm hiểu khái niệm và cơ chế hoạt động của AWS Savings Plans. | 23/11/2026 | 23/11/2026 | <https://000042.awsfcaj.com/> <br> <https://000042.awsfcaj.com/1-what-is-savings-plan/> |
| 3 | - **Phân tích và Đăng ký Savings Plan:** <br>&emsp; + Sử dụng AWS Cost Explorer để xem các đề xuất (Recommendations) về Savings Plan. <br>&emsp; + Thực hành quy trình mô phỏng các bước mua (Purchase) Savings Plan. | 24/11/2026 | 24/11/2026 | <https://000042.awsfcaj.com/2-savings-plan-recommendation/> <br> <https://000042.awsfcaj.com/3-purchase-saving-plan/> |
| 4 | - **Reserved Instances (Compute):** <br>&emsp; + Tìm hiểu mô hình đặt trước tài nguyên cho máy chủ ảo (Amazon EC2 Reserved Instances). <br>&emsp; + So sánh ưu nhược điểm và tính linh hoạt giữa Reserved Instances và Savings Plans. | 25/11/2026 | 25/11/2026 | <https://000042.awsfcaj.com/4-reserved-instance/> |
| 5 | - **Reserved Instances (Database):** <br>&emsp; + Tìm hiểu chiến lược tối ưu hóa chi phí cho cơ sở dữ liệu với Amazon RDS Reserved DB Instances. | 26/11/2026 | 26/11/2026 | <https://000042.awsfcaj.com/5-reserved-db-instance/> |
| 6 | - **AWS Cost Management:** <br>&emsp; + Khám phá thêm các công cụ kiểm soát chi phí chuyên sâu, cảnh báo ngân sách (AWS Budgets) và phát hiện bất thường (Cost Anomaly Detection). <br>&emsp; + Tổng kết các phương pháp thực hành tốt nhất (Best Practices) về FinOps. | 27/11/2026 | 27/11/2026 | <https://000034.awsfcaj.com/> |


### Kết quả đạt được tuần 11:

- Nắm vững các mô hình tính phí của AWS và cách thiết lập chiến lược tối ưu hóa chi phí (FinOps) hiệu quả cho dự án.
- Hiểu rõ sự khác biệt cốt lõi về tính linh hoạt và mức độ cam kết giữa Compute Savings Plans, EC2 Instance Savings Plans và Standard/Convertible Reserved Instances.
- Biết cách tận dụng AWS Cost Explorer để phân tích lịch sử sử dụng tài nguyên (historical usage) và nhận các đề xuất tiết kiệm chi phí tự động từ AWS một cách chính xác.
- Nắm được cách áp dụng mô hình Reserved DB Instances để giảm thiểu đáng kể chi phí duy trì cơ sở dữ liệu Amazon RDS so với mức giá On-Demand.
- Củng cố tư duy thiết kế kiến trúc tiết kiệm chi phí (Cost Optimization Pillar) trong AWS Well-Architected Framework, áp dụng trực tiếp để tối ưu hóa hạ tầng của đồ án FCAJ.
