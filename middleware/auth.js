import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  // console.log(token);
  if (!token) {
    throw new UnauthenticatedError("Hãy đăng nhập để thực hiện thao tác này");
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decode.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Hãy đăng nhập để thực hiện thao tác này");
  }
};
export default auth;
