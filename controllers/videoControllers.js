import express from "express";
import {
  BadREquestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";
import Video from "../models/Video.js";
import User from "../models/User.js";

const createVideo = async (req, res) => {
  const { title, description, link, caption, tag, thumb, category } = req.body;
  if (
    !title ||
    !description ||
    !link ||
    !caption ||
    !tag ||
    !thumb ||
    !category
  ) {
    throw new BadREquestError("Xin hãy nhập đầy đủ thông tin");
  }
  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new UnauthenticatedError("Hãy đăng nhập để thêm video");
  }
  req.body.creatorName = user.name;
  req.body.createdBy = req.user.userId;
  req.body.thumbnail = thumb;
  const video = await Video.create(req.body);
  await video.save();
  res.status(201).json({ video });
};
const uploadThumbnail = (req, res) => {
  res.send("ok");
};
const getPostsByAuth = async (req, res) => {
  const userId = req.user.userId;
  const checkUser = await User.findOne({ _id: userId });
  let data = {};
  if (!checkUser) {
    throw new UnauthenticatedError(
      "Bạn cần đăng nhập để xem video mình có thể chỉnh sửa"
    );
  }
  if (checkUser.role === "Admin") {
    data = await Video.find();
  } else {
    data = await Video.find({ createdBy: userId });
  }
  res.status(200).json({ video: data });
};
const updateVideo = async (req, res) => {
  const { title, description, tag, caption } = req.body;
  if (!title && !description && !tag && !caption) {
    throw new BadREquestError("Hãy thay đổi thông tin, hoặc nhấn Cancel");
  }
  console.log(req.user);
  const updaterId = req.user.userId; // id của đứa thực hiện thao tác update lên video
  const targetId = req.params.id; //id cua video được update
  //from targetId => find video => get createdBy and check permisson
  const video = await Video.findOne({ _id: targetId });
  const updaterUser = await User.findOne({ _id: updaterId });
  // console.log(updaterUser);
  if (!video) {
    throw new NotFoundError("Video đã bị xoá trước đó");
  }
  if (!updaterUser) {
    throw new UnauthenticatedError("Cần phải đăng nhập để thao tác");
  }
  if (updaterUser.role !== "Admin") {
    if (updaterId !== updaterUser._id.toString()) {
      throw new UnauthenticatedError("Bạn không đủ quyền quản lý thao tác này");
    }
  }
  if (title) {
    video.title = title;
  }
  if (description) {
    video.description = description;
  }
  if (tag) {
    video.tag = tag;
  }
  if (caption) {
    video.caption = caption;
  }
  await video.save();
  res.status(201).json({ video });
};
const deleteVideo = async (req, res) => {
  const userId = req.user.userId;
  const deletedId = req.params.id;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new UnauthenticatedError("Bạn cần đăng nhập trước");
  }
  const video = await Video.findOne({ _id: deletedId });
  if (!video) {
    throw new NotFoundError("Video không tồn tại");
  }
  if (user.role !== "Admin") {
    if (user._id.toString() !== video.createdBy.toString()) {
      throw new UnauthenticatedError(
        "Bạn không được phân quyền cho thao tác này"
      );
    }
  }
  await video.remove();
  res.status(201).json({ msg: "deleted" });
};
const getAllVideo = async (req, res) => {
  const { tag, category } = req.query;
  const queryObject = {};
  //check permission
  const userCheck = await User.findOne({ _id: req.user.userId });
  if (!userCheck) {
    throw new UnauthenticatedError("Bạn cần đăng nhập để tiếp tục");
  }
  if (userCheck.role !== "Admin") {
    queryObject.createdBy = userCheck._id;
  }
  if (tag) {
    queryObject.tag = tag;
  }

  if (category && category !== "all") {
    queryObject.category = category;
  }
  let result = Video.find({ ...queryObject });
  //pagination
  const limit = req.query.limit || 6;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  //done pagination
  const videos = await result;
  const total = await Video.countDocuments({ ...queryObject });
  const numOfPages = Math.ceil(total / limit);
  res.status(200).json({ videos, total, numOfPages });
};
const getAllVideoHome = async (req, res) => {
  const { tag, category } = req.query;
  const queryObject = {};
  //check permission
  let role = "";
  let userCheck = null;
  if (req.user) {
    userCheck = await User.findOne({ _id: req.user.userId });
  }
  if (userCheck && userCheck.role) {
    role = userCheck.role;
  }
  if (tag) {
    queryObject.tag = tag;
  }

  if (category && category !== "all") {
    queryObject.category = category;
  }
  let result = Video.find({ ...queryObject });
  //pagination
  const limit = req.query.limit || 6;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  //done pagination
  const videos = await result;
  const total = await Video.countDocuments({ ...queryObject });
  const numOfPages = Math.ceil(total / limit);
  res.status(200).json({ videos, total, numOfPages, role });
};
export {
  createVideo,
  uploadThumbnail,
  getPostsByAuth,
  updateVideo,
  deleteVideo,
  getAllVideo,
  getAllVideoHome,
};
