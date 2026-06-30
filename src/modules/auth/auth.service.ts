import jwt, { SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../users/user.model.ts";
import { IUser } from "../users/user.interface.ts";
import ApiError from "../../utils/ApiError.ts";
import { USER_STATUS } from "../../constants/auth.ts";
import { t } from "../../utils/translate.ts";

const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET as string;
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || "30d") as SignOptions["expiresIn"],
  };
  return jwt.sign({ id }, secret, options);
};

const userResponse = (user: IUser) => ({
  _id: user._id,
  first_name: user.first_name,
  last_name: user.last_name,
  email: user.email,
  role: user.role as string,
  status: user.status as string,
});

export const register = async (data: Partial<IUser>) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new ApiError(t("auth:email_in_use"), 400);

  const user = await User.create(data);
  const token = generateToken(user._id.toString());
  return { token, user: userResponse(user) };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(t("auth:invalid_credentials"), 401);

  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) throw new ApiError(t("auth:invalid_credentials"), 401);

  if (user.status !== USER_STATUS.ACTIVE)
    throw new ApiError(t("auth:account_not_active"), 401);

  const token = generateToken(user._id.toString());
  return { token, user: userResponse(user) };
};

export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) return { message: t("auth:reset_code_sent") };

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");

  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  user.passwordResetVerified = false;
  await user.save();

  return { message: t("auth:reset_code_sent"), resetCode };
};

export const verifyResetCode = async (resetCode: string) => {
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");

  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: new Date() },
  });

  if (!user) throw new ApiError(t("auth:reset_code_invalid"), 400);

  user.passwordResetVerified = true;
  await user.save();

  return { message: t("auth:reset_code_verified") };
};

export const resetPassword = async (email: string, newPassword: string) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(t("errors:not_found"), 404);

  if (!user.passwordResetVerified)
    throw new ApiError(t("auth:reset_code_not_verified"), 400);

  const isSamePassword = await bcrypt.compare(newPassword, user.password);
  if (isSamePassword) throw new ApiError(t("auth:password_same"), 400);

  user.password = newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = false;
  user.passwordChangedAt = new Date();
  await user.save();

  const token = generateToken(user._id.toString());
  return { token, user: userResponse(user) };
};

export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  const user = await User.findById(userId).select("+password");
  if (!user) throw new ApiError(t("errors:not_found"), 404);

  const isCorrect = await bcrypt.compare(currentPassword, user.password);
  if (!isCorrect) throw new ApiError(t("auth:current_password_incorrect"), 401);

  const isSamePassword = await bcrypt.compare(newPassword, user.password);
  if (isSamePassword) throw new ApiError(t("auth:password_same"), 400);

  user.password = newPassword;
  user.passwordChangedAt = new Date();
  await user.save();

  const token = generateToken(user._id.toString());
  return { token, user: userResponse(user) };
};