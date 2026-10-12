---
title: "Week 3 Worklog"
date: 2026-09-28
weight: 3
chapter: false
pre: " <b> 1.3. </b> "
---

### Week 3 Objectives:

- Master the knowledge of Operations and System Monitoring on the AWS platform.
- Practice deploying a visual monitoring solution by integrating Grafana with Amazon Cloudwatch.
- Understand the security authorization process (IAM Role & User) for third-party services accessing AWS resources.
- Participate in the technology and networking event series (AWS Cloud & AI Day Watch Party & Fireside Chat with CTO Werner Vogels).

### Tasks carried out this week:
| Day | Task | Start Date | Completion Date | Reference Material |
|:---:|---|:---:|:---:|---|
| Mon | - Research theoretical documents on System Optimization methods (Operational Excellence, Security, Reliability, Performance, Cost Optimization). <br>&emsp; - Plan for the System Monitor lab with Grafana. | 09/28/2026 | 09/28/2026 | [The First Cloud Journey - Optimizing the system](https://cloudjourney.awsstudygroup.com/3-optimize/) |
| Tue | - **Network Architecture & Compute Practice:** <br>&emsp; + Create a new VPC and Subnet. <br>&emsp; + Configure Security Group to allow access. <br>&emsp; + Provision a Linux EC2 Instance as the monitoring server. | 09/29/2026 | 09/29/2026 | [Lab - Preparatory steps (Step 1-3)](https://000029.awsstudygroup.com/2-prerequiste/) |
| Wed | - **Security (IAM) Practice:** <br>&emsp; + Create an IAM User and generate an Access Key. <br>&emsp; + Create an IAM Role with the necessary permissions to read metrics from Cloudwatch. <br>&emsp; + Assign the newly created IAM Role to the Linux EC2 Instance. | 09/30/2026 | 09/30/2026 | [Lab - Preparatory steps (Step 4-6)](https://000029.awsstudygroup.com/2-prerequiste/) |
| Thu | - **Deployment & Integration Practice:** <br>&emsp; + Install Grafana on the Linux EC2 Instance. <br>&emsp; + Connect the Data Source between Grafana and Amazon Cloudwatch. <br>&emsp; + Design a Dashboard to visualize system performance metrics. | 10/01/2026 | 10/01/2026 | [Lab - Installing & Monitoring with Grafana](https://000029.awsstudygroup.com/) |
| Fri | - Safely clean up all provisioned lab resources (EC2, VPC, IAM, Access Key). <br>&emsp; - **Attend Offline Event:** Present at the AWS Bitexco office for the Fireside Chat with Dr. Werner Vogels (Global CTO of Amazon). <br>&emsp; - Finalize event reports for the Watch Party and Fireside Chat. | 10/02/2026 | 10/02/2026 | [Lab - Clean up resources](https://000029.awsstudygroup.com/5-cleanup/) <br> [Fireside Chat Report](../4-EventParticipated/4.3-Event3/) |

### Week 3 Achievements:

&emsp;◉ Monday - Wednesday:
<br>&emsp;&emsp;○ Understood the 5 pillars of system optimization (Well-Architected Framework) according to enterprise standards.
<br>&emsp;&emsp;○ Proficient in provisioning basic network infrastructure (VPC/Subnet/Security Group) to isolate the lab environment.
<br>&emsp;&emsp;○ Mastered identity and access management with IAM (User, Role, Access Key), ensuring the principle of least privilege.

&emsp;◉ Thursday - Friday:
<br>&emsp;&emsp;○ Successfully set up a visual Monitoring System using Grafana, pulling data directly from Amazon Cloudwatch.
<br>&emsp;&emsp;○ Maintained strict discipline in resource cleanup, ensuring the account remained absolutely safe at $0 cost.
<br>&emsp;&emsp;○ Fully participated in the Fireside Chat with Dr. Werner Vogels (Amazon Global CTO), absorbing the "Now Go Build" philosophy, expanding knowledge on distributed system design, and significantly enhancing networking skills.
