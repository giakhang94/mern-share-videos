import User from "../models/User.js";
import attachCookies from "../utils/attachtCookie.js";
import {
  BadREquestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";
const createUser = async (req, res) => {
  const { role, name, userName, password } = req.body;
  console.log(req.body);
  if (!role || !name || !userName || !password) {
    throw new BadREquestError("Xin nhập đầy đủ thông tin");
  }
  const user = await User.create({ role, name, userName, password });
  res.status(201).json({
    user: {
      role: user.role,
      name: user.name,
      userName: user.UserName,
      location: user.location,
    },
  });
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new BadREquestError("Xin nhập đầy đủ các thông tin");
  }
  const user = await User.findOne({ userName }).select("+password");
  if (!user) {
    throw new NotFoundError("Không tìm thấy user");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    console.log("passs fail");
    throw new BadREquestError("Mật khẩu không khớp");
  }
  const token = await user.createJWT();
  // attachCookies({ res, token });
  // console.log(token);
  attachCookies({ res, token });
  user.password = undefined;
  res.status(201).send({ user });
};
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true, // only browser => very very important
    expires: new Date(Date.now() + 100),
    secure: process.env.NODE_ENV === "production",
    //only send the cookie if the protocol is HTTPS => secure: process.env.NOE_ENV (khi len production => true)
  });
  res.status(200).send("logout");
};
const getCurrentUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(200).json({ user });
};
const updateUser = async (req, res) => {
  const { name, userName, location, role } = req.body;

  if (!userName && !location) {
    throw new BadREquestError("Hãy đổi thông tin trước khi lưu");
  }
  const userId = req.params.id;
  //check permisson
  const userCheck = await User.findOne({ _id: req.user.userId });
  if (userCheck.role !== "Admin") {
    if (userId !== req.user.userId) {
      throw new UnauthenticatedError("Bạn không đủ quyền thao tác");
    }
  }
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError("Lỗi cập nhật, hãy kiểm tra lại");
  }
  if (userName) user.userName = userName;
  if (name) user.name = name;
  if (location) user.location = location;

  await user.save();

  res.status(201).json({ user });
};
//admin
const getAllUsers = async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findOne({ _id: userId });
  //check permission
  if (!user || user.role !== "Admin") {
    throw new UnauthenticatedError("Bạn không phải admin");
  }
  const listUser = await User.find();
  res.status(200).json({ listUser });
};
const deleteUser = async (req, res) => {
  const userId = req.user.userId;
  //permisson
  const checkUser = await User.findOne({ _id: userId });
  if (checkUser.role === "Admin" && userId === req.params.id) {
    throw new BadREquestError("Admin không thể xoá accout chính mình");
  }
  if (checkUser.role !== "Admin") {
    throw new UnauthenticatedError("Bạn không đủ quyền xoá");
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(201).json({ msg: "deleted" });
};

export {
  createUser,
  login,
  getCurrentUser,
  updateUser,
  logout,
  getAllUsers,
  deleteUser,
};
