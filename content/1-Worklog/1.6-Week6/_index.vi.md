---
title: "Worklog Tuần 6"
date: 2026-10-19
weight: 6
chapter: false
pre: " <b> 1.6. </b> "
---

<!-- {{% notice warning %}}
⚠️ **Lưu ý:** Các thông tin dưới đây chỉ nhằm mục đích tham khảo, vui lòng **không sao chép nguyên văn** cho bài báo cáo của bạn kể cả warning này.
{{% /notice %}} -->

### Mục tiêu tuần 6:

- Nghiên cứu và triển khai AWS IAM Identity Center để quản lý định danh tập trung cho tổ chức/nhóm dự án.
- Áp dụng nguyên tắc đặc quyền tối thiểu (Least Privilege) để cấp quyền truy cập an toàn cho từng thành viên trong team theo đúng vai trò.
- Cùng nhóm dự án thống nhất quy trình làm việc trên môi trường Cloud, đảm bảo an toàn bảo mật và kiểm soát chặt chẽ chi phí (AWS Credit).

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu |
| :---: | --- | :---: | :---: | --- |
| 2 | - Khởi động dự án nhóm: <br>&emsp; + Họp nhóm thống nhất luồng công việc trên AWS. <br>&emsp; + Nghiên cứu tổng quan về AWS IAM Identity Center và kiến trúc quản lý nhiều tài khoản. | 19/10/2026 | 19/10/2026 | [AWS Study Group](https://cloudjourney.awsfcaj.com/) |
| 3 | - Thiết lập danh tính trung tâm: <br>&emsp; + Cấu hình AWS IAM Identity Center. <br>&emsp; + Tạo Users và phân bổ vào các Groups tương ứng với vai trò của từng thành viên trong nhóm (VD: AI_Dev, Backend, Admin). | 20/10/2026 | 20/10/2026 | Bài lab 000012: IAM Identity Center |
| 4 | - Cấu hình chính sách bảo mật: <br>&emsp; + Tìm hiểu và thiết lập Customer Managed Policies. <br>&emsp; + Cấp quyền truy cập dựa trên nguyên tắc đặc quyền tối thiểu (Least Privilege) cho từng nhóm. | 21/10/2026 | 21/10/2026 | Bài lab 000012: IAM Identity Center |
| 5 | - Nâng cao bảo mật & Tự động hóa: <br>&emsp; + Nghiên cứu cơ chế Time-based access control (kiểm soát truy cập theo thời gian). <br>&emsp; + Làm quen với IAM Identity Center Identity Store APIs thông qua AWS CLI. | 22/10/2026 | 22/10/2026 | Bài lab 000012: IAM Identity Center |
| 6 | - Kiểm thử & Quản trị chi phí (FinOps): <br>&emsp; + Phối hợp cùng nhóm test chéo quyền truy cập của các tài khoản. <br>&emsp; + Thực hiện Resource Cleanup (dọn dẹp tài nguyên) cẩn thận theo cảnh báo của bài Lab để tránh cạn kiệt AWS Credit của team. | 23/10/2026 | 23/10/2026 | [AWS Study Group](https://cloudjourney.awsfcaj.com/) |

### Kết quả đạt được tuần 6:

- Nắm vững kiến trúc và triển khai thành công hệ thống AWS IAM Identity Center:
  * Hiểu rõ sự khác biệt và ưu điểm của IAM Identity Center so với IAM truyền thống trong việc quản lý quy mô lớn.
  * Xây dựng được kho lưu trữ danh tính (Identity Store) tập trung, giúp quá trình đăng nhập (SSO) của team tiện lợi và bảo mật hơn.

- Áp dụng thành công các nguyên tắc bảo mật cốt lõi vào thực tế dự án:
  * Phân chia rõ ràng cấu trúc User và Group, đảm bảo mỗi thành viên chỉ có quyền can thiệp vào các tài nguyên cần thiết cho công việc (Nguyên tắc Least Privilege).
  * Biết cách tự định nghĩa các Customer Managed Policies để kiểm soát chi tiết và linh hoạt hơn so với các policy mặc định của AWS.
  * Tiếp cận được kỹ thuật giới hạn quyền truy cập theo thời gian (Time-based access control).

- Cải thiện quy trình làm việc nhóm (Team Collaboration) và quản trị rủi ro:
  * Team đã có một môi trường làm việc chung chuẩn chỉ, an toàn và dễ dàng rà soát (audit) các thao tác của từng thành viên.
  * Tuân thủ nghiêm ngặt quy trình Resource Cleanup sau khi thử nghiệm, bảo vệ thành công ngân sách AWS Credit của nhóm chuẩn bị cho các đợt tích hợp mô hình AI nặng sắp tới.
