---
title: "Khởi tạo Hạ tầng AWS 3 Tầng"
date: 2026-11-26
weight: 3
chapter: false
pre: " <b> 5.3. </b> "
---

#### Tổng quan

Để bảo vệ dữ liệu tư vấn lâm sàng, đơn thuốc và hồ sơ bệnh nhân theo chuẩn **HIPAA** và **AWS Well-Architected Framework**, hệ thống MediMind Clinical AI chia tách lưu lượng mạng thành **3 tầng VPC cô lập** tại khu vực **`ap-southeast-1` (Singapore)**:

1. **Tầng Public Subnet (`10.0.1.0/24`, `10.0.2.0/24`):** Chỉ đặt **Application Load Balancer (ALB)** và **NAT Gateway**; tuyệt đối không đặt máy chủ ứng dụng hay cơ sở dữ liệu tại tầng này.
2. **Tầng Private App Subnet (`10.0.11.0/24`, `10.0.12.0/24`):** Đặt máy chủ **Amazon EC2** chạy Docker container (`PORT=8000`) gắn ổ đĩa **Amazon EBS (`gp3`)** cho ChromaDB và `/uploads`. Máy chủ **không có Public IP**, chỉ nhận lưu lượng từ Security Group của ALB và quản trị không cần khóa SSH qua **AWS Systems Manager Session Manager**.
3. **Tầng Private Database Subnet (`10.0.21.0/24`, `10.0.22.0/24`):** Đặt **Amazon RDS for PostgreSQL (`db.t4g.micro`, `:5432`)** tách biệt hoàn toàn khỏi Internet, chỉ mở cổng SQL cho Security Group của EC2.

#### Sơ đồ Mạng & Lưu trữ 3 Tầng

{{< mermaid >}}
graph LR
    USER["Người dùng & Biên (CloudFront / WAF)"] --> IGW["Internet Gateway"]
    IGW --> ALB["Public Subnet: ALB (HTTPS :443)"]
    IGW --> NAT["Public Subnet: NAT Gateway"]
    ALB -->|"HTTP :8000"| EC2["Private App Subnet: EC2 + EBS (ChromaDB)"]
    EC2 -->|"Outbound AI / OAuth / OTP"| NAT
    EC2 -->|"SQL :5432"| RDS["Private DB Subnet: RDS PostgreSQL"]
    EC2 -->|"IAM Role"| AWS["ECR, S3 Backup, Secrets Manager, CloudWatch"]
{{< /mermaid >}}

#### Nội dung

1. [Cấu hình VPC, Subnet và Security Group](5.3.1-vpc-network/)
2. [Khởi tạo RDS PostgreSQL, S3 và Secrets Manager](5.3.2-data-storage/)
