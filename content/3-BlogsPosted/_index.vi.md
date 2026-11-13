---
title: "Các bài blogs đã đăng"
date: 2026-09-14
weight: 3
chapter: false
pre: " <b> 3. </b> "
---

Tại đây sẽ là phần liệt kê, giới thiệu các blogs mà mình đã đăng trên [AWS Study Group](https://www.facebook.com/groups/awsstudygroupfcj). Cụ thể như sau:

### [Blog 1 - XÂY DỰNG ỨNG DỤNG AI TRÊN AWS: KẾT HỢP AMAZON BEDROCK, LAMBDA VÀ API GATEWAY](3.1-Blog1/)
Blog này giới thiệu một hướng tiếp cận linh hoạt để xây dựng ứng dụng AI tạo sinh (Generative AI) bằng cách kết hợp Amazon Bedrock với các dịch vụ Serverless của AWS. Thông qua kiến trúc sử dụng API Gateway, Lambda, S3 và DynamoDB, hệ thống có thể tiếp nhận yêu cầu, xử lý dữ liệu và tạo phản hồi từ AI một cách tự động, tối ưu chi phí và linh hoạt mở rộng quy mô mà không cần phải quản lý máy chủ.

### [Blog 2 - BÀI TOÁN BẢO MẬT DỮ LIỆU VỚI S3, KMS, CLOUDTRAIL & ATHENA](3.2-Blog2/)
Blog này chia sẻ một luồng kiến trúc chuẩn mực để giải quyết bài toán bảo mật dữ liệu nhạy cảm trên môi trường Production. Bằng cách kết hợp 4 dịch vụ S3, KMS, CloudTrail và Athena, hệ thống sẽ tự động mã hóa dữ liệu (Encryption at rest), ghi log toàn bộ thao tác truy cập và cho phép truy vấn kiểm toán (audit) một cách serverless. Đây là giải pháp hoàn hảo giúp dự án đạt các chuẩn Compliance khắt khe và đảm bảo phân tách trách nhiệm (Segregation of Duties).

### [Blog 3 - TÁCH BẠCH LUỒNG CI/CD CHO FRONTEND & BACKEND TRÊN AWS](3.3-Blog3/)
Blog này chia sẻ kiến trúc Tích hợp và Triển khai liên tục (CI/CD) sử dụng trọn bộ dịch vụ native của AWS như CodePipeline, CodeBuild và CloudFormation. Việc phân tách hoàn toàn giữa luồng deploy giao diện tĩnh (Frontend) và luồng cập nhật hạ tầng Serverless (Backend) giúp tối ưu hóa thời gian phát hành tính năng mới, giảm thiểu rủi ro chéo và đảm bảo tính nhất quán từ khâu kiểm thử đến khi ứng dụng tiếp cận người dùng cuối.
