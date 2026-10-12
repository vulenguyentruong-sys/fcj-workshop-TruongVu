---
title: "Worklog Tuần 4"
date: 2026-10-05
weight: 4
chapter: false
pre: " <b> 1.4. </b> "
---

### Mục tiêu tuần 4:

- Nâng cao kỹ năng Vận hành (Operate) thông qua việc quản lý tài nguyên AWS quy mô lớn bằng Tag và Resource Groups[cite: 8].
- Nghiên cứu và thực hành mô hình phân quyền bảo mật cấp cao (ABAC) thông qua IAM kết hợp với Tag[cite: 8].
- Làm quen với công cụ AWS Systems Manager để tự động hóa các tác vụ quản trị máy chủ[cite: 8].
- Thảo luận nhóm (Brainstorming), thống nhất và chốt đề tài dự án thực tế cho chương trình FCAJ Buildrathon.

### Các công việc đã làm trong tuần này:
| Thứ | Công việc | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu |
|:---:|---|:---:|:---:|---|
| 2 | - **Thực hành Quản lý tài nguyên:** <br>&emsp; + Tìm hiểu chiến lược đánh thẻ (Tagging Strategy) cho doanh nghiệp. <br>&emsp; + Hoàn thành lab *Manage resources in groups with Tag and Resource Groups*[cite: 8]. | 05/10/2026 | 05/10/2026 | [AWS Study Group - Optimize](https://000027.awsstudygroup.com/) |
| 3 | - **Thực hành Bảo mật nâng cao (ABAC):** <br>&emsp; + Tìm hiểu sự khác biệt giữa RBAC và ABAC. <br>&emsp; + Hoàn thành lab *Manage EC2 service access with Tag through IAM*[cite: 8]. | 06/10/2026 | 06/10/2026 | [AWS Study Group - Optimize](https://cloudjourney.awsstudygroup.com/3-optimize/) |
| 4 | - **Thực hành Tự động hóa Vận hành:** <br>&emsp; + Khám phá các tính năng của AWS Systems Manager (Run Command, Patch Manager). <br>&emsp; + Hoàn thành lab *Service management and task automation using AWS System Manager*[cite: 8]. | 07/10/2026 | 07/10/2026 | [AWS Study Group - Optimize](https://cloudjourney.awsstudygroup.com/3-optimize/) |
| 5 | - Dọn dẹp tài nguyên lab (Terminate EC2, xóa Tags, Resource Groups, IAM Policy) để đảm bảo không phát sinh chi phí. <br>&emsp; - Đọc trước tài liệu chuẩn bị cho dự án nhóm. | 08/10/2026 | 08/10/2026 | [AWS Console](https://000028.awsstudygroup.com/6-cleanup/) | [](https://000027.awsstudygroup.com/4-cleanup/) | [](https://000031.awsstudygroup.com/5-cleanup/)
| 6 | - **Họp nhóm & Chốt dự án:** <br>&emsp; + Tổ chức họp team (Brainstorming session). <br>&emsp; + Đánh giá tính khả thi (thời gian, kỹ năng, chi phí AWS Credit). <br>&emsp; + Thống nhất và chốt đề tài dự án thực tế để bắt đầu triển khai kiến trúc. | 09/10/2026 | 09/10/2026 | Thảo luận nhóm nội bộ |

### Kết quả đạt được tuần 4:

&emsp;◉ Thứ 2 - Thứ 4:
<br>&emsp;&emsp;○ **Tư duy quản trị tài nguyên quy mô lớn (Governance):** Nắm vững cách phân loại và quản lý hàng nghìn tài nguyên rải rác thông qua AWS Resource Groups và Tags. Việc áp dụng đúng Tagging Strategy giúp tối ưu hóa việc phân tích chi phí (Cost Allocation) sau này.
<br>&emsp;&emsp;○ **Bảo mật linh hoạt với ABAC (Attribute-Based Access Control):** Thay vì chỉ cấp quyền theo vai trò (Role), tôi đã biết cách sử dụng Tag làm điều kiện phân quyền IAM. Điều này giúp ngăn chặn việc kỹ sư dự án A vô tình thao tác xóa/sửa máy chủ EC2 của dự án B dù họ có cùng chức danh.
<br>&emsp;&emsp;○ **Tự động hóa vận hành:** Hiểu được sức mạnh của AWS Systems Manager trong việc quản trị hàng loạt máy chủ (thực thi lệnh, vá lỗi tự động) mà không cần phải mở cổng SSH (Port 22), giúp gia tăng đáng kể tính bảo mật và hiệu suất vận hành.

&emsp;◉ Thứ 5 - Thứ 6:
<br>&emsp;&emsp;○ **Kỷ luật tài chính (FinOps):** Tiếp tục duy trì thói quen kiểm tra và dọn dẹp sạch sẽ tài nguyên sau khi làm lab, đảm bảo bảo toàn số AWS Credits đang có cho dự án cuối khóa.
<br>&emsp;&emsp;○ **Kỹ năng làm việc nhóm & Lên ý tưởng (Teamwork & Ideation):** Vận dụng kiến thức thực chiến từ các tuần trước và các buổi Talkshow để đánh giá rủi ro kỹ thuật. Team đã thống nhất được một đề tài dự án khả thi, giải quyết đúng "nỗi đau" (pain points) thực tế và sẵn sàng bước vào giai đoạn phác thảo kiến trúc (Architecture Design) vào tuần tới.
