import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(errors.array().map(err => err.msg).join(', '), 400));
  }
  next();
}

export default validationResult;