# Web app  MERN Ecommerce
# Giới thiệu
Đây là 1 web app thương mại điện tử xem thông tin sản phẩm, đặt hàng, xác nhận đơn hàng, thanh toán . Là bản nâng cấp của dự án react ecommerce UI.
Sau khi hoàn thành dự án full-stack gồm có 3 phần là client, admin, sever
- Triển khai máy chủ trên "render.com" với link máy chủ mới: https://ecomserver-9b4w.onrender.com/api/product
- Triển khai giao diện người dùng trên firebase

# Mục tiêu
- Biết quy trình triển khai dự án hoàn chỉnh cả phía máy chủ và máy khách
- Biết cách xử lý logic phía máy chủ và máy khách, hiểu cách chúng giao tiếp với nhau
- Quản lý sản phẩm, phân quyền nhân viên
- Xử lý lỗi
- Đưa dự án lên môi trường thật
  
# Miêu tả:
- Xây dựng các chức năng:
   + front-end: xác thực form, hiển thị thông báo, đường dẫn trang, hiển thị nội dung, tương tác người dùng
   + back-end:
       - Authorization: Login [Public] , SignUp [Public] ,Logout [User], Tokens [User]
       - Password management: Change Password [User], Forgot Password [Public], Reset Password [Public]
       - Email management: Send Email Verification [User]
       - Manage user: Create New User [Admin], Get All Users [Public], Get User Data Using It's ID [Public], Update User Details Using It's ID [User], Update User Profile Image Using, Delete User Using It's ID [Admin]
       - Cart services: Add Product To Cart [User], Reduce Product Quantity By One [User], Increase Product Quantity By One [User], Get Cart [User],Delete Cart Item [User], Delete Cart [User]
       - Product services: Query products [Public], Query Product Using It's ID [Public], Create new product [Seller(ad)], Update Product Details [Seller(ad)], Update Product Main Image [Seller(ad)], Update Product Images [Seller(ad)], Delete Product Using It's ID [User], Get Products Statics [Admin]
       - Favorite services: Get Favorite Products List [User], Add Product to Favorite List [User], Delete Product From Favorite List [User], Check If Product In Favorite List [User]
       - Order services: Create New Order [User] Query Orders [User], Query Order Using It's ID [User], Cancel Order [User], Update Order Status [Admin]
   + database: thiết kế cơ sở dữ liệu, tối ưu dữ liệu bằng pattern

# Công nghệ sử dụng: 
- server: sử dụng frameword express, MongoDB
   + Express là framework xây dựng phía máy chủ theo kiến trúc MVC với luồng hoạt động View -> Controller -> Model. Bởi tính linh hoạt dễ dàng cấu hình, express có cộng đồng lớn mạnh, bộ thư viện hỗ trợ đa dạng, có khả năng đồng bộ cao trên nhiều nền tảng, môi trường.
   + MongoDB là cơ sở dữ liệu hướng tài liệu, thích ứng dữ liệu thông dụng dạng JSON có một schema rất linh hoạt gọi là BSON. Dữ liệu lưu trữ phi cấu trúc, không có tính ràng buộc, toàn vẹn nên tính sẵn sàng cao, hiệu suất lớn và dễ dàng mở rộng lưu trữ.
- client + admin: sử dụng thư viện React, Mui, tailwind
  + React: là thư viện tạo giao diện người dùng, sẽ cập nhật hiệu quả dữ liệu và hiển thị nhanh khi dữ liệu thay đổi. Logic dễ dự đoán, dễ hiểu, và dễ sửa lỗi. Các thành phần có thể kế thừa, kết hợp tạo các khối phức tạp cập nhật trạng thái chính nó sử dụng cho chức năng nhất định. Thành phần logic được viết bằng javascript thay vì templates, vì vậy dễ dàng truyền dữ liệu qua lại.
  + Mui là 1 thư viện thiết kế cho React, mỗi thành phần là 1 React component. Hỗ trợ tích cức tạo giao diện người dùng
  + Tailwind là công cụ đắc lực thiết kế UI, đó là bản nâng cấp xịn xò của bootstrap
  
# Cài đặt:
- Yêu cầu Node >= 14.17, react >= 16.8.0
   + Cài đặt node: https://nodejs.org/fr
   + Kiểm tra phiên bản node và npm trong terminal hoặc cmd : node -v và npm -v
- Tải dự án: git clone https://github.com/hiepntfx18379/mernMovie.git
- Chạy trong terminal: npm install
- Chạy dự án:
     + Đường dẫn thư mục tới client: npm start
     + Đường dẫn thư mục tới server: npm start
