---
title: "Week 4 Worklog"
date: 2026-10-05
weight: 4
chapter: false
pre: " <b> 1.4. </b> "
---

### Week 4 Objectives:

- Enhance Operations skills by managing large-scale AWS resources using Tags and Resource Groups[cite: 8].
- Research and practice the advanced Attribute-Based Access Control (ABAC) model through IAM combined with Tags[cite: 8].
- Familiarize with AWS Systems Manager to automate server administration tasks[cite: 8].
- Conduct team brainstorming, align on objectives, and finalize the actual project topic for the FCAJ Buildrathon program.

### Tasks carried out this week:
| Day | Task | Start Date | Completion Date | Reference Material |
|:---:|---|:---:|:---:|---|
| Mon | - **Resource Management Practice:** <br>&emsp; + Learn enterprise Tagging Strategies. <br>&emsp; + Complete the lab *Manage resources in groups with Tag and Resource Groups*[cite: 8]. | 10/05/2026 | 10/05/2026 | [AWS Study Group - Optimize](https://cloudjourney.awsstudygroup.com/3-optimize/) |
| Tue | - **Advanced Security Practice (ABAC):** <br>&emsp; + Understand the differences between RBAC and ABAC. <br>&emsp; + Complete the lab *Manage EC2 service access with Tag through IAM*[cite: 8]. | 10/06/2026 | 10/06/2026 | [AWS Study Group - Optimize](https://cloudjourney.awsstudygroup.com/3-optimize/) |
| Wed | - **Operations Automation Practice:** <br>&emsp; + Explore AWS Systems Manager features (Run Command, Patch Manager). <br>&emsp; + Complete the lab *Service management and task automation using AWS System Manager*[cite: 8]. | 10/07/2026 | 10/07/2026 | [AWS Study Group - Optimize](https://cloudjourney.awsstudygroup.com/3-optimize/) |
| Thu | - Clean up lab resources (Terminate EC2, delete Tags, Resource Groups, IAM Policies) to ensure no incurred costs. <br>&emsp; - Read preparatory documents for the team project. | 10/08/2026 | 10/08/2026 | AWS Console |
| Fri | - **Team Meeting & Project Finalization:** <br>&emsp; + Host a team brainstorming session. <br>&emsp; + Evaluate project feasibility (time constraints, technical skills, AWS Credit budget). <br>&emsp; + Unify and finalize the project topic to prepare for architecture design. | 10/09/2026 | 10/09/2026 | Internal Team Discussion |

### Week 4 Achievements:

&emsp;◉ Monday - Wednesday:
<br>&emsp;&emsp;○ **Large-scale Governance Mindset:** Mastered classifying and managing thousands of scattered resources via AWS Resource Groups and Tags. Applying a proper Tagging Strategy optimizes future Cost Allocation.
<br>&emsp;&emsp;○ **Flexible Security with ABAC:** Instead of strictly Role-Based Access Control, I learned to use Tags as IAM authorization conditions. This prevents an engineer in Project A from accidentally modifying/deleting EC2 instances in Project B, even if they share the same job title.
<br>&emsp;&emsp;○ **Operations Automation:** Grasped the power of AWS Systems Manager in administrating fleets of servers (running commands, automated patching) without opening SSH (Port 22), significantly boosting security and operational efficiency.

&emsp;◉ Thursday - Friday:
<br>&emsp;&emsp;○ **Financial Discipline (FinOps):** Continued the habit of thoroughly reviewing and cleaning up resources post-lab, safeguarding the current AWS Credits for the final project.
<br>&emsp;&emsp;○ **Teamwork & Ideation Skills:** Leveraged practical knowledge from previous weeks and Talkshows to assess technical risks. The team successfully agreed upon a viable project topic that addresses real-world pain points, fully preparing us for the Architecture Design phase next week.
