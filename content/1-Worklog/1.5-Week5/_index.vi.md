---
title: "Worklog Tuần 5"
date: 2026-10-12
weight: 5
chapter: false
pre: " <b> 1.5. </b> "
---

<!-- {{% notice warning %}}
⚠️ **Lưu ý:** Các thông tin dưới đây chỉ nhằm mục đích tham khảo, vui lòng **không sao chép nguyên văn** cho bài báo cáo của bạn kể cả warning này.
{{% /notice %}} -->

### Mục tiêu tuần 5:

- Giải quyết triệt để rủi ro bảo mật khi mở Port 22 (SSH) trên Internet.
- Thiết lập phương thức truy cập máy chủ (EC2) an toàn tuyệt đối mà không cần dùng đến SSH Key (`.pem`).
- Tự động hóa quy trình tắt EC2 sau giờ làm qua AWS Lambda và EventBridge để ngăn tình trạng cạn AWS Credit.
- Cấu hình thông báo tự động (Alert) qua Slack giúp team giám sát chi phí.

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu |
| :---: | --- | :---: | :---: | --- |
| 2 | - Nghiên cứu rủi ro bảo mật: <br>&emsp; + Đánh giá nguy cơ từ việc mở Inbound Port 22. <br>&emsp; + Bàn luận cách quản lý SSH Key an toàn. | 12/10/2026 | 12/10/2026 | [AWS Study Group](https://cloudjourney.awsfcaj.com/) |
| 3 | - Bảo mật truy cập EC2: <br>&emsp; + Xóa bỏ hoàn toàn Port 22 trên Security Group. <br>&emsp; + Hoàn thành lab truy cập bằng Session Manager. | 13/10/2026 | 13/10/2026 | [Remote Server Access with Session Manager](https://000058.awsfcaj.com) |
| 4 | - Giải quyết rủi ro tài chính (FinOps): <br>&emsp; + Quy hoạch lại các EC2 cần tự động tắt. <br>&emsp; + Gắn tag `AutoStop = True` để đánh dấu. | 14/10/2026 | 14/10/2026 | [Resource Organization with Tags](https://000027.awsfcaj.com) |
| 5 | - Thiết lập tự động hóa: <br>&emsp; + Viết code Lambda (Boto3) quét và tắt EC2 có tag. <br>&emsp; + Hẹn giờ (cron job) bằng Amazon EventBridge. | 15/10/2026 | 15/10/2026 | [Serverless Automation with AWS Lambda](https://000022.awsfcaj.com) |
| 6 | - Cấu hình cảnh báo Slack: <br>&emsp; + Tạo Webhook từ kênh Slack của team. <br>&emsp; + Đẩy thông báo hoàn tất dọn dẹp về Slack. <br>&emsp; + Test end-to-end toàn bộ luồng. | 16/10/2026 | 16/10/2026 | [Serverless Automation with AWS Lambda](https://000022.awsfcaj.com) |

### Kết quả đạt được tuần 5:

- Giải quyết triệt để rủi ro bảo mật liên quan đến kết nối máy chủ EC2:
  * Loại bỏ hoàn toàn lỗ hổng từ việc mở Port 22 (SSH) ra public internet.
  * Ngăn chặn thành công các nguy cơ bị tấn công Brute-force từ bên ngoài.
  * Loại bỏ sự phụ thuộc và rủi ro rò rỉ khi chia sẻ file khóa bảo mật (`.pem`) trong nhóm.

- Thiết lập thành công phương thức truy cập máy chủ an toàn thông qua AWS Systems Manager (SSM):
  * Cấu hình và gán IAM Role (`AmazonSSMManagedInstanceCore`) cho các máy chủ EC2.
  * Truy cập trực tiếp bằng giao diện dòng lệnh thông qua Session Manager trên AWS Console.
  * Đảm bảo mọi thao tác truy cập đều được quản lý phân quyền tập trung qua IAM và có khả năng ghi log (Audit) rõ ràng.

- Xây dựng hệ thống tự động hóa Serverless để tối ưu chi phí (FinOps):
  * Ứng dụng chiến lược Tagging (gắn tag `AutoStop = True`) để phân loại các máy chủ dành cho môi trường dev/test.
  * Lập trình hàm AWS Lambda (sử dụng Python/Boto3) để tự động tìm kiếm và tắt (stop) các máy chủ đang chạy ngoài giờ làm việc.
  * Cấu hình Amazon EventBridge để lên lịch biểu (cron job) kích hoạt hàm Lambda chạy tự động mỗi đêm.

- Thiết lập kênh giám sát và thông báo tự động cho đội ngũ (Team Collaboration):
  * Cấu hình thành công API Webhook liên kết với kênh Slack của dự án.
  * Tích hợp code gọi Webhook vào AWS Lambda để tự động đẩy thông báo trạng thái dọn dẹp máy chủ.
  * Giúp toàn bộ thành viên theo dõi được chi phí AWS Credit minh bạch và an tâm hệ thống đã được tắt an toàn mà không cần đăng nhập vào AWS.
