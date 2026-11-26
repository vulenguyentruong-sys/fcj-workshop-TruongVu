---
title: "Containerize & Deploy MediMind AI"
date: 2026-11-26
weight: 4
chapter: false
pre: " <b> 5.4. </b> "
---

#### Overview

In this section, you will package the MediMind Clinical AI backend (`app.py` + `core/main_fastapi.py`) using the repository's hardened non-root `Dockerfile`, push the image to **Amazon ECR**, deploy the container on **Amazon EC2** inside the `Private App Subnet` with an attached **Amazon EBS (`gp3`)** volume for persistent **ChromaDB** indexing, publish the application securely behind **ALB, ACM, CloudFront, AWS WAF, and Route 53**, and run all **5 Live Demo verification scenarios**.

#### End-to-End Deployment Pipeline

{{< mermaid >}}
graph LR
    DOCKER["Dockerfile (python:3.11-slim / appuser)"] --> ECR["Amazon ECR (scanOnPush)"]
    ECR -->|"Pull Image"| EC2["Amazon EC2 (Private App Subnet :8000)"]
    EBS["Amazon EBS gp3 (ChromaDB + uploads)"] --> EC2
    EC2 -->|"Sync Backups"| S3["Amazon S3 (Standard-IA / Glacier)"]
    EDGE["Route 53 -> AWS WAF -> CloudFront -> ALB"] -->|"HTTP :8000"| EC2
    EC2 --> DEMO["5-Step Live Clinical Demo"]
{{< /mermaid >}}

#### Content

1. [Build Docker Image & Push to Amazon ECR](5.4.1-ecr-container/)
2. [Deploy on EC2 with EBS & RAG Indexing](5.4.2-ec2-ebs-deploy/)
3. [Configure ALB, CloudFront, WAF & Route 53](5.4.3-edge-alb-waf/)
4. [End-to-End Live Demo Verification](5.4.4-live-demo/)
