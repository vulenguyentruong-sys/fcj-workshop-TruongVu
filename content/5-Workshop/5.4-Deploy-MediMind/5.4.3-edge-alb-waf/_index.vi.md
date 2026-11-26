---
title: "Cấu hình ALB, CloudFront, WAF và Route 53"
date: 2026-11-26
weight: 3
chapter: false
pre: " <b> 5.4.3 </b> "
---

#### Bước 1: Tạo Target Group & Application Load Balancer (Public Subnets)

1. Trong **EC2 -> Target Groups** (`ap-southeast-1`), tạo nhóm đích `medimind-tg`:
   - **Target type:** `Instances` | **Protocol/Port:** `HTTP : 8000`
   - **VPC:** `medimind-vpc`
   - **Health check path:** `/health` | **Healthy threshold:** `2` | **Interval:** `15s`
   - Đăng ký `medimind-app-server` ở cổng `8000`.
2. Yêu cầu chứng chỉ SSL/TLS 1.3 khu vực trong **AWS Certificate Manager (`ap-southeast-1`)** cho tên miền của bạn (VD: `medimind.yourdomain.com`) và xác thực tự động qua Route 53 CNAME.
3. Tạo **Application Load Balancer** hướng Internet tên `medimind-alb`:
   - **Subnets:** `medimind-public-a` và `medimind-public-b`
   - **Security Group:** `sg-medimind-alb`
   - **Listener 1 (`HTTPS : 443`):** Gắn chứng chỉ ACM Regional và chuyển tiếp tới `medimind-tg`.
   - **Listener 2 (`HTTP : 80`):** Chuyển hướng cố định (`301`) sang `HTTPS : 443`.

{{% notice info %}}
Nhờ cấu hình `TRUST_PROXY_HEADERS=true` và `TRUSTED_PROXY_COUNT=1` trong `/etc/medimind.env`, ứng dụng MediMind đọc chính xác IP người dùng (`X-Forwarded-For`) và giao thức HTTPS (`X-Forwarded-Proto`) từ ALB để thực thi giới hạn tần suất (`core/rate_limit_service.py`) và tạo link callback OAuth chuẩn xác.
{{% /notice %}}

#### Bước 2: Tạo AWS WAF Web ACL (Tường lửa Lớp 7)

Trong **AWS WAF & Shield Console**, chọn phạm vi **Global (CloudFront)** và tạo Web ACL tên `medimind-edge-waf` gồm **4 luật phòng thủ**:

1. **AWSManagedRulesCommonRuleSet** — Chặn các lỗ hổng OWASP Top 10, XSS và Path Traversal.
2. **AWSManagedRulesSQLiRuleSet** — Lọc mã độc SQL Injection nhắm vào API đăng nhập và tìm kiếm.
3. **AWSManagedRulesKnownBadInputsRuleSet** — Từ chối header giả mạo và mẫu quét lỗ hổng phổ biến.
4. **Rate-Based Rule (`MediMindRateLimit`):** Giới hạn tần suất bất thường (VD: `1000` yêu cầu / 5 phút / IP) ngay tại biên trước khi chạm tới ALB/EC2.

#### Bước 3: Cấu hình Amazon CloudFront & Route 53 DNS

1. Yêu cầu **Chứng chỉ ACM Global tại `us-east-1`** (bắt buộc để gắn tên miền tùy chỉnh cho CloudFront).
2. Tạo **CloudFront Distribution** trỏ Origin về DNS của `medimind-alb` (`HTTPS only`, TLSv1.2+):
   - **Web Application Firewall (WAF):** Gắn `medimind-edge-waf`.
   - **Cache Behavior 1 (`/static/*`):** Chọn `CachingOptimized` để lưu đệm CSS, JS, hình ảnh món ăn/giao diện tại Edge (tận dụng gói miễn phí **1 TB/tháng**).
   - **Cache Behavior 2 (`/api/*` và `/auth/*`):** Chọn `CachingDisabled` + chính sách `AllViewer` để các luồng sàng lọc lâm sàng, tải đơn thuốc OCR và callback OAuth đi thẳng về backend kèm đầy đủ Cookie/Header.
   - **Default (`*`):** Chọn `CachingDisabled` + `AllViewer` cho giao diện SPA động.
3. Trong **Amazon Route 53**, mở Hosted Zone và tạo bản ghi **Alias `A`** cho `medimind.yourdomain.com` trỏ tới tên miền CloudFront (`dxxxxxxxxxxxx.cloudfront.net`).
