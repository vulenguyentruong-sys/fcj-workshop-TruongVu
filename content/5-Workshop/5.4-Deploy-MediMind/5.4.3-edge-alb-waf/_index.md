---
title: "Configure ALB, CloudFront, WAF & Route 53"
date: 2026-11-26
weight: 3
chapter: false
pre: " <b> 5.4.3 </b> "
---

#### Step 1: Create Target Group & Application Load Balancer (Public Subnets)

1. In the **EC2 -> Target Groups** console (`ap-southeast-1`), create `medimind-tg`:
   - **Target type:** `Instances` | **Protocol/Port:** `HTTP : 8000`
   - **VPC:** `medimind-vpc`
   - **Health check path:** `/health` | **Healthy threshold:** `2` | **Interval:** `15s`
   - Register `medimind-app-server` on port `8000`.
2. Request a regional TLS 1.3 certificate in **AWS Certificate Manager (`ap-southeast-1`)** for your domain (e.g., `medimind.yourdomain.com`) and validate via Route 53 DNS CNAME.
3. Create an internet-facing **Application Load Balancer** named `medimind-alb`:
   - **Subnets:** `medimind-public-a` and `medimind-public-b`
   - **Security Group:** `sg-medimind-alb`
   - **Listener 1 (`HTTPS : 443`):** Attach the regional ACM certificate and forward to `medimind-tg`.
   - **Listener 2 (`HTTP : 80`):** Redirect permanently (`301`) to `HTTPS : 443`.

{{% notice info %}}
Because `TRUST_PROXY_HEADERS=true` and `TRUSTED_PROXY_COUNT=1` are set in `/etc/medimind.env`, MediMind accurately extracts client IPs (`X-Forwarded-For`) and HTTPS scheme (`X-Forwarded-Proto`) from ALB for rate limiting (`core/rate_limit_service.py`) and OAuth callback URLs.
{{% /notice %}}

#### Step 2: Create an AWS WAF Web ACL (Layer-7 Firewall)

In the **AWS WAF & Shield Console**, select **Global (CloudFront)** scope (`us-east-1` control plane) and create a Web ACL named `medimind-edge-waf` with **4 defensive rules**:

1. **AWSManagedRulesCommonRuleSet** — Blocks OWASP Top 10 exploits, XSS, and path traversal attempts.
2. **AWSManagedRulesSQLiRuleSet** — Filters SQL injection payloads targeting auth and search APIs.
3. **AWSManagedRulesKnownBadInputsRuleSet** — Rejects malformed headers and known vulnerable scanner patterns.
4. **Rate-Based Rule (`MediMindRateLimit`):** Limits excessive bursts (e.g., `1000` requests per 5 minutes per IP) before traffic reaches the ALB/EC2 tier.

#### Step 3: Configure Amazon CloudFront & Route 53 DNS

1. Request a **Global ACM Certificate in `us-east-1`** (mandatory for CloudFront custom domains).
2. Create a **CloudFront Distribution** pointing to `medimind-alb` DNS as the Origin (`HTTPS only`, TLSv1.2+):
   - **Web Application Firewall (WAF):** Attach `medimind-edge-waf`.
   - **Cache Behavior 1 (`/static/*`):** `CachingOptimized` (serves CSS, JS, and ViFoodRec/UI images from edge within the **1 TB/month Always-Free** tier).
   - **Cache Behavior 2 (`/api/*` and `/auth/*`):** `CachingDisabled` + `AllViewer` origin request policy so clinical triage, OCR uploads, and OAuth callbacks bypass edge caching and preserve cookies/headers.
   - **Default (`*`):** `CachingDisabled` + `AllViewer` for dynamic SPA HTML rendering.
3. In **Amazon Route 53**, open your Hosted Zone and create an **Alias `A` record** for `medimind.yourdomain.com` pointing to the CloudFront distribution domain (`dxxxxxxxxxxxx.cloudfront.net`).
