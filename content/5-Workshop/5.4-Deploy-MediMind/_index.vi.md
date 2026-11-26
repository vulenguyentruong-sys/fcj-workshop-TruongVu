---
title: "Đóng gói Container & Triển khai MediMind AI"
date: 2026-11-26
weight: 4
chapter: false
pre: " <b> 5.4. </b> "
---

#### Tổng quan

Trong phần này, bạn sẽ đóng gói ứng dụng MediMind Clinical AI (`app.py` + `core/main_fastapi.py`) bằng tệp `Dockerfile` chuẩn bảo mật non-root, đẩy image lên **Amazon ECR**, triển khai container trên **Amazon EC2** trong `Private App Subnet` kết hợp ổ đĩa **Amazon EBS (`gp3`)** để lưu chỉ mục **ChromaDB**, mở truy cập an toàn qua **ALB, ACM, CloudFront, AWS WAF và Route 53**, và kiểm chứng sản phẩm qua **5 kịch bản Live Demo thực tế**.

#### Quy trình Đóng gói & Triển khai Đầu-Cuối

{{< mermaid >}}
graph LR
    DOCKER["Dockerfile (python:3.11-slim / appuser)"] --> ECR["Amazon ECR (scanOnPush)"]
    ECR -->|"Kéo Image"| EC2["Amazon EC2 (Private App Subnet :8000)"]
    EBS["Amazon EBS gp3 (ChromaDB + uploads)"] --> EC2
    EC2 -->|"Sao lưu"| S3["Amazon S3 (Standard-IA / Glacier)"]
    EDGE["Route 53 -> AWS WAF -> CloudFront -> ALB"] -->|"HTTP :8000"| EC2
    EC2 --> DEMO["Kiểm chứng Live Demo 5 Bước"]
{{< /mermaid >}}

#### Nội dung

1. [Build Docker Image & Đẩy lên Amazon ECR](5.4.1-ecr-container/)
2. [Triển khai trên EC2, EBS và Nạp Chỉ mục RAG](5.4.2-ec2-ebs-deploy/)
3. [Cấu hình ALB, CloudFront, WAF và Route 53](5.4.3-edge-alb-waf/)
4. [Kiểm chứng Sản phẩm Thực tế (Live Demo)](5.4.4-live-demo/)
