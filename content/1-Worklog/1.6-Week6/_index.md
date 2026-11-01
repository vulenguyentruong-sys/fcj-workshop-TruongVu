---
title: "Week 6 Worklog"
date: 2026-10-19
weight: 6
chapter: false
pre: " <b> 1.6. </b> "
---

<!-- {{% notice warning %}}
⚠️ **Note:** The following information is for reference purposes only. Please **do not copy verbatim** for your report, including this warning.
{{% /notice %}} -->

### Week 6 Objectives:

- Research and implement AWS IAM Identity Center to establish centralized identity management for the project team.
- Apply the principle of least privilege to securely grant access permissions tailored to each member's role.
- Collaborate with the team to standardize the cloud workflow, ensuring robust security and strict cost control (AWS Credits).

### Tasks carried out this week:
| Day | Task | Start Date | Completion Date | Reference Material |
| :---: | --- | :---: | :---: | --- |
| Mon | - Project Kick-off: <br>&emsp; + Team sync to align on the AWS workflow. <br>&emsp; + Researched AWS IAM Identity Center and multi-account identity management architecture. | 10/19/2026 | 10/19/2026 | [AWS Study Group](https://cloudjourney.awsfcaj.com/) |
| Tue | - Centralized Identity Setup: <br>&emsp; + Configured AWS IAM Identity Center. <br>&emsp; + Created Users and allocated them into Groups matching team roles (e.g., AI_Dev, Backend, Admin). | 10/20/2026 | 10/20/2026 | [IAM Identity Center](https://000012.awsfcaj.com/) |
| Wed | - Security Policy Configuration: <br>&emsp; + Explored and formulated Customer Managed Policies. <br>&emsp; + Granted access permissions based on the principle of least privilege for each group. | 10/21/2026 | 10/21/2026 | [IAM Identity Center](https://000012.awsfcaj.com/) |
| Thu | - Advanced Security & Automation: <br>&emsp; + Researched Time-based access control mechanisms. <br>&emsp; + Familiarized with IAM Identity Center Identity Store APIs using AWS CLI. | 10/22/2026 | 10/22/2026 | [IAM Identity Center](https://000012.awsfcaj.com/) |
| Fri | - Testing & FinOps Management: <br>&emsp; + Collaborated with the team to cross-test account permissions. <br>&emsp; + Carefully performed Resource Cleanup as warned in the Lab to prevent draining the team's AWS Credits. | 10/23/2026 | 10/23/2026 | [AWS Study Group](https://cloudjourney.awsfcaj.com/) |

### Week 6 Achievements:

- Mastered the architecture and successfully deployed AWS IAM Identity Center:
  * Understood the advantages of IAM Identity Center over traditional IAM for scalable management.
  * Established a centralized Identity Store, making the team's sign-in process (SSO) both convenient and secure.

- Successfully applied core security principles to the actual project:
  * Clearly structured Users and Groups, ensuring members only have access to resources strictly necessary for their tasks (Least Privilege Principle).
  * Gained proficiency in defining Customer Managed Policies for more granular and flexible control compared to AWS managed policies.
  * Gained exposure to advanced techniques like Time-based access control.

- Improved Team Collaboration and risk management workflows:
  * Provided the team with a standardized, secure shared environment that facilitates easy auditing of member actions.
  * Strictly adhered to the Resource Cleanup protocol post-testing, successfully safeguarding the project's AWS Credit budget for upcoming heavy AI model integrations.
