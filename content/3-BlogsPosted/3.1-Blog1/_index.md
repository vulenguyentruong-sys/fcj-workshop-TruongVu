---
title: "Blog 1"
date: 2026-10-31
weight: 1
chapter: false
pre: " <b> 3.1. </b> "
---


# BUILDING AI APPLICATIONS ON AWS: COMBINING AMAZON BEDROCK, LAMBDA, AND API GATEWAY

In the current landscape of AI application development, integrating a Large Language Model (LLM) into a system is no longer a novel concept. However, the challenge lies in building an architecture that is scalable, easy to manage, and guarantees high operational performance.

A notable approach is combining Amazon Bedrock with AWS Serverless services such as AWS Lambda, Amazon API Gateway, Amazon S3, and DynamoDB.

Today, let's explore an AI application architecture built on AWS through the diagram below!

### 1. Architecture Overview
This architecture is divided into two main parts:
- **Frontend:** Utilizes Amazon S3 to host a static website and Amazon CloudFront to distribute content to users.
- **Backend:** Employs API Gateway, Lambda, and Amazon Bedrock to receive requests, process data, and generate AI responses.

Additionally, the system uses DynamoDB to store audit information and metadata, while S3 is used to store response content. A key highlight is that the entire system operates on a Serverless model, reducing the need for server management and scaling elastically as the user base grows.

### 2. Role of Each AWS Service

- **Amazon S3 – Static Website:** Used to store website assets such as HTML, CSS, JavaScript, and images. Instead of maintaining a dedicated server to host the website, we can store static files directly on S3.
- **Amazon CloudFront – Content Delivery Network:** Acts as a content distributor to users via a network of Edge Locations. Benefits include:
  * Reducing latency when loading the website.
  * Accelerating content access speeds.
  * Supporting HTTPS and integrating security features.
- **Amazon API Gateway – API Management:** Serves as the entry point receiving requests from the Client and forwarding them to the backend. This component enables the frontend to communicate with the AI processing system via REST APIs or HTTP APIs.
- **AWS Lambda – Serverless Computing:** In this architecture, Lambda is divided into two main functions:
  * **Prompt Handler Function:** Receives requests from API Gateway, validates, and prepares the prompt before sending it to the AI model.
  * **Response Handler Function:** Processes the returned results, formats the response, and performs necessary storage operations.
  *(Separating these into two functions makes the system easier to maintain and clearly divides responsibilities).*
- **Amazon Bedrock – Foundation Models:** This is the most crucial component in the AI architecture, providing API access to Foundation Models without the need to self-deploy or manage the underlying model infrastructure.
- **Amazon DynamoDB – Audit & Metadata:** Used to store structured information, such as user/session IDs, request timestamps, processing statuses, and audit logs.
- **Amazon S3 – Response Storage:** Stores the response results from the AI, especially useful when the data size is large or requires long-term retention.

### 3. System Workflow
To easily visualize, we can break down the operational process into the following steps:
1. **User accesses the application:** The client accesses the website via CloudFront. UI assets are delivered from the S3 Static Website.
2. **Send request to Backend:** When the user inputs a question or an AI request, the frontend sends a request to the Amazon API Gateway.
3. **Process Prompt:** API Gateway triggers the Prompt Handler Lambda. The system validates the input data, prepares the prompt, and determines the specific request to send.
4. **Call AI Model:** The Prompt Handler sends the request to Amazon Bedrock. The AI model processes the content and returns the result.
5. **Process Response:** The Response Handler Lambda receives the result, formats the data, and prepares the response.
6. **Store Data:** The system saves metadata/audit logs to DynamoDB and simultaneously stores the response content into Amazon S3.
7. **Return Result:** The result is sent back to the frontend to be displayed on the application interface.

### 4. Potential Deployment Issues

* **Lambda Timeout:** If the AI model takes too long to process a request, Lambda might exceed its maximum execution time.
  --> *Solution:* Design appropriate timeouts, optimize prompts, and consider an asynchronous processing architecture.
* **Bedrock Throttling:** Occurs when too many requests are sent to the model simultaneously.
  --> *Solution:* Check Amazon Bedrock quotas, implement a retry mechanism with exponential backoff, and control the number of concurrent requests.
* **Access Denied:** Lambda cannot invoke Bedrock or access S3/DynamoDB due to missing permissions.
  --> *Solution:* Verify the Lambda IAM Role, grant permissions based on the Least Privilege principle, and review Resource Policies.
* **Increased Costs:** Frequent LLM invocations or storing excessive amounts of data can drive up costs.
  --> *Solution:* Monitor usage via AWS Cost Explorer, limit prompt sizes, and set up S3 Lifecycle Policies.

### 5. Why Use This Architecture?
Some notable benefits include:
- **Scalability:** Can seamlessly scale up or down based on demand.
- **Serverless:** Eliminates server provisioning and maintenance tasks.
- **Modularity:** Components are decoupled, facilitating easier maintenance.
- **Cost Optimization:** Pay-as-you-go pricing across multiple services.
- **AI Integration:** Direct integration with Foundation Models via Amazon Bedrock without managing model infrastructure.

### 6. Conclusion
The combination of Amazon Bedrock, AWS Lambda, API Gateway, S3, and DynamoDB offers a highly flexible approach to building AI applications on the AWS platform. Interestingly, we are not just building a basic AI chat application, but establishing a foundation that can evolve into more complex systems like AI Assistants, Customer Support Chatbots, or intelligent document processing applications.

Understanding the role and workflow of each service is a critical step before diving into the deployment of a real-world AI project.

<img width="1301" height="960" alt="image" src="https://github.com/user-attachments/assets/433a06bf-b616-43e1-9468-d691400fe654" />


🔗 **Discussion Link:** [Post on AWS Study Group VN](https://www.facebook.com/groups/660548818043427/user/100058180633098)

#AWS #AmazonBedrock #AWSLambda #AmazonS3 #DynamoDB #APIGateway #GenerativeAI #CloudArchitecture
