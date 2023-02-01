import express from "express";
import {
  createVideo,
  deleteVideo,
  getAllVideo,
  getAllVideoHome,
  getPostsByAuth,
  updateVideo,
  uploadThumbnail,
} from "../controllers/videoControllers.js";
import auth from "../middleware/auth.js";
// import fileUpload from "../middleware/file-upload.js";
const router = express.Router();

router.post("/", auth, createVideo);
// router.post("/thumbnail", fileUpload.single("image"), uploadThumbnail);
router.get("/getPostsByAuth", auth, getPostsByAuth);
router.patch("/:id", auth, updateVideo);
router.delete("/:id", auth, deleteVideo);
router.get("/all", auth, getAllVideo);
router.get("/all-home", getAllVideoHome);

export default router;
