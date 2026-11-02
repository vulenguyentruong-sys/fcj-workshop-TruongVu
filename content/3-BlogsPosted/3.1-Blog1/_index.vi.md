---
title: "Blog 1"
date: 2026-10-31
weight: 1
chapter: false
pre: " <b> 3.1. </b> "
---

# XÂY DỰNG ỨNG DỤNG AI TRÊN AWS: KẾT HỢP AMAZON BEDROCK, LAMBDA VÀ API GATEWAY

Trong quá trình phát triển các ứng dụng AI hiện nay, việc tích hợp một mô hình ngôn ngữ lớn (LLM) vào hệ thống không còn là điều quá xa lạ. Tuy nhiên, làm thế nào để xây dựng một kiến trúc vừa có khả năng mở rộng, vừa dễ quản lý và đảm bảo hiệu suất hoạt động?

Một trong những hướng tiếp cận đáng chú ý là kết hợp Amazon Bedrock với các dịch vụ Serverless của AWS như AWS Lambda, Amazon API Gateway, Amazon S3 và DynamoDB.

Hôm nay, mình cùng tìm hiểu một kiến trúc ứng dụng AI được xây dựng trên AWS thông qua sơ đồ bên dưới nhé!

### 1. Tổng quan về kiến trúc
Kiến trúc này được chia thành hai phần chính:
- **Frontend:** Sử dụng Amazon S3 để lưu trữ website tĩnh và Amazon CloudFront để phân phối nội dung đến người dùng.
- **Backend:** Sử dụng API Gateway, Lambda và Amazon Bedrock để tiếp nhận yêu cầu, xử lý dữ liệu và tạo phản hồi từ AI.

Ngoài ra, hệ thống còn sử dụng DynamoDB để lưu trữ thông tin kiểm toán (Audit), metadata và S3 để lưu trữ nội dung phản hồi. Điểm đáng chú ý là toàn bộ hệ thống có thể hoạt động theo mô hình Serverless, giúp giảm nhu cầu quản lý máy chủ và linh hoạt mở rộng khi lượng người dùng tăng lên.

### 2. Vai trò của từng dịch vụ AWS

- **Amazon S3 – Static Website:** Được sử dụng để lưu trữ các tài nguyên của website như HTML, CSS, JavaScript và hình ảnh. Thay vì phải duy trì một máy chủ riêng để phục vụ website, chúng ta có thể lưu trữ các file tĩnh trực tiếp trên S3.
- **Amazon CloudFront – Content Delivery Network:** Đóng vai trò phân phối nội dung đến người dùng thông qua mạng lưới máy chủ biên (Edge Locations). Lợi ích:
  * Giảm độ trễ khi tải website.
  * Tăng tốc độ truy cập nội dung.
  * Hỗ trợ HTTPS và tích hợp các tính năng bảo mật.
- **Amazon API Gateway – API Management:** Là cổng tiếp nhận các request từ phía Client và chuyển tiếp đến backend. Đây là thành phần giúp frontend giao tiếp với hệ thống xử lý AI thông qua các REST API hoặc HTTP API.
- **AWS Lambda – Serverless Computing:** Trong kiến trúc này, Lambda được chia thành hai chức năng chính:
  * **Prompt Handler Function:** Tiếp nhận yêu cầu từ API Gateway, kiểm tra và chuẩn bị prompt trước khi gửi đến mô hình AI.
  * **Response Handler Function:** Xử lý kết quả trả về, định dạng phản hồi và thực hiện các thao tác lưu trữ cần thiết.
  *(Việc tách thành hai chức năng giúp hệ thống dễ bảo trì và phân chia trách nhiệm rõ ràng hơn).*
- **Amazon Bedrock – Foundation Models:** Đây là thành phần quan trọng nhất trong kiến trúc AI, cung cấp khả năng truy cập các Foundation Models thông qua API mà không cần tự triển khai hoặc quản lý hạ tầng chạy mô hình.
- **Amazon DynamoDB – Audit & Metadata:** Sử dụng để lưu trữ các thông tin có cấu trúc, chẳng hạn như ID người dùng/phiên làm việc, thời gian gửi yêu cầu, trạng thái xử lý và thông tin kiểm toán.
- **Amazon S3 – Response Storage:** Lưu các kết quả phản hồi từ AI, đặc biệt khi dữ liệu có kích thước lớn hoặc cần lưu trữ lâu dài.

### 3. Luồng hoạt động của hệ thống
Để dễ hình dung, chúng ta có thể chia quá trình hoạt động thành các bước:
1. **Người dùng truy cập ứng dụng:** Client truy cập website thông qua CloudFront. Các tài nguyên giao diện được phân phối từ S3 Static Website.
2. **Gửi yêu cầu đến Backend:** Khi người dùng nhập câu hỏi hoặc yêu cầu AI, frontend gửi request đến Amazon API Gateway.
3. **Xử lý Prompt:** API Gateway kích hoạt Prompt Handler Lambda. Hệ thống thực hiện kiểm tra dữ liệu đầu vào, chuẩn bị prompt và xác định yêu cầu cần gửi.
4. **Gọi mô hình AI:** Prompt Handler gửi yêu cầu đến Amazon Bedrock. Mô hình AI xử lý nội dung và trả về kết quả.
5. **Xử lý phản hồi:** Response Handler Lambda tiếp nhận kết quả, định dạng dữ liệu và chuẩn bị phản hồi.
6. **Lưu trữ dữ liệu:** Lưu metadata/thông tin kiểm toán vào DynamoDB, đồng thời lưu nội dung phản hồi vào Amazon S3.
7. **Trả kết quả:** Kết quả được trả về frontend để hiển thị trên giao diện ứng dụng.

### 4. Những vấn đề có thể gặp phải khi triển khai

* **Lambda Timeout:** Khi mô hình AI xử lý yêu cầu mất nhiều thời gian, Lambda có thể vượt quá thời gian thực thi cho phép.
  --> *Giải pháp:* Thiết kế timeout phù hợp, tối ưu prompt, cân nhắc kiến trúc xử lý bất đồng bộ.
* **Bedrock Throttling:** Khi có quá nhiều request gửi đến mô hình cùng lúc.
  --> *Giải pháp:* Kiểm tra quota của Bedrock, sử dụng cơ chế retry với exponential backoff, kiểm soát số lượng request đồng thời.
* **Access Denied:** Lambda không thể gọi Bedrock hoặc truy cập S3, DynamoDB do thiếu quyền.
  --> *Giải pháp:* Kiểm tra IAM Role của Lambda, cấp quyền theo nguyên tắc Least Privilege, rà soát Resource Policy.
* **Chi phí tăng cao:** Việc gọi LLM thường xuyên hoặc lưu trữ quá nhiều dữ liệu có thể làm tăng chi phí.
  --> *Giải pháp:* Theo dõi qua AWS Cost Explorer, giới hạn kích thước prompt, thiết lập S3 Lifecycle Policy.

### 5. Tại sao nên sử dụng kiến trúc này?
Một số lợi ích đáng chú ý:
- **Scalability:** Có thể mở rộng linh hoạt theo nhu cầu sử dụng.
- **Serverless:** Giảm công việc quản lý và vận hành máy chủ.
- **Modularity:** Các thành phần được tách biệt, thuận tiện bảo trì.
- **Cost Optimization:** Tính phí theo mức độ sử dụng của nhiều dịch vụ.
- **AI Integration:** Tích hợp Foundation Models thông qua Amazon Bedrock mà không cần tự quản lý hạ tầng mô hình.

### 6. Kết luận
Sự kết hợp giữa Amazon Bedrock, AWS Lambda, API Gateway, S3 và DynamoDB mang đến một hướng tiếp cận khá linh hoạt khi xây dựng ứng dụng AI trên nền tảng AWS. Điều thú vị là chúng ta không chỉ xây dựng một ứng dụng có khả năng trò chuyện với AI mà còn có thể phát triển thành những hệ thống phức tạp hơn như AI Assistant, Chatbot hỗ trợ khách hàng hay các ứng dụng xử lý tài liệu thông minh. 

Theo mình, việc hiểu rõ vai trò và luồng hoạt động của từng dịch vụ là bước quan trọng trước khi bắt tay vào triển khai một dự án AI thực tế.

<img width="1301" height="960" alt="image" src="https://github.com/user-attachments/assets/5f24e795-9ea6-42e5-a451-328390202c33" />


🔗 **Link bài viết thảo luận:** [Bài đăng trên AWS Study Group VN](https://www.facebook.com/groups/660548818043427/user/100058180633098)

#AWS #AmazonBedrock #AWSLambda #AmazonS3 #DynamoDB #APIGateway #GenerativeAI #CloudArchitecture
