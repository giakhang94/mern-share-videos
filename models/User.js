import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = mongoose.Schema({
  role: {
    type: String,
    enum: ["Admin", "Auth"],
    required: [true, "xin chọn phân quyền người dùng"],
  },
  name: {
    type: String,
    required: [true, "Xin nhập mật tên người dùng"],
    minLength: 3,
    maxlength: 20,
    trim: true,
  },
  userName: {
    type: String,
    required: [true, "Xin nhập mật tên dùng để đăng nhập"],
    minLength: 3,
    maxlength: 20,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Xin nhập mật khẩu"],
    minLength: 6,
    select: false,
  },
  location: {
    type: String,
    maxlength: 20,
    // required: [true, "please provide location"],
    trim: true,
    default: "My City",
  },
});
//schema methods
UserSchema.pre("save", async function (next) {
  const user = this;
  if (!this.isModified("password")) return;
  user.password = await bcrypt.hash(user.password, 8);
  next();
});
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
//comapre password for login
UserSchema.methods.comparePassword = async function (inputPassword) {
  const isMatch = await bcrypt.compare(inputPassword, this.password);
  return isMatch;
};
const User = mongoose.model("User", UserSchema);
export default User;
