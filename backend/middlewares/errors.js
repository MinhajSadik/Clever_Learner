import ErrorHandler from "../utils/errorHandler.js";

export default function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "NotFoundError") {
    const message = `Could Not Found expected route ${err.message}`;
    err = new ErrorHandler(message, 404);
  }
  if (err.name === "ValidatorError") {
    const message = `Validate your route path ${err.path}`;
    err = new ErrorHandler(message, 500);
  }

  if (err.name === "TypeError") {
    const message = `there was an type error ${err.message}`;
    err = new ErrorHandler(message, 500);
  }

  if (err.name === "RangeError") {
    const message = `there was an range error ${err.message}`;
    err = new ErrorHandler(message, 500);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}
