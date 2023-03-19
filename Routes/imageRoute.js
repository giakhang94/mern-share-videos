import express from "express";
import {
  getAllThumb,
  getImage,
  uploadImg,
  uploadImgLocal,
} from "../controllers/imageController.js";
import fileUpload from "../middleware/file-upload.js";
import fileUploadLocal from "../middleware/file-disk-upload.js";
import auth from "../middleware/auth.js";
const router = express.Router();
router.post("/", auth, fileUpload.single("thumb"), uploadImg);
router.get("/all-thumb", getAllThumb);
router.get("/:id", getImage);
router.post(
  "/uploadLocal",
  auth,
  fileUploadLocal.single("thumb"),
  uploadImgLocal
);
export default router;
