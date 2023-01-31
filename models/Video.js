import mongoose from "mongoose";

const VideoSchema = mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: [true, "Hãy cung cấp user"],
    ref: "User",
  },
  creatorName: {
    type: String,
    required: [true, "Chưa có tên tác giả"],
  },
  title: {
    type: String,
    required: [true, "Hãy nhập tiêu đều cho video"],
    trim: true,
    maxLength: 100,
    minLength: 3,
  },
  link: {
    type: String,
    required: [true, "Hãy nhập link youtube của video"],
  },
  description: {
    type: String,
    trim: true,
    maxLenght: 100,
  },
  thumbnail: {
    type: String,
    default:
      "https://scontent.fsgn5-13.fna.fbcdn.net/v/t1.15752-9/277482500_672033954120958_5315781122689770654_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_ohc=aMB7lyl4_m4AX-swpNO&_nc_oc=AQn0ZdJnTkCd9scO_B1Ez_A4xvK8X31joJKY72zDrbXpxf6Zz-HT8KHPEfsMX3W4D_u096lSXbTQ8CLn5BqD8WhW&_nc_ht=scontent.fsgn5-13.fna&oh=03_AdTbyrFJoZjn2wMY5tiT51Zxa_Wpf-Ri4byxKLuQUFSW5Q&oe=63FB299F",
    trim: true,
    require: [true, "Hãy chọn thumbnail cho video"],
  },
  caption: {
    type: String,
    maxLenght: 100,
  },
  tag: {
    type: Array,
    maxLenght: 20,
  },
  category: {
    type: String,
    enum: ["Kalama", "A Tỳ Đàm", "Truyện Phím", "Hỏi Đáp", "Kinh Tạng"],
    required: [true, "Hãy chọn category cho video"],
  },
});

const Video = mongoose.model("Video", VideoSchema);
export default Video;
