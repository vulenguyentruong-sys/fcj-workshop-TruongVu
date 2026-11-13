---
title: "Blog 3"
date: 2026-11-09
weight: 3
chapter: false
pre: " <b> 3.3. </b> "
---

# TÁCH BẠCH LUỒNG CI/CD CHO FRONTEND & BACKEND TRÊN AWS

Khi xây dựng ứng dụng Serverless, việc thiết lập một quy trình Tích hợp và Triển khai liên tục (CI/CD) linh hoạt là cực kỳ quan trọng. Thay vì sử dụng các công cụ bên thứ ba, hướng tiếp cận sử dụng trọn bộ dịch vụ native của AWS (CodePipeline, CodeBuild, CloudFormation...) mang lại sự đồng bộ cao. Điểm nhấn của kiến trúc này là sự phân tách hoàn toàn giữa luồng deploy giao diện tĩnh và luồng cập nhật hạ tầng.

Các điểm chính cần nắm về luồng CI/CD Frontend:

- Vòng đời triển khai bắt đầu khi lập trình viên (Developer) tiến hành đẩy mã nguồn (push code) lên kho lưu trữ CodeCommit.
- Sự kiện cập nhật mã nguồn này ngay lập tức kích hoạt (trigger) tiến trình xử lý trên dịch vụ CodeBuild.
- CodeBuild đảm nhận nhiệm vụ biên dịch mã nguồn và trực tiếp đẩy thư mục bản dựng (build and push build folder) vào không gian lưu trữ tĩnh S3 bucket.
- Xuyên suốt quá trình này, CodePipeline đóng vai trò là công cụ điều phối tự động toàn bộ luồng công việc bên trong hệ sinh thái AWS Cloud.

Các điểm chính cần nắm về luồng CI/CD Backend:

- Tương tự như Frontend, quy trình tự động được khởi tạo khi Developer push code lên kho lưu trữ CodeCommit.
- Sự thay đổi này sẽ tự động kích hoạt môi trường đóng gói của CodeBuild.
- Điểm khác biệt cốt lõi là CodeBuild không cập nhật trực tiếp lên các dịch vụ đích, mà phát lệnh triển khai hạ tầng (deploy stack) cho dịch vụ AWS CloudFormation.
- Dịch vụ AWS CloudFormation tiếp nhận cấu hình và tiến hành cập nhật các tài nguyên thực tế (update resources) một cách an toàn.
- Các dịch vụ Serverless đích chịu sự tác động và cập nhật bao gồm: các hàm xử lý logic (Lambda functions), bảng cơ sở dữ liệu (DynamoDB tables), không gian lưu trữ (S3 bucket), và hệ thống quản lý định danh người dùng (Cognito user pool).

**Hình ảnh**

<img width="1085" height="620" alt="image" src="https://github.com/user-attachments/assets/8c650c79-4610-4fdc-8fc5-946b55ff83d6" />

<img width="1056" height="572" alt="image" src="https://github.com/user-attachments/assets/10038089-9db8-4ffb-be37-a78829569343" />

**Link**

[Post on AWS Study Group VN](https://www.facebook.com/groups/660548818043427/user/100058180633098)

**Hướng dẫn**

Việc áp dụng kiến trúc Serverless kết hợp với bộ công cụ CI/CD native của AWS mang lại lợi thế lớn cho các dự án đám mây, đặc biệt khi cần thiết lập một nền tảng vận hành linh hoạt và bảo mật. Bằng cách tách bạch quy trình triển khai thành hai luồng độc lập, kiến trúc này không chỉ tối ưu hóa thời gian phát hành tính năng mới mà còn cô lập rủi ro gián đoạn dịch vụ, đảm bảo tính nhất quán hạ tầng từ khâu kiểm thử cho đến khi ứng dụng tiếp cận người dùng cuối.

#AWS #Serverless #CICD #AWSCodePipeline #CodeBuild #CloudFormation #CloudComputing #DevOps #AWSStudyGroupVN #FCAJ
