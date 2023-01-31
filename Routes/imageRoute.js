import express from "express";
import {
  getAllThumb,
  getImage,
  uploadImg,
} from "../controllers/imageController.js";
import fileUpload from "../middleware/file-upload.js";
import auth from "../middleware/auth.js";
const router = express.Router();
router.post("/", auth, fileUpload.single("thumb"), uploadImg);
router.get("/all-thumb", getAllThumb);
router.get("/:id", getImage);
export default router;
