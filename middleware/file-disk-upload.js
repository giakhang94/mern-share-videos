import multer from "multer";
import { uuid } from "uuidv4";
import { BadREquestError } from "../errors/index.js";
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUploadLocal = multer({
  limit: 5000, ///5MB
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      //file.mimetype trả về loại file của file upload
      //ví dụ: "image/jpg", "image/png",...
      cb(null, uuid() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return new BadREquestError("Chỉ upload hình ảnh");
    }
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("invalid mime type");
    cb(error, isValid);
  },
});

export default fileUploadLocal;
