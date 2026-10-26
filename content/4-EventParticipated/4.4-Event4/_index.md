---
title: "Event 4: Meetup First Cloud AI Journey"
date: 2026-10-24
weight: 4
chapter: false
pre: " <b> 4.4. </b> "
---

<!-- {{% notice warning %}}
⚠️ **Note:** The following information is for reference purposes only. Please **do not copy verbatim** for your report, including this warning.
{{% /notice %}} -->

# Event Report: “Meetup First Cloud AI Journey - October 2026”

### Event Objectives

- Gain practical insights into Cloud and AI Agents directly from Tech Leads and engineers working in the industry.
- Explore advanced architectural solutions on AWS (Voice AI, Resource Access Manager, Automated Pentesting, Bedrock AgentCore).
- Network, connect, and learn from real-world experiences in developing AI Agents for enterprise environments.

### Special Guests & Venue

- **Speakers:** Mr. Kiet Tran (Revve AI), Mr. Long Huynh & Mr. Thinh Nguyen (Styl Solution), Mr. Xuan An (Leader AWS Student Builder Group HCMUTE), Mr. Khoa Kieu (Tech Lead ACB) & Mr. Nghi Danh (AWS Community Builder).
- **Time & Venue:** 9:00 - 12:00 AM, Saturday, October 24, 2026, at the AWS Office, 26th Floor, Bitexco Financial Tower, HCMC.

### Key Highlights

The Meetup was a highly condensed session packed with top-tier technical "brainpower" across 5 distinct topics:

#### Session 1: Building a Vietnamese Voice-AI Contact Center
- Explored Voice AI architecture on AWS optimized for low latency (~1.8s) to deliver smooth conversational experiences.
- Highlight: A highly impressive and natural live demo where the AI directly conducted a preliminary job interview for a Cloud Engineer position in Vietnamese.

#### Session 2: AWS Resource Access Manager (RAM)
- Solutions for securely sharing resources across accounts within an AWS Organization.
- Strategies for centralized network management and tightly integrating IAM policies with Service Control Policies (SCP) to enforce permission ceilings and save costs.

#### Session 3: AWS Pentest with Security Agent
- Early infrastructure security assessment (Shift-left security): Reviewing Terraform code directly on GitLab/GitHub PRs to catch vulnerabilities.
- Utilizing a Security Agent acting as a real user to conduct automated pentesting in SIT/UAT environments before production deployment.

#### Session 4: Amazon Bedrock AgentCore
- A comprehensive look at bringing Agents to production:
  + **Agent Runtime:** Running MicroVMs on EC2 Spot instances for maximum cost efficiency.
  + **Memory System:** Stratified into Short-term (synchronous) and Long-term (asynchronous) layers, enabling the AI to deeply understand user context.

#### Session 5: Kiro Crew (24/7 AI Agent)
- Designing an AI Agent to assist with code reviews and system checks running 24/7.
- **Creating Artifacts:** Automatically scraping real-world job data and generating visual statistical charts directly in the chat interface.
- **Context Window Management:** Implementing an Auto Compact mechanism when context reaches 70-90% thresholds, and a "Break down context" feature to strictly monitor token consumption.
- **Memory & Guardrails:** Strategies for cleaning up obsolete memory to prevent cost bloat, and setting up strict security Guardrails to prevent the AI from arbitrarily deleting infrastructure or exposing server secrets/credentials.

### Key Learnings

- **AI Agent Architectural Mindset:** Realized that deploying AI in reality requires more than just a smart model; it demands solving issues related to latency, token management (Context Window), and memory storage costs.
- **Automated Security:** Understood the critical importance of AI Guardrails and integrating security testing (Pentest) right from the Terraform coding phase.

### Application to Work (FCAJ Project)

- **Token & Context Management:** Will immediately apply the Auto Compact mechanism and conversation flow management to our team's Bot to avoid exceeding LLM token limits, thereby saving AWS Credits.
- **Establishing Guardrails:** Will design a robust safety control layer to ensure our team's AI Agent cannot execute dangerous commands or leak sensitive information.

### Personal Experience at the Event

Saturday morning at Bitexco was truly a memorable and energetic experience.

#### Expanded Perspectives from the Industry
Listening directly to Tech Leads made me realize that practical, real-world knowledge is vastly broader and more fascinating than standard lab exercises. Revve AI's live Vietnamese interview demo completely blew me away with the current maturity level of Voice AI technology.

#### The Captivating Kiro Crew Session
The technical Q&A at the end of the session with Mr. Khoa Kieu and Mr. Nghi Danh was my absolute favorite part. The way they solved "painful" problems like cleaning up old memory or setting up AI Guardrails exactly answered the bottlenecks my team is currently facing in our capstone project.

#### Key Takeaways
Every event I attend reinforces the need to proactively connect, confidently network, and continually push myself to learn more. A sincere thank you to the speakers and organizers for creating such a fantastic knowledge-sharing playground, making the "journey to the cloud" for students and young builders incredibly engaging and motivating.

#### Event Photos
*(Insert Meetup check-in photos, slides from favorite sessions, or group photos with the speakers here)*
