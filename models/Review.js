import mongoose, { Schema } from "mongoose";
import Product from "./Product.js";

const reviewSchema = new Schema(
  {
    title: { type: String, trim: true },
    rating: {
      type: Number,
      min: [1, 'Min ratings value is 1.0'],
      max: [5, 'Max ratings value is 5.0'],
      required: [true, 'Review ratings required']
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to a product']
    },
  },
  { timestamps: true }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function(next) {
  this.populate({ path: 'user', select: 'first_name last_name avatar' });
  next();
});

reviewSchema.statics.calcAverageRatingsAndQuantity = async function(productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: '$product',
        avgRatings: { $avg: '$rating' },
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
    await Product.findByIdAndUpdate(productId, {
      rating: 0,
      reviews_count: 0,
    });
  }
};

reviewSchema.post('save', async function() {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

reviewSchema.post(/^findOneAnd/, async function(doc) {
  if (doc) {
    await doc.constructor.calcAverageRatingsAndQuantity(doc.product);
  }
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;