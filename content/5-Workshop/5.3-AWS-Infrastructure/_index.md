---
title: "Provision AWS 3-Tier Infrastructure"
date: 2026-11-26
weight: 3
chapter: false
pre: " <b> 5.3. </b> "
---

#### Overview

To protect sensitive clinical consultations, prescriptions, and patient records in alignment with **HIPAA** and the **AWS Well-Architected Framework**, MediMind Clinical AI separates network traffic into **three isolated VPC tiers** inside **`ap-southeast-1` (Singapore)**:

1. **Public Subnet Tier (`10.0.1.0/24`, `10.0.2.0/24`):** Hosts only the **Application Load Balancer (ALB)** and **NAT Gateway**. No application servers or databases reside here.
2. **Private App Subnet Tier (`10.0.11.0/24`, `10.0.12.0/24`):** Hosts the **Amazon EC2** Docker runtime (`PORT=8000`) with attached **Amazon EBS (`gp3`)** storage for ChromaDB and `/uploads`. Instances have **no public IP** and are accessible only from the ALB Security Group or via **AWS Systems Manager Session Manager**.
3. **Private Database Subnet Tier (`10.0.21.0/24`, `10.0.22.0/24`):** Hosts **Amazon RDS for PostgreSQL (`db.t4g.micro`, `:5432`)** with zero Internet route, accepting SQL connections exclusively from the EC2 Security Group.

#### 3-Tier Network & Storage Topology

{{< mermaid >}}
graph LR
    USER["Users & Edge (CloudFront / WAF)"] --> IGW["Internet Gateway"]
    IGW --> ALB["Public Subnet: ALB (HTTPS :443)"]
    IGW --> NAT["Public Subnet: NAT Gateway"]
    ALB -->|"HTTP :8000"| EC2["Private App Subnet: EC2 + EBS (ChromaDB)"]
    EC2 -->|"Outbound AI / OAuth / OTP"| NAT
    EC2 -->|"SQL :5432"| RDS["Private DB Subnet: RDS PostgreSQL"]
    EC2 -->|"IAM Role (VPC/AWS API)"| AWS["ECR, S3 Backup, Secrets Manager, CloudWatch"]
{{< /mermaid >}}

#### Content

1. [Configure VPC, Subnets & Security Groups](5.3.1-vpc-network/)
2. [Provision RDS PostgreSQL, S3 & Secrets Manager](5.3.2-data-storage/)
