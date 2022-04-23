const { StatusCodes } = require("http-status-codes");

const errorHandlingMiddleware = (err, req, res, next) => {
  const defaultError = {
    status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "There is some internal error, Try again later.",
  };

  if (err.name === "ValidationError") {
    defaultError.status = StatusCodes.BAD_REQUEST;
    defaultError.msg = Object.values(err.errors)
      .map((err) => err.message)
      .join(" , ");
  }

  res.status(defaultError.status).json({ msg: defaultError.msg });
};

module.exports = {
  errorHandlingMiddleware,
};
