import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.ts";

const handleCastErrorDB = (err: any): ApiError =>
  new ApiError(`Invalid ${err.path}: ${err.value}`, 400);

const handleDuplicateFieldsDB = (err: any): ApiError => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  return new ApiError(`${field}: ${value} already exists`, 400);
};

const handleValidationErrorDB = (err: any): ApiError => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  return new ApiError(`Invalid input data: ${errors.join(", ")}`, 400);
};

const handleJWTError = (): ApiError =>
  new ApiError("Invalid token, please login again", 401);

const handleJWTExpiredError = (): ApiError =>
  new ApiError("Token expired, please login again", 401);

const sendErrorDev = (err: ApiError, res: Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err: ApiError, res: Response): void => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    let error = { ...err, message: err.message };

    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === "ValidationError") error = handleValidationErrorDB(error);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

export default errorMiddleware;