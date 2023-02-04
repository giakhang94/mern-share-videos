## Find Videos - web tạo card video và tìm video theo tags

- Ý tưởng: Web hỗ trợ các Sư Phật Giáo Nguyên Thuỷ giảng pháp (chức năng dự trên nhu cầu thực tế của người dùng)
- Chia nhỏ video theo từng chủ đề, và đăng lên youtube để có đường link
- web nhận các thông tin như link youtube, tag, category, title, thumbnail... để hiện thị
  ra client dạng card.
- tag là 1 mảng có tối đa 20 phần tử, là các lời nói, keyword liên quan đến chủ đề hoặc ấn tưởng
  để mọi người dễ dàng tìm kiếm tài liệu hơn

## user demo: admin - password: 123456Abc

## MERN STACK (MongoDB - Express, ReactJS, NodeJS)

- Sử dụng MERN stack. RESTful API.
- Các thư viện cần thiết: tailwindcss, dotenv, nodemon, mongoose, jwt, bcrypt, axios...

## Chức chăng chính:

- Đăng ký, đăng nhập. Thêm xoá sửa user. Chỉ admin có quyền thêm và xoá user. User có quyền tự update thông tin của họ
- Thêm xoá sửa video. Admin có quyền kiểm soát tất cả, user chỉ có quyền thao tác trên video của họ đăng lên
- Hiển thị thông video ra client theo dạng card.
- Cho phép tìm theo categories (dropdown) và search tag
- Thumbnail: chỉ admin được phép add thumbnail. Khi đăng video mới, sẽ chọn 1 trong các thumb có sẵn.
- update video và user profile ngay trên card thông tin (sử dụng custome component)
- Sử dụng NavLink và Outlet của react router dom để cố định navbar và header
- Sử dụng cookie trong xác thực user và phân quyền user
- Sử dụng useContext, useReducer để truyền dữ liệu giữa các component
- Error handler ở backend và axios intercepters response ở frontend để bảo vệ trang web
