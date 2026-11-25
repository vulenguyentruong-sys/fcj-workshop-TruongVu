---
title: "Week 8 Worklog"
date: 2026-11-02
weight: 8
chapter: false
pre: " <b> 1.8. </b> "
---

### Objectives for Week 8:

- Practice right-sizing an Amazon EC2 instance through the "CHOOSE THE CORRECT EC2 SIZE" workshop[cite: 6].
- Learn how to collect performance data using the CloudWatch Agent[cite: 6].
- Utilize AWS Compute Optimizer and Cost Optimization Hub to analyze real utilization data and receive the best configuration recommendations[cite: 6].

### Tasks to be implemented this week:
| Day | Task | Start Date | End Date | Resource |
| --- | --- | --- | --- | --- |
| Mon | - Review lab documentation from the FCAJ system. <br> - Create an IAM Role for the Amazon CloudWatch Agent. <br> - Attach the IAM role to the EC2 instance. | 11/02/2026 | 11/02/2026 | <https://000032.awsfcaj.com/2-create-iam-role/> <br> <https://000032.awsfcaj.com/3-attach-iam-role/> |
| Tue | - Get acquainted with Amazon CloudWatch. <br> - Install the CloudWatch Agent on the EC2 instance to collect CPU and memory metrics. | 11/03/2026 | 11/03/2026 | <https://000032.awsfcaj.com/4-cloudwatch-intro/> <br> <https://000032.awsfcaj.com/5-install-cloudwatch-agent/> |
| Wed | - Review updated EC2 information. <br> - Review EC2 right-sizing recommendations in the Cost Optimization Hub based on actual data. | 11/04/2026 | 11/04/2026 | <https://000032.awsfcaj.com/6-ec2-updated-rec/> |
| Thu | - Learn Right-sizing best practices for Amazon EC2. | 11/05/2026 | 11/05/2026 | <https://000032.awsfcaj.com/7-ec2-rs-best-practices/> |
| Fri | - Optimize configuration for compute based on AWS Compute Optimizer recommendations. <br> - Clean up resources to avoid charges outside the Free Tier. | 11/06/2026 | 11/06/2026 | <https://000032.awsfcaj.com/> |


### Achieved Results for Week 8:

- Successfully launched a Free Tier eligible EC2 instance (t2.micro or t3.micro)[cite: 6].
- Successfully created and attached an IAM Role, configuring permissions for the Amazon CloudWatch Agent to operate on EC2.
- Installed and configured the CloudWatch Agent to accurately collect CPU and memory metrics[cite: 6].
- Grasped how to use AWS Compute Optimizer together with Cost Optimization Hub to receive concrete recommendations, based on real utilization data, on the best instance type for the workload[cite: 6].
- Understood Right-sizing best practices for Amazon EC2 to optimize costs without impacting system performance.
- Completed the entire workshop within the Free Tier limits (using EC2, CloudWatch free tier, and free services like Compute Optimizer) and properly cleaned up resources (terminated the EC2 instance) after practice[cite: 6].
