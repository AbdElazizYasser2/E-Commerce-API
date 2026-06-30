import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.ts";

const validatorMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((err) => err.msg)
      .join(", ");
    return next(new ApiError(errorMessages, 400));
  }
  next();
};

export default validatorMiddleware;