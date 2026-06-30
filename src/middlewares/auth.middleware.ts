import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import User from "../modules/users/user.model.ts";
import ApiError from "../utils/ApiError.ts";

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(new ApiError("You are not logged in, please login to get access", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; iat: number };

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new ApiError("User belonging to this token no longer exists", 401));
    }

    if (currentUser.passwordChangedAt) {
      const changedTimestamp = Math.floor(currentUser.passwordChangedAt.getTime() / 1000);
      if (decoded.iat < changedTimestamp) {return next(new ApiError("User recently changed password, please login again", 401));
      }
    }

    if (currentUser.status !== "active") {
      return next(new ApiError("Your account is not active", 401));
    }

    req.user = currentUser;
    next();
  }
);

export const restrictTo = (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role as string)) {
      return next(new ApiError("You do not have permission to perform this action", 403));
    }
    next();
  };