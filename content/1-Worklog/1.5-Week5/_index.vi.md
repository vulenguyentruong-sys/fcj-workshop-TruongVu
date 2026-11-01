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

Tuần này, mình tập trung vào việc giải quyết triệt để 2 vấn đề lớn nhất khi vận hành hệ thống EC2:
- Loại bỏ hoàn toàn lỗ hổng bảo mật khi mở Port 22 (SSH) và dẹp bỏ cơn ác mộng mang tên chia sẻ file `.pem` trong team.
- Chấm dứt tình trạng "cháy ví" (cạn kiệt AWS Credit) do team hay quên tắt EC2 sau khi làm lab.

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu |
| :---: | --- | :---: | :---: | --- |
| 2 | - **Nghiên cứu rủi ro bảo mật:** <br>&emsp; + Đánh giá nguy cơ từ việc mở Inbound Rule Port 22. <br>&emsp; + Bàn luận cách quản lý SSH Key an toàn. | 12/10/2026 | 12/10/2026 | [AWS Study Group](https://cloudjourney.awsfcaj.com/) |
| 3 | - **Bảo mật truy cập EC2:** <br>&emsp; + Xóa bỏ hoàn toàn Port 22 trên Security Group. <br>&emsp; + Hoàn thành lab truy cập an toàn bằng Session Manager. | 13/10/2026 | 13/10/2026 | [Remote Server Access with Systems Manager Session Manager](https://000058.awsfcaj.com) |
| 4 | - **Giải quyết rủi ro tài chính (FinOps):** <br>&emsp; + Quy hoạch lại các EC2 cần tự động tắt. <br>&emsp; + Gắn tag `AutoStop = True` để đánh dấu tài nguyên. | 14/10/2026 | 14/10/2026 | [Resource Organization with Tags and Resource Groups](https://000027.awsfcaj.com) |
| 5 | - **Thiết lập tự động hóa:** <br>&emsp; + Viết code Lambda (Boto3) quét và tắt các EC2 có tag `AutoStop`. <br>&emsp; + Hẹn giờ tắt máy (cron job) bằng Amazon EventBridge. | 15/10/2026 | 15/10/2026 | [Serverless Automation with AWS Lambda](https://000022.awsfcaj.com) |
| 6 | - **Cấu hình cảnh báo Slack:** <br>&emsp; + Tạo Webhook từ kênh Slack của dự án. <br>&emsp; + Code thêm đoạn logic đẩy thông báo hoàn tất dọn dẹp về Slack. <br>&emsp; + Test end-to-end. | 16/10/2026 | 16/10/2026 | Cấu hình nội bộ team |

### Kết quả đạt được tuần 5:

- **Bảo vệ hệ thống thành công:** Bằng cách đóng cửa Port 22 và sử dụng AWS Systems Manager, mình đã chặn đứng được rủi ro bị hacker scan cổng và tấn công Brute-force. Team giờ đây không còn phải chật vật gửi file `.pem` cho nhau nữa, mọi thao tác phân quyền đều được quản lý tập trung và an toàn qua IAM Role.

- **Tối ưu chi phí (FinOps) triệt để:** Việc áp dụng Tagging Strategy kết hợp với kiến trúc Serverless (Lambda + EventBridge) đã giải quyết xong "căn bệnh hay quên" của cả nhóm. Các con EC2 dùng để test sẽ tự động tắt đúng giờ. Việc cấu hình thêm thông báo đẩy về Slack mỗi khi tắt máy thành công giúp mọi người trong team đều có thể theo dõi chi phí một cách cực kỳ minh bạch và an tâm ngủ ngon mỗi tối.
