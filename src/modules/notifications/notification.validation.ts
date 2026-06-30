import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validation.middleware.ts";

export const getNotificationValidator = [
  check("id").isMongoId().withMessage("Invalid Notification ID format"),
  validatorMiddleware,
];

export const deleteNotificationValidator = [
  check("id").isMongoId().withMessage("Invalid Notification ID format"),
  validatorMiddleware,
];