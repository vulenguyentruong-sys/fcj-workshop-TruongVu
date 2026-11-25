---
title: "Week 9 Worklog"
date: 2026-11-09
weight: 9
chapter: false
pre: " <b> 1.9. </b> "
---

### Objectives for Week 9:

- Learn how to deploy applications on Docker utilizing AWS services including EC2, RDS, and Amazon ECR.
- Grasp the process of network configuration (VPC) and setting up Security Groups to ensure database and application security.
- Containerize the application, push the image to a registry, and use Docker Compose for deployment.

### Tasks to be implemented this week:
| Day | Task | Start Date | End Date | Resource |
| --- | --- | --- | --- | --- |
| Mon | - Read the overview of Docker application deployment architecture on AWS. <br> - Practice running the application using Docker on the local environment (Deploy on Local). | 11/09/2026 | 11/09/2026 | <https://000015.awsfcaj.com/1-introduction/> <br> <https://000015.awsfcaj.com/2-deploy-local/> |
| Tue | - Prepare the network environment (VPC, Subnets, Security Groups). <br> - Launch and configure the Amazon RDS database instance. | 11/10/2026 | 11/10/2026 | <https://000015.awsfcaj.com/3-preparation/> <br> <https://000015.awsfcaj.com/4-configure-rds/> |
| Wed | - Launch and configure the Amazon EC2 instance (install the Docker environment). <br> - Deploy the application directly using a Docker Image on EC2, connecting to RDS. | 11/11/2026 | 11/11/2026 | <https://000015.awsfcaj.com/5-configure-ec2/> <br> <https://000015.awsfcaj.com/6-docker-image/> |
| Thu | - Practice writing and deploying multi-container applications using Docker Compose on EC2. <br> - Package and push the Docker Image to Amazon Elastic Container Registry (Push Image). | 11/12/2026 | 11/12/2026 | <https://000015.awsfcaj.com/7-docker-compose/> <br> <https://000015.awsfcaj.com/8-push-image/> |
| Fri | - Review and verify the entire system. <br> - Clean up resources (EC2, RDS, ECR) to avoid unexpected AWS charges. | 11/13/2026 | 11/13/2026 | <https://000015.awsfcaj.com/9-clean-up/> |


### Achieved Results for Week 9:

- Clearly understood the deployment flow of a containerized application (using Docker) onto AWS infrastructure.
- Successfully launched and configured Amazon RDS, ensuring secure connections from EC2 through proper Security Group setup.
- Learned how to set up the Docker environment on Amazon EC2 and run standalone applications using Docker Images.
- Proficiently used Docker Compose to manage and deploy multi-container/complex applications on EC2.
- Mastered the process of securely pushing and storing Docker Images on Amazon ECR.
- Complied with cost management principles by thoroughly cleaning up resources (terminating EC2, deleting RDS & ECR repositories) after completing the lab.
