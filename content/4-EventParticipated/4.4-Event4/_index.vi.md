---
title: "Event 4: Meetup First Cloud AI Journey"
date: 2026-10-24
weight: 4
chapter: false
pre: " <b> 4.4. </b> "
---

<!-- {{% notice warning %}}
⚠️ **Lưu ý:** Các thông tin dưới đây chỉ nhằm mục đích tham khảo, vui lòng **không sao chép nguyên văn** cho bài báo cáo của bạn kể cả warning này.
{{% /notice %}} -->

# Bài thu hoạch “Meetup First Cloud AI Journey - Tháng 10/2026”

### Mục Đích Của Sự Kiện

- Tiếp cận kiến thức thực chiến về Cloud và AI Agent trực tiếp từ các Tech Lead và kỹ sư đang làm việc tại các doanh nghiệp.
- Tìm hiểu các giải pháp kiến trúc nâng cao trên AWS (Voice AI, Resource Access Manager, Pentest tự động, Bedrock AgentCore).
- Giao lưu, kết nối và học hỏi kinh nghiệm phát triển AI Agent trong môi trường doanh nghiệp thực tế.

### Khách Mời Đặc Biệt & Địa Điểm

- **Diễn giả:** Anh Kiệt Trần (Revve AI), Anh Long Huỳnh & Anh Thịnh Nguyễn (Styl Solution), Anh Xuân An (Leader AWS Student Builder Group HCMUTE), Anh Khoa Kiều (Tech Lead ACB) & Anh Nghi Danh (AWS Community Builder).
- **Thời gian & Địa điểm:** 9:00 - 12:00 AM, Thứ Bảy ngày 24/10/2026 tại Văn phòng AWS, Tầng 26, Tòa nhà Bitexco Financial Tower, TP.HCM.

### Nội Dung Nổi Bật

Buổi Meetup diễn ra cô đọng với 5 phiên (sessions) chứa đựng hàm lượng "chất xám" chuyên môn cực kỳ cao:

#### Session 1: Building a Vietnamese Voice-AI Contact Center
- Khám phá kiến trúc Voice AI trên AWS tối ưu hóa độ trễ xuống mức ~1.8s, mang lại trải nghiệm giao tiếp mượt mà.
- Điểm nhấn: Live demo AI gọi điện trực tiếp phỏng vấn sơ tuyển vị trí Cloud Engineer bằng tiếng Việt cực kỳ tự nhiên.

#### Session 2: AWS Resource Access Manager (RAM)
- Giải pháp chia sẻ tài nguyên an toàn giữa các tài khoản trong AWS Organization.
- Cách gom cụm quản trị mạng và kết hợp chặt chẽ giữa IAM policy với Service Control Policies (SCP) để kiểm soát trần quyền hạn, giúp doanh nghiệp tiết kiệm chi phí.

#### Session 3: AWS Pentest với Security Agent
- Đánh giá an toàn hạ tầng từ sớm (Shift-left security): Review code Terraform trực tiếp trên GitLab/GitHub PR để bắt lỗi.
- Ứng dụng Security Agent đóng vai người dùng thực để tự động pentest trên môi trường SIT/UAT trước khi deploy lên Production.

#### Session 4: Amazon Bedrock AgentCore
- Trình bày toàn diện về việc đưa Agent lên môi trường production:
  + **Agent Runtime:** Chạy MicroVM trên hạ tầng EC2 Spot để tối ưu chi phí.
  + **Hệ thống Memory:** Phân tầng thành Short-term (đồng bộ) và Long-term (bất đồng bộ) giúp AI hiểu sâu ngữ cảnh người dùng.

#### Session 5: Kiro Crew (AI Agent 24/7)
- Bài toán thiết kế AI Agent hỗ trợ review code và kiểm tra hệ thống hoạt động 24/7.
- **Tạo Artifacts:** Tự động cào dữ liệu việc làm thực tế và xuất biểu đồ thống kê ngay trong khung chat.
- **Quản trị Context Window:** Cơ chế Auto Compact khi ngữ cảnh chạm ngưỡng 70-90% và tính năng "Break down context" để kiểm soát lượng token tiêu thụ.
- **Memory & Guardrails:** Chiến lược dọn dẹp memory cũ tránh phình chi phí và thiết lập lớp rào chắn (Guardrails) bảo mật, ngăn AI tự ý xóa hạ tầng hoặc làm lộ secret/credential của máy chủ.

### Những Gì Học Được

- **Tư duy kiến trúc AI Agent:** Nhận ra rằng để đưa AI vào thực tế, không chỉ cần mô hình thông minh mà còn phải giải quyết bài toán độ trễ (latency), quản lý token (Context Window) và chi phí lưu trữ trí nhớ (Memory).
- **Bảo mật tự động hóa:** Hiểu được tầm quan trọng của Guardrails cho AI và cách tích hợp kiểm thử bảo mật (Pentest) ngay từ khâu viết code Terraform.

### Ứng Dụng Vào Công Việc (Dự Án FCAJ)

- **Quản lý Token & Context:** Áp dụng ngay cơ chế Auto Compact và quản lý luồng hội thoại cho con Bot của team dự án để tránh vượt quá giới hạn token của LLM, giúp tiết kiệm AWS Credit.
- **Thiết lập Guardrails:** Sẽ thiết kế một lớp kiểm soát an toàn để đảm bảo AI Agent của team không thực thi các lệnh nguy hiểm hoặc rò rỉ thông tin nhạy cảm.

### Trải nghiệm trong event

Sáng thứ Bảy tại Bitexco thực sự là một trải nghiệm đáng nhớ và bùng nổ năng lượng đối với tôi.

#### Góc nhìn mở rộng từ thực tế doanh nghiệp
Được ngồi nghe trực tiếp các anh Tech Lead chia sẻ, tôi mới thấy kiến thức ngoài thực tế rộng lớn và thú vị hơn rất nhiều so với những bài lab tiêu chuẩn. Phần live demo AI phỏng vấn tiếng Việt của Revve AI đã thực sự làm tôi choáng ngợp về mức độ hoàn thiện của công nghệ Voice AI hiện tại.

#### Session Kiro Crew đầy sức hút
Phần hỏi đáp kỹ thuật cuối giờ với anh Khoa Kiều và anh Nghi Danh là phần tôi tâm đắc nhất. Cách các anh giải quyết bài toán "nhức nhối" như dọn dẹp memory cũ hay thiết lập Guardrails cho AI đã giải đáp chính xác những vướng mắc mà team tôi đang gặp phải khi làm đồ án.

#### Bài học rút ra
Mỗi lần tham gia sự kiện là một lần tôi nhận ra mình cần phải chủ động kết nối, tự tin giao lưu và nỗ lực học hỏi nhiều hơn nữa. Xin chân thành cảm ơn các speaker và BTC đã tạo ra một sân chơi chia sẻ tri thức tuyệt vời, giúp "hành trình lên mây" của các sinh viên và builder trẻ trở nên hấp dẫn và tràn đầy động lực.

#### Một số hình ảnh khi tham gia sự kiện
<img width="2560" height="1920" alt="image" src="https://github.com/user-attachments/assets/5654ca23-3105-446d-9ae4-220b75aa9838" />
<img width="2568" height="1926" alt="image" src="https://github.com/user-attachments/assets/7d0f13ce-6858-4a01-b0ca-a2ad29625c70" />

