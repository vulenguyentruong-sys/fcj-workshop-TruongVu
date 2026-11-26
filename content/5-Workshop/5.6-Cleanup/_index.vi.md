---
title: "Dọn dẹp tài nguyên"
date: 2026-11-26
weight: 6
chapter: false
pre: " <b> 5.6. </b> "
---

Chúc mừng bạn đã hoàn thành bài workshop **Xây dựng & Triển khai MediMind Clinical AI trên AWS**! Bạn đã thiết kế thành công VPC 3 tầng cô lập, triển khai ứng dụng AI lâm sàng trong Docker kết hợp ChromaDB trên EBS và RDS PostgreSQL, bảo vệ biên bằng Route 53, WAF, CloudFront, ACM, ALB và kiểm chứng đầy đủ các tiêu chuẩn an toàn y khoa.

#### Thứ tự Dọn dẹp Tài nguyên Theo Ràng buộc Phụ thuộc

Để tránh lỗi kẹt Network Interface (ENI) hoặc phát sinh chi phí ngầm sau khi kết thúc demo, hãy xóa tài nguyên theo đúng thứ tự từ ngoài vào trong dưới đây:

1. **Amazon Route 53:** Xóa bản ghi `A` Alias trỏ tới CloudFront trong Hosted Zone của bạn.
2. **Amazon CloudFront & AWS WAF:** Tắt (Disable) và xóa CloudFront Distribution, sau đó xóa Web ACL `medimind-edge-waf` (phạm vi `CLOUDFRONT`).
3. **Application Load Balancer & ACM:** Xóa `medimind-alb`, Target Group `medimind-tg` và các chứng chỉ ACM không còn sử dụng.
4. **Amazon EC2 & Amazon EBS:** Terminate `medimind-app-server` và kiểm tra chắc chắn cả ổ hệ thống lẫn ổ đĩa dữ liệu **20 GB `gp3` EBS** của ChromaDB đều đã bị xóa.
5. **NAT Gateway & Elastic IP:** Xóa `medimind-nat-gw`, chờ trạng thái chuyển sang `Deleted`, sau đó **giải phóng (Release) địa chỉ Elastic IP** đi kèm.
6. **Amazon RDS PostgreSQL & DB Subnet Group:** Xóa `medimind-pg-db` (chọn bỏ qua final snapshot đối với môi trường thực hành), chờ xóa hoàn tất rồi xóa `medimind-db-subnet-group`.
7. **Amazon S3 & Amazon ECR:** Làm rỗng và xóa bucket sao lưu S3 (`medimind-clinical-backup-<account-id>`, bao gồm các phiên bản cũ nếu bật Versioning) và xóa kho ECR:

```bash
export AWS_REGION=ap-southeast-1
export ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Làm rỗng và xóa S3 bucket sao lưu
aws s3 rm s3://medimind-clinical-backup-${ACCOUNT_ID} --recursive
aws s3 rb s3://medimind-clinical-backup-${ACCOUNT_ID} --force

# Xóa ECR repository và toàn bộ Docker image layers
aws ecr delete-repository --repository-name medimind-clinical-ai --force --region $AWS_REGION
```

8. **Secrets Manager, CloudWatch Logs & IAM Role:** Xóa 3 nhóm secrets (`medimind/app-db`, `medimind/auth-otp`, `medimind/ai-providers`), xóa Log Group `/medimind/clinical-api`, và xóa `medimind-ec2-role` cùng Instance Profile:

```bash
for SECRET_ID in medimind/app-db medimind/auth-otp medimind/ai-providers; do
  aws secretsmanager delete-secret --secret-id $SECRET_ID --force-delete-without-recovery --region $AWS_REGION
done
aws logs delete-log-group --log-group-name /medimind/clinical-api --region $AWS_REGION
```

9. **Security Groups, Route Tables, IGW, Subnets & VPC:** Xóa `sg-medimind-rds`, `sg-medimind-ec2`, `sg-medimind-alb`; hủy liên kết và xóa các Route Table tùy chỉnh; tách và xóa `medimind-igw`; xóa 6 Subnets; cuối cùng xóa `medimind-vpc`.
10. **Môi trường Docker Cục bộ:** Dừng và dọn các container ứng dụng và stack giám sát trên máy trạm:

```bash
docker compose down -v
docker compose -f monitoring/docker-compose.observability.yml down -v
```

{{% notice tip %}}
**Lưu ý Tránh Phát sinh Chi phí Ngầm:** **Elastic IP** không gắn vào tài nguyên (`$0.005/giờ`), **NAT Gateway** đang chạy (`$0.059/giờ` tại `ap-southeast-1`) và **Secrets Manager** nếu xóa thiếu cờ `--force-delete-without-recovery` vẫn có thể tính phí. Luôn kiểm tra lại mục `EC2 -> Elastic IPs`, `VPC -> NAT Gateways` và `AWS Billing -> Bills` sau khi dọn dẹp 24 giờ.
{{% /notice %}}
