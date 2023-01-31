import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  login,
  logout,
  updateUser,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/", createUser);
router.get("/getCurrentUser", auth, getCurrentUser);
router.post("/login", login);
router.patch("/:id", auth, updateUser);
router.get("/logout", logout);
router.get("/admin/getall", auth, getAllUsers);
router.delete("/admin/deleteUser/:id", auth, deleteUser);
export default router;
