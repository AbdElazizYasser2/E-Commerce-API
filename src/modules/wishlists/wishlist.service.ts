import Wishlist from "./wishlist.model.ts";
import ApiError from "../../utils/ApiError.ts";
import { t } from "../../utils/translate.ts";

export const getWishlist = async (userId: string) => {
  let wishlist = await Wishlist.findOne({ user: userId }).populate("products", "name price image rating");

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, products: [] });
  }
  return wishlist;
};

export const addProductToWishlist = async (userId: string, productId: string) => {
  const wishlist = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $addToSet: { products: productId } },
    { new: true, upsert: true }
  ).populate("products", "name price image rating");

  return wishlist;
};

export const removeProductFromWishlist = async (userId: string, productId: string) => {
  const wishlist = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $pull: { products: productId } },
    { new: true }
  ).populate("products", "name price image rating");

  if (!wishlist)
    throw new ApiError(t("wishlist:not_found"), 404);

  return wishlist;
};

export const clearWishlist = async (userId: string) => {
  const wishlist = await Wishlist.findOneAndUpdate(
    { user: userId },
    { products: [] },
    { new: true }
  );

  if (!wishlist)
    throw new ApiError(t("wishlist:not_found"), 404);

  return wishlist;
};