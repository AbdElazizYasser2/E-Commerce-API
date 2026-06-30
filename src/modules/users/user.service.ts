import User from "./user.model.ts";
import { IUser } from "./user.interface.ts";
import ApiError from "../../utils/ApiError.ts";
import ApiFeatures, { QueryString } from "../../utils/ApiFeatures.ts";
import { t } from "../../utils/translate.ts";

// Get All Users
export const getAllUsers = async (queryString: QueryString) => {
  const totalDocs = await User.countDocuments();
  const features = new ApiFeatures<IUser>(User.find(), queryString)
    .filter()
    .sort()
    .limitFields()
    .search(User.modelName)
    .paginate(totalDocs);

  const users = await features.query;
  return {
    results: users.length,
    pagination: features.paginationResult,
    data: users,
  };
};

// Get User By ID
export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user)
    throw new ApiError(t("user:not_found", { id }), 404);
  return user;
};

// Create User
export const createUser = async (data: Partial<IUser>) => {
  const user = await User.create(data);
  return user;
};

// Update User
export const updateUser = async (id: string, data: Partial<IUser>) => {
  const user = await User.findByIdAndUpdate(id, data, { new: true });
  if (!user)
    throw new ApiError(t("user:not_found", { id }), 404);
  return user;
};

// Change User Password
export const changeUserPassword = async (id: string, newPassword: string) => {
  const user = await User.findByIdAndUpdate(
    id,
    {
      password: newPassword,
      passwordChangedAt: new Date(),
    },
    { new: true }
  );
  if (!user)
    throw new ApiError(t("user:not_found", { id }), 404);
  return user;
};

// Delete User
export const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user)
    throw new ApiError(t("user:not_found", { id }), 404);
};