import mongoose, { Schema, Document, Model, Types } from "mongoose";
import Product from "../products/product.model.ts";
import { IReview, IReviewModel } from "./review.interface.ts";

const reviewSchema = new Schema<IReview, IReviewModel>(
  {
    title: {
      type: String,
      trim: true,
      minlength: [3, "Review title is too short"],
      maxlength: [100, "Review title is too long"],
    },

    comment: {
      type: String,
      trim: true,
      minlength: [3, "Review comment is too short"],
      maxlength: [500, "Review comment is too long"],
      required: [true, "Review comment is required"],
    },

    rating: {
      type: Number,
      min: [1, "Min ratings value is 1.0"],
      max: [5, "Max ratings value is 5.0"],
      required: [true, "Review ratings required"],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a product"],
    },
  },
  { timestamps: true }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function () {
  (this as mongoose.Query<IReview[], IReview>).populate({
    path: "user",
    select: "first_name last_name avatar",
  });
});

reviewSchema.statics.calcAverageRatingsAndQuantity = async function (
  productId: Types.ObjectId
) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        avgRatings: { $avg: "$rating" },
        ratingsQuantity: { $sum: 1 },
      },
    },
  ]);

  if (result.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(result[0].avgRatings * 10) / 10,
      reviews_count: result[0].ratingsQuantity,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {rating: 0, reviews_count: 0});
  }
};

reviewSchema.post("save", async function () {
  await (this.constructor as IReviewModel).calcAverageRatingsAndQuantity(this.product);
});

reviewSchema.post(/^findOneAnd/, async function (doc: IReview) {
  if (doc) {
    await (doc.constructor as IReviewModel).calcAverageRatingsAndQuantity(doc.product);
  }
});

const Review = mongoose.model<IReview, IReviewModel>(
  "Review", 
  reviewSchema
);
export default Review;