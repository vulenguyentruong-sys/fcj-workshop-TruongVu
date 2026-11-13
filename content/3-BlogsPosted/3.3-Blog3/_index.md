---
title: "Blog 3"
date: 2026-11-09
weight: 3
chapter: false
pre: " <b> 3.3. </b> "
---

# DECOUPLING FRONTEND & BACKEND CI/CD PIPELINES ON AWS

When building Serverless applications, establishing a flexible Continuous Integration and Continuous Deployment (CI/CD) workflow is absolutely crucial. Instead of relying on third-party tools, an approach utilizing a full suite of AWS native services (CodePipeline, CodeBuild, CloudFormation...) provides high synchronization. The highlight of this architecture is the complete decoupling between the static interface deployment pipeline and the infrastructure update pipeline.

Key points to understand about the Frontend CI/CD Pipeline:

- The deployment lifecycle begins when the developer pushes source code to the CodeCommit repository.
- This source code update event immediately triggers the processing task on the CodeBuild service.
- CodeBuild takes on the responsibility of compiling the source code and directly pushes the build folder into an S3 bucket static hosting space.
- Throughout this process, CodePipeline acts as the automated orchestrator for the entire workflow within the AWS Cloud ecosystem.

Key points to understand about the Backend CI/CD Pipeline:

- Similar to the Frontend, the automated process is initiated when the developer pushes code to the CodeCommit repository.
- This change automatically triggers the CodeBuild packaging environment.
- The core difference is that CodeBuild does not update the destination services directly; instead, it issues a deploy stack command to the AWS CloudFormation service.
- AWS CloudFormation receives the configuration and proceeds to safely update the actual resources.
- The destination Serverless services affected and updated include: logic processing functions (Lambda functions), database tables (DynamoDB tables), storage space (S3 bucket), and the user identity management system (Cognito user pool).

**Images**

<img width="1085" height="620" alt="image" src="https://github.com/user-attachments/assets/8c650c79-4610-4fdc-8fc5-946b55ff83d6" />

<img width="1056" height="572" alt="image" src="https://github.com/user-attachments/assets/10038089-9db8-4ffb-be37-a78829569343" />

**Link**

[Post on AWS Study Group VN](https://www.facebook.com/groups/660548818043427/user/100058180633098)

**Guide**

Adopting a Serverless architecture combined with AWS's native CI/CD toolset brings significant advantages to cloud projects, especially when establishing a flexible and secure operational platform is required. By separating the deployment process into two independent pipelines, this architecture not only optimizes the release time for new features but also isolates the risk of service disruption, ensuring infrastructure consistency from the testing phase right up until the application reaches the end-user.

#AWS #Serverless #CICD #AWSCodePipeline #CodeBuild #CloudFormation #CloudComputing #DevOps #AWSStudyGroupVN #FCAJ
