import express from "express";
import {
  addComment,
  createVideo,
  deleteVideo,
  getAllVideo,
  getAllVideoHome,
  getPostsByAuth,
  getVideoById,
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
router.get("/:id", getVideoById);
router.post("/:id/comment", addComment);

export default router;
