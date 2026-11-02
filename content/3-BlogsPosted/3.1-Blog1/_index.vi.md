---
title: "Blog 1"
date: 2026-10-31
weight: 1
chapter: false
pre: " <b> 3.1. </b> "
---

### SESSION POLICIES TRONG AMAZON EKS POD IDENTITY

Amazon EKS Pod Identity vừa bổ sung tính năng **session policies**, cho phép bạn thu hẹp quyền IAM một cách linh hoạt và chính xác cho từng pod mà không cần tạo thêm nhiều IAM roles riêng biệt. Đây là bước tiến quan trọng giúp áp dụng nguyên tắc *least privilege* (đặc quyền tối thiểu) hiệu quả hơn trong môi trường Kubernetes quy mô lớn.

**Các điểm chính cần nắm:**

- **Session policy** là một IAM policy inline được chỉ định khi tạo hoặc cập nhật Pod Identity association.
- **Quyền hiệu quả (Effective permissions)** = intersection (giao) giữa permissions của IAM role và session policy → session policy chỉ có thể thu hẹp, không thể mở rộng quyền.
- Giúp tránh tình trạng *over-permissioning* khi reuse (tái sử dụng) chung một IAM role cho nhiều workloads có nhu cầu khác nhau.
- Hỗ trợ cả same-account và cross-account (thông qua IAM role chaining).
- Giảm đáng kể số lượng IAM roles cần quản lý, giúp tránh chạm giới hạn quota IAM trong các cluster lớn.
- Cấu hình dễ dàng qua AWS Management Console, AWS CLI hoặc AWS SDK khi tạo association giữa Kubernetes ServiceAccount và IAM role.

💡 Tính năng này đặc biệt hữu ích khi bạn có nhiều ứng dụng chạy trên cùng một IAM role nhưng cần giới hạn quyền khác nhau (ví dụ: một pod chỉ đọc S3 bucket cụ thể, pod khác chỉ gọi một số API nhất định).

---

**📷 Hình ảnh minh họa:**
<!-- Chèn link ảnh của bạn vào bên dưới, ví dụ: ![Kiến trúc EKS](https://link-anh-cua-ban.jpg) -->


**🔗 Link tham khảo:**
<!-- Chèn link bài đăng hoặc tài liệu tham khảo vào bên dưới -->
- [Bài viết gốc trên Group AWS Study Group](https://www.facebook.com/groups/660548818043427/user/100058180633098)

**🛠️ Hướng dẫn cấu hình:**
<!-- Bổ sung các bước thực hành hoặc đoạn code CLI/YAML tại đây -->
