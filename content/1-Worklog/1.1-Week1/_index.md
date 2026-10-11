---
title: "Worklog Tuần 1"
date: 2026-09-14
weight: 1
chapter: false
pre: " <b> 1.1. </b> "
---

### Mục tiêu tuần 1:

- Làm quen với môi trường làm việc, thành viên team và quy định của chương trình First Cloud AI Journey (FCAJ).
- Hiểu các khái niệm Cloud Computing cơ bản và cách sử dụng AWS Management Console.
- Tạo và bảo mật AWS Account (Free Tier).
- Hoàn thành chuỗi 5 nhiệm vụ thực hành (Explore AWS) để nhận 100$ AWS Credit phục vụ cho đồ án/dự án thực tập.
- Nắm vững quy trình quản lý chi phí (FinOps) và dọn dẹp tài nguyên (Resource Lifecycle) an toàn.
- Lập đội nhóm (team) để chuẩn bị cho giai đoạn triển khai dự án thực tế.

### Các công việc đã làm trong tuần này:
| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu |
|:---:|---|:---:|:---:|---|
| 2 | - Đọc tài liệu định hướng, làm quen với hệ thống website nội bộ của chương trình. <br>&emsp; - Nắm bắt các quy định báo cáo (scoring, worklog). <br>&emsp; - Tạo và xác minh tài khoản AWS tiêu chuẩn. | 14/09/2026 | 14/09/2026 | [Hệ thống FCAJ Rules](https://hcm-rules.awsfcaj.com/) <br> [Tạo tài khoản AWS](https://aws.amazon.com/free/) |
| 3 | - Thực hành Compute & FinOps: <br>&emsp; + Khởi tạo và truy cập máy ảo Amazon EC2 (t3.micro). <br>&emsp; + Dọn dẹp (Terminate) EC2 ngay sau khi hoàn thành. <br>&emsp; + Tạo AWS Budgets để thiết lập cảnh báo ngân sách. | 15/09/2026 | 15/09/2026 | [AWS Console - EC2](https://console.aws.amazon.com/ec2/) <br> [AWS Console - Billing](https://console.aws.amazon.com/billing/) |
| 4 | - Thực hành Serverless & Database: <br>&emsp; + Viết và triển khai web app cơ bản bằng AWS Lambda. <br>&emsp; + Khởi tạo cơ sở dữ liệu Amazon RDS (MySQL) chuẩn Free Tier. <br>&emsp; + Xóa an toàn RDS (không giữ lại Snapshot & Automated backups). | 16/09/2026 | 16/09/2026 | [AWS Console - Lambda](https://console.aws.amazon.com/lambda/) <br> [AWS Console - RDS](https://console.aws.amazon.com/rds/) |
| 5 | - Thực hành Generative AI & Tổng kết: <br>&emsp; + Yêu cầu Model Access và trải nghiệm Foundation Model trên Amazon Bedrock. <br>&emsp; + Kiểm tra và xác nhận trang Billing (Credits) đã nhận đủ khoản tín dụng hỗ trợ. | 17/09/2026 | 17/09/2026 | [AWS Console - Bedrock](https://console.aws.amazon.com/bedrock/) |
| 6 | - Kết nối & Thành lập nhóm: <br>&emsp; + Giao lưu, kết nối với các thực tập sinh khác trong chương trình. <br>&emsp; + Thành lập team dự án, thảo luận sơ bộ chuẩn bị lên ý tưởng triển khai bài toán thực tế. | 18/09/2026 | 18/09/2026 | Thảo luận nội bộ |

### Kết quả đạt được tuần 1:

&emsp;◉ Thứ 2:
<br>&emsp;&emsp;○ Nắm rõ quy định thực tập và luồng vận hành của hệ thống FCAJ nội bộ.
<br>&emsp;&emsp;○ Tạo thành công AWS Account và hiểu cách sử dụng AWS Management Console.

&emsp;◉ Thứ 3:
<br>&emsp;&emsp;○ Hiểu vòng đời của máy ảo EC2, biết cách khởi tạo và dọn dẹp để không phát sinh chi phí ngầm.
<br>&emsp;&emsp;○ Thiết lập thành công AWS Budget, đảm bảo an toàn tài chính cho tài khoản.

&emsp;◉ Thứ 4:
<br>&emsp;&emsp;○ Tiếp cận kiến trúc Serverless, biết cách public một hàm Lambda qua Function URL.
<br>&emsp;&emsp;○ Cấu hình thành công RDS và nắm được "điểm chết" dễ mất tiền (Automated backups) để phòng tránh khi xóa DB.

&emsp;◉ Thứ 5:
<br>&emsp;&emsp;○ Nắm được cách xử lý khi gặp lỗi hạn mức (ThrottlingException) trên Amazon Bedrock.
<br>&emsp;&emsp;○ Hoàn thành xuất sắc 5 nhiệm vụ "Explore AWS", nhận thành công 100$ AWS Credit làm vốn thực hành cho các tuần thực tập tiếp theo.

&emsp;◉ Thứ 6:
<br>&emsp;&emsp;○ Thành lập team thành công, tạo bước đệm vững chắc để bắt đầu phân công công việc và thiết kế kiến trúc hệ thống trên AWS cho dự án sắp tới.
