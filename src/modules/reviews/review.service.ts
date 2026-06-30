import Review from "./review.model.ts";
import { IReview } from "./review.interface.ts";
import ApiError from "../../utils/ApiError.ts";
import ApiFeatures, { QueryString } from "../../utils/ApiFeatures.ts";
import { USER_ROLES } from "../../constants/auth.ts";
import { t } from "../../utils/translate.ts";

export const getAllReviews = async (queryString: QueryString) => {
  const totalDocs = await Review.countDocuments();
  const features = new ApiFeatures<IReview>(Review.find(), queryString)
    .filter()
    .sort()
    .limitFields()
    .paginate(totalDocs);

  const reviews = await features.query;
  return {
    results: reviews.length,
    pagination: features.paginationResult,
    data: reviews,
  };
};

export const getProductReviews = async (productId: string, queryString: QueryString) => {
  const totalDocs = await Review.countDocuments({ product: productId });
  const features = new ApiFeatures<IReview>(Review.find({ product: productId }), queryString)
    .filter()
    .sort()
    .limitFields()
    .paginate(totalDocs);

  const reviews = await features.query;
  return {
    results: reviews.length,
    pagination: features.paginationResult,
    data: reviews,
  };
};

export const getReviewById = async (id: string) => {
  const review = await Review.findById(id);
  if (!review) 
    throw new ApiError(t("review:not_found", { id }), 404);
  return review;
};

export const createReview = async (userId: string, data: Partial<IReview>) => {
  const existingReview = await Review.findOne({
    user: userId,
    product: data.product,
  });

  if (existingReview)
    throw new ApiError(t("review:already_reviewed"), 400);

  const review = await Review.create({ ...data, user: userId });
  return review;
};

export const updateReview = async (id: string, userId: string, data: Partial<IReview>) => {
  const review = await Review.findOneAndUpdate(
    { _id: id, user: userId },
    data,
    { new: true }
  );
  if (!review) 
    throw new ApiError(t("review:not_found", { id }), 404);
  return review;
};

export const deleteReview = async (id: string, userId: string, role: string) => {
  const query =
    role === USER_ROLES.ADMIN ? { _id: id } : { _id: id, user: userId };
  const review = await Review.findOneAndDelete(query);
  if (!review) 
    throw new ApiError(t("review:not_found", { id }), 404);
};