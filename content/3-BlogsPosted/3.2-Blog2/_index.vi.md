---
title: "Blog 2"
date: 2026-11-02
weight: 2
chapter: false
pre: " <b> 3.2. </b> "
---

# BÀI TOÁN BẢO MẬT DỮ LIỆU VỚI S3, KMS, CLOUDTRAIL & ATHENA

Đưa app lên Production thì bảo mật lúc nào cũng là bài toán làm anh em dev đau đầu nhất. Câu hỏi đặt ra là: làm sao để lưu trữ data nhạy cảm trên mây vừa an toàn (mã hóa), lại vừa nắm được chính xác ai vừa đụng vào data của mình?

Hôm nay mình share lại một luồng kiến trúc khá hay và cực kỳ chuẩn bài, kết hợp giữa 4 dịch vụ: **S3, KMS, CloudTrail và Athena**.

### 1. Luồng kiến trúc giải quyết bài toán
Về cơ bản, luồng này xoay quanh 3 việc chính:

- **Mã hóa dữ liệu ngay lập tức:** Đầu tiên, thay vì quăng file thẳng lên S3 dưới dạng plain-text (rất rủi ro), chúng ta sẽ kẹp thêm AWS KMS. Nghĩa là file vừa đẩy lên S3 sẽ được KMS tự động khóa lại ngay lập tức (Encryption at rest).
- **Thiết lập "Camera giám sát":** Nhưng mã hóa xong thì chưa đủ, lỡ có ai đó lấy được quyền truy cập thì sao? Thế là phải lôi thêm CloudTrail vào làm "camera giám sát". Dịch vụ này sẽ ghi log lại toàn bộ các API call tác động vào S3 và KMS. Ai làm gì, lúc nào, nó ghi lại hết.
- **Truy vấn log Serverless:** Cuối cùng, log sinh ra cả đống thì check kiểu gì cho nhanh? Lúc này Amazon Athena nhảy vào cứu cánh. Thay vì mò mẫm đọc file log, anh em chỉ cần gõ vài lệnh SQL quen thuộc là query thẳng vào đống log của CloudTrail luôn, mà đặc biệt là không cần dựng server gì cả (Serverless).

### 2. Cái "ăn tiền" của kiến trúc này nằm ở đâu?

* **Đạt chuẩn Compliance:** Team nào làm dự án dính tới y tế hay tài chính (cần chuẩn HIPAA, PCI-DSS...) thì combo S3 + KMS + CloudTrail gần như là bắt buộc phải có.
* **Phân tách trách nhiệm (Segregation of Duties):** Dữ liệu nằm ở S3, nhưng "chìa khóa" do KMS giữ. Giả sử hacker có chọc thủng được S3 để bợ file đi, thì thứ chúng cầm được cũng chỉ là một mớ ký tự vô nghĩa.
* **Zero code:** Việc mã hóa và ghi log diễn ra hoàn toàn ở tầng dịch vụ của AWS, anh em không cần phải sửa dòng code nào trong app chính.

### 3. Gợi ý áp dụng cho dự án thực tế
Team nào đang chạy đồ án **FCAJ Buildrathon** (nhất là các team làm AI Agent có lưu lại log hội thoại hoặc data người dùng) thì nên cân nhắc ốp luôn mô hình này vào. Lúc thuyết trình bảo đảm ăn trọn điểm Security từ mentor!

### 4. Tài liệu tham khảo
Để tiện cho anh em ngâm cứu và tự tay làm lab, mình để lại mấy link docs chính thức đọc khá dễ hiểu:
1. **Setup mã hóa S3 bằng KMS:** [Using KMS Encryption](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html)
2. **Bật ghi log S3 qua CloudTrail:** [CloudTrail Logging](https://docs.aws.amazon.com/AmazonS3/latest/userguide/cloudtrail-logging.html)
3. **Athena query log CloudTrail:** [Querying CloudTrail Logs](https://docs.aws.amazon.com/athena/latest/ug/cloudtrail-logs.html)

<img width="1330" height="596" alt="image" src="https://github.com/user-attachments/assets/6433bbae-4e1b-4873-a8f4-8411cecb791c" />

🔗 **Discussion Link:** [Post on AWS Study Group VN](https://www.facebook.com/groups/660548818043427/user/100058180633098)

#AWS #CloudSecurity #AmazonS3 #AWSKMS #CloudTrail #Athena #FCAJ #AWSStudyGroup
