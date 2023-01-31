import mongoose from "mongoose";

const ImageSchema = mongoose.Schema({
  thumb: {
    type: Buffer,
    required: [true, "Hãy chọn hình ảnh tải lên"],
  },
  description: {
    required: [true, "Hãy nhập mô tả"],
    type: String,
    default: "Mô tả default để postman ko bị lỗi",
    maxLength: 100,
  },
});

const Image = mongoose.model("Image", ImageSchema);
export default Image;
