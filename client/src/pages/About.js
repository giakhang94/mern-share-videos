export default function About() {
  return (
    <div className="about">
      <div className="flex p-2 justify-between mx-10 leading-10 laptop:flex-row flex-col">
        <ol>
          <span className="font-bold">Vấn Đề</span>
          <li>- Bài giảng Sư có lượng thông tin nhiều</li>
          <li>- Thời gian mỗi video cũng hơi dài</li>
          <li>
            - Ai quên chỗ nào cần tìm lại khôgn biết tìm{" "}
            <span className="font-bold">từ khoá </span>gì và{" "}
            <span className="font-bold">video nào</span>
          </li>
          <li>
            - Nếu tìm ra thì không nhớ tua tới{" "}
            <span className="font-bold">phút thứ mấy</span>
          </li>
        </ol>
        <ol>
          <span className="font-bold">Giải Quyết</span>
          <li>- Website cho phép search từ khoá mà mình nhớ</li>
          <li>
            - Sẽ ra video cần tìm: ví dụ search "ổ ếch" sẽ ra video liên quan
          </li>
          <li>
            "ổ ếch" sẽ ra video liên quan: Sư nói về A Tăng Kỳ, Kiếp của Trái
            Đất...
          </li>
          <li>
            - Mỗi kết quả liên quan sẽ dẫn tới link Youtube của video đã cắt
            sẵn, không phải tua
          </li>
          <li>
            - Phần mô tả của video có kèm link gốc của bài giảng để mọi người
            xem đầy đủ lại
          </li>
          <li>
            - Mấu chốt là ở chỗ nghe, note lại từ khoá "xăm", "quan trọng", "tại
            sao nữ khó xuất gia"...
          </li>
          <li>- Sau đó video được cắt ra, up lên youtube và link qua web</li>
          <li>(kèm theo các tag đã note lại)</li>
          <li>
            Video cũng được phân theo category: Kalama, Hỏi Đáp, Truyện Phím, A
            Tỳ Đàm...
          </li>
          <li>Có thể xem trên điện thoại, máy tính bảng, tablet, iPad</li>
        </ol>
      </div>
      <div className="ChucNang mx-10 mt-5 block leading-10 mb-5">
        <p>
          <span className="font-bold">Chức năng</span>: cho phép admin quản trị
          các user (hỗ trợ đăng bài), admin được quyền xem tất cả các user và
          bài viết, xoá user, xoá bài. User chỉ được xoá bài của chính mình
        </p>
        <p>
          - Hình thumbnail được admin đăng lên, khi tạo bài viết sẽ chọn 1 trong
          các hình đó
        </p>
        <p>
          - Có thể chèn thêm chữ lên hình ở mục Caption cho hình khi tạo video
          mới trên web
        </p>
        <p>
          - Mỗi video dc kèm tối đa 20 tag và 1 category tiện cho việc tìm kiếm
          của Phật Tử
        </p>
        <p>
          - Bài viết đăng rồi có thể được chỉnh sửa, tag có thểm thay đổi, thêm
          bớt
        </p>
      </div>
      <h2 className="font-semibold text-center text-xl my-5">
        Nếu ý tưởng này không dư thừa, mong là ai cũng học được Giáo Pháp đúng
        đắn!
      </h2>
    </div>
  );
}
