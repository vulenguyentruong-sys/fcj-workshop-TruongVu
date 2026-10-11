---
title: "Worklog Tuần 2"
date: 2026-09-21
weight: 2
chapter: false
pre: " <b> 1.2. </b> "
---

### Mục tiêu tuần 2:

- Làm quen với các bài lab nâng cao trên trang học tập nội bộ `cloudjourney.awsstudygroup.com`.
- Thực hành tối ưu hóa chi phí hệ thống (Cost Optimization) thông qua việc tự động hóa bật/tắt EC2 bằng AWS Lambda.
- Tìm hiểu cách tích hợp thông báo trạng thái tài nguyên Cloud về ứng dụng chat (Slack Incoming Webhooks).
- Tìm hiểu các khái niệm về vận hành (Operate) và Bảo mật (Security) trong kiến trúc AWS.
- Tham gia sự kiện Kickstart chính thức của chương trình FCAJ Buildrathon 2026 tại văn phòng.

### Các công việc đã làm trong tuần này:
| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu |
|:---:|---|:---:|:---:|---|
| 2 | - Truy cập nền tảng `cloudjourney.awsstudygroup.com`. <br>&emsp; - Đọc tài liệu chuẩn bị cho bài lab tối ưu hóa chi phí EC2 bằng Lambda. <br>&emsp; - Hiểu quy trình tạo môi trường mạng cơ sở (VPC) và tường lửa ảo (Security Group). | 21/09/2026 | 21/09/2026 | [000022.awsstudygroup.com - Preparation steps](https://000022.awsstudygroup.com/2-prerequisite/) |
| 3 | - Thực hành Tự động hóa (Automation): <br>&emsp; + Khởi tạo VPC và Security Group theo hướng dẫn. <br>&emsp; + Khởi tạo EC2 instance làm mục tiêu (target) để test tính năng start/stop. | 22/09/2026 | 22/09/2026 | Bài Lab 000022 - Create VPC & EC2 |
| 4 | - Thực hành Tích hợp (Integration): <br>&emsp; + Cấu hình Slack Incoming Webhooks. <br>&emsp; + Viết và cấp quyền (IAM Role) cho hàm AWS Lambda để gửi thông báo trạng thái EC2 về kênh Slack. | 23/09/2026 | 23/09/2026 | Bài Lab 000022 - Lambda & Slack |
| 5 | - Thực hiện kiểm thử (Testing) luồng tự động bật/tắt EC2 và gửi thông báo. <br>&emsp; - Hoàn thành bài lab và dọn dẹp sạch sẽ toàn bộ tài nguyên (Clean up resources) để tránh phí phát sinh. | 24/09/2026 | 24/09/2026 | Bài Lab 000022 - Testing & Cleanup |
| 6 | - Nghiên cứu tài liệu lý thuyết về Vận hành (Operate) và Bảo mật (Security). <br>&emsp; - Tìm hiểu về Amazon Cloudwatch, Resource Groups, AWS System Manager và IAM Permission Boundary. | 25/09/2026 | 25/09/2026 | [The First Cloud Journey - Optimizing the system](https://cloudjourney.awsstudygroup.com/3-optimize/) |
| 7 | - Sự kiện Offline: Tham gia buổi "FCAJ Buildrathon 2026 Season 1 - Kickstart !" tại Văn phòng AWS Bitexco. <br>&emsp; - Lắng nghe phổ biến thể lệ, gặp gỡ giao lưu trực tiếp với các team và Mentor. | 26/09/2026 | 26/09/2026 | Sự kiện Kickoff - Bitexco |

### Kết quả đạt được tuần 2:

&emsp;◉ Thứ 2 - Thứ 5:
<br>&emsp;&emsp;○ Hiểu và triển khai thành công luồng tự động hóa quản lý hạ tầng: Sử dụng AWS Lambda để start/stop EC2 nhằm tối ưu chi phí (Cost Optimization).
<br>&emsp;&emsp;○ Biết cách cấu hình IAM Role cho Lambda và tích hợp API đẩy thông báo thời gian thực về Slack (Incoming Webhooks).
<br>&emsp;&emsp;○ Tiếp tục duy trì kỷ luật dọn dẹp tài nguyên (Clean up) an toàn sau khi lab.

&emsp;◉ Thứ 6:
<br>&emsp;&emsp;○ Mở rộng kiến thức về các công cụ giám sát, quản lý và bảo mật hệ thống trên AWS (Cloudwatch, System Manager, SSO, WAF...).

&emsp;◉ Thứ 7:
<br>&emsp;&emsp;○ Tham gia đầy đủ sự kiện Kickstart, hiểu rõ luật chơi của mùa giải Buildrathon và thắt chặt tinh thần làm việc nhóm với các thành viên.
