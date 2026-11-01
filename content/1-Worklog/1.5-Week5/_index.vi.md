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

- Giải quyết triệt để rủi ro bảo mật liên quan đến việc mở Port 22 (SSH) trên Internet.
- Thiết lập phương thức truy cập máy chủ (EC2) an toàn tuyệt đối mà không cần dùng đến SSH Key (`.pem`).
- Tự động hóa quy trình tắt EC2 sau giờ làm việc để ngăn chặn tình trạng cạn kiệt AWS Credit ("cháy ví") thông qua AWS Lambda và EventBridge.
- Cấu hình thông báo tự động (Alert) qua Slack giúp team giám sát chi phí dễ dàng hơn.

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu |
| :---: | --- | :---: | :---: | --- |
| 2 | - **Nghiên cứu rủi ro bảo mật:** <br>&emsp; + Đánh giá nguy cơ từ việc mở Inbound Rule Port 22 trên Security Group. <br>&emsp; + Phân tích bài toán khó khăn khi chia sẻ và quản lý SSH Key trong team. | 12/10/2026 | 12/10/2026 | [AWS Study Group](https://cloudjourney.awsstudygroup.com/) |
| 3 | - **Thực hành truy cập EC2 không cần Port 22:** <br>&emsp; + Xóa bỏ hoàn toàn Port 22 trên Security Group. <br>&emsp; + Cấu hình IAM Role `AmazonSSMManagedInstanceCore` cho EC2. <br>&emsp; + Sử dụng AWS Systems Manager (SSM) Session Manager để truy cập trực tiếp qua Console. | 13/10/2026 | 13/10/2026 | [AWS Study Group](https://cloudjourney.awsstudygroup.com/) |
| 4 | - **Giải bài toán FinOps (Quên tắt EC2):** <br>&emsp; + Lên danh sách các tài nguyên (EC2) cần tự động tắt. <br>&emsp; + Gắn tag `AutoStop = True` cho các EC2 này. | 14/10/2026 | 14/10/2026 | [AWS Study Group](https://cloudjourney.awsstudygroup.com/) |
| 5 | - **Thực hành thiết lập Lambda & EventBridge:** <br>&emsp; + Viết code Python (Boto3) cho AWS Lambda để tìm và tắt các EC2 có tag `AutoStop = True`. <br>&emsp; + Cấu hình Amazon EventBridge với lịch biểu cron (VD: 22h00 thứ Hai - thứ Sáu) để trigger hàm Lambda. | 15/10/2026 | 15/10/2026 | [AWS Study Group](https://cloudjourney.awsstudygroup.com/) |
| 6 | - **Tích hợp Webhook & Thông báo Slack:** <br>&emsp; + Khởi tạo Webhook API từ kênh Slack của dự án (aws-lambda-labs). <br>&emsp; + Cập nhật code Lambda để đẩy thông báo về Slack sau khi hoàn tất dọn dẹp. <br>&emsp; + Test thực tế và nghiệm thu toàn bộ luồng. | 16/10/2026 | 16/10/2026 | [AWS Study Group](https://cloudjourney.awsstudygroup.com/) |

### Kết quả đạt được tuần 5:

- **Về Bảo mật (Security Pillar):**
  * Loại bỏ hoàn toàn lỗ hổng (Attack Surface) từ Port 22, ngăn chặn triệt để nguy cơ bị tấn công Brute-force từ bên ngoài.
  * Tạm biệt cơn ác mộng quản lý và chia sẻ file `.pem`. Mọi thao tác cấp quyền/thu hồi quyền remote server giờ đây được thực hiện tập trung, chuẩn chỉ qua AWS IAM.
  * Chuyển đổi thành công sang phương thức kết nối Outbound bảo mật bằng AWS Systems Manager (SSM) Session Manager, mọi thao tác dòng lệnh đều có thể được Audit (ghi log).

- **Về Tối ưu chi phí (Cost Optimization / FinOps):**
  * Áp dụng tư duy quản lý tài nguyên linh hoạt bằng Tag (kế thừa kiến thức từ Tuần 4).
  * Xây dựng thành công hệ thống tự động hóa Serverless (Lambda + EventBridge), xử lý dứt điểm "bệnh não cá vàng" quên tắt server cuối tuần.
  * Đảm bảo nguồn tiền AWS Credit được bảo toàn tối đa, sẵn sàng cho các pha "đốt tiền" của mô hình AI trong giai đoạn dự án cuối.

- **Về Vận hành (Operational Excellence):**
  * Tích hợp thành công kênh thông báo tự động về Slack của team, giúp mọi thành viên đều nắm bắt được tình trạng hệ thống mà không cần đăng nhập vào AWS Console.
