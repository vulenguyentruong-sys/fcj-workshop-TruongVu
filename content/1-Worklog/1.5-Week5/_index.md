---
title: "Week 5 Worklog"
date: 2026-10-12
weight: 5
chapter: false
pre: " <b> 1.5. </b> "
---

<!-- {{% notice warning %}}
⚠️ **Note:** The following information is for reference purposes only. Please **do not copy verbatim** for your report, including this warning.
{{% /notice %}} -->

### Week 5 Objectives:

- Completely resolve the security risks of opening Port 22 (SSH) to the Internet.
- Establish a zero-trust, highly secure method to access servers (EC2) without relying on SSH Keys (`.pem`).
- Automate the EC2 shutdown process after working hours via AWS Lambda and EventBridge to prevent AWS Credit exhaustion.
- Configure automated alerts to Slack, helping the team monitor costs effortlessly.

### Tasks carried out this week:
| Day | Task | Start Date | Completion Date | Reference Material |
| :---: | --- | :---: | :---: | --- |
| Mon | - Security Risk Research: <br>&emsp; + Evaluated threats of opening Inbound Port 22. <br>&emsp; + Discussed safe SSH Key management. | 10/12/2026 | 10/12/2026 | [AWS Study Group](https://cloudjourney.awsfcaj.com/) |
| Tue | - Securing EC2 Access: <br>&emsp; + Completely removed Port 22 from Security Groups. <br>&emsp; + Completed Session Manager secure access lab. | 10/13/2026 | 10/13/2026 | [Remote Server Access with Session Manager](https://000058.awsfcaj.com) |
| Wed | - Solving FinOps Risks: <br>&emsp; + Re-organized dev EC2 instances for shutdown. <br>&emsp; + Applied the `AutoStop = True` tag. | 10/14/2026 | 10/14/2026 | [Resource Organization with Tags](https://000027.awsfcaj.com) |
| Thu | - Automation Setup: <br>&emsp; + Wrote Lambda (Boto3) code to stop tagged EC2s. <br>&emsp; + Scheduled the job using Amazon EventBridge. | 10/15/2026 | 10/15/2026 | [Serverless Automation with AWS Lambda](https://000022.awsfcaj.com) |
| Fri | - Slack Alert Configuration: <br>&emsp; + Created a Webhook from the team's Slack. <br>&emsp; + Pushed cleanup completion notifications. <br>&emsp; + Performed end-to-end workflow testing. | 10/16/2026 | 10/16/2026 | [Serverless Automation with AWS Lambda](https://000022.awsfcaj.com) |

### Week 5 Achievements:

- Thoroughly resolved security risks related to EC2 server connections:
  * Completely eliminated vulnerabilities caused by exposing Port 22 (SSH) to the public internet.
  * Successfully prevented external Brute-force attack threats.
  * Removed the dependencies and leakage risks of sharing security key files (`.pem`) within the team.

- Successfully established a secure server access method using AWS Systems Manager (SSM):
  * Configured and attached the IAM Role (`AmazonSSMManagedInstanceCore`) to EC2 instances.
  * Accessed the command-line interface directly via Session Manager on the AWS Console.
  * Ensured that all access actions are centrally managed via IAM with clear auditing (logging) capabilities.

- Built a Serverless automation system for Cost Optimization (FinOps):
  * Applied a Tagging Strategy (using the `AutoStop = True` tag) to categorize servers intended for dev/test environments.
  * Programmed an AWS Lambda function (using Python/Boto3) to automatically scan and stop running servers after business hours.
  * Configured Amazon EventBridge to set up a cron job schedule that triggers the Lambda function automatically every night.

- Established an automated monitoring and notification channel for Team Collaboration:
  * Successfully configured an API Webhook linked to the project's Slack channel.
  * Integrated the Webhook calling code into AWS Lambda to automatically push server cleanup status notifications.
  * Enabled all members to transparently monitor AWS Credit usage and rest assured that the system is safely shut down without needing to log into AWS.
