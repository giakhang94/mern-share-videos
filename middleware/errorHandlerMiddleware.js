const errorHandlerMiddleware = (error, req, res, next) => {
  const defaultError = {
    statusCode: error.statusCode || 500,
    msg: error.message || "something went wrong, try again later",
  };
  console.log(error.name);
  if (error.name === "ValidationError") {
    defaultError.statusCode = 400;
    defaultError.msg = Object.values(error.errors)
      .map((err) => {
        return err.message;
      })
      .join(",");
  }
  if (error && error.code === 11000) {
    res.status(400).json({
      msg: `${error.keyValue.userName} đã được sử dụng, xin chọn tên khác`,
    });
  }
  res.status(defaultError.statusCode).json({ error, msg: defaultError.msg });
};

export default errorHandlerMiddleware;
