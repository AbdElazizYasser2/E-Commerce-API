import { Document, Model, Types } from "mongoose";

export interface IReview extends Document {
  title?: string;
  comment?: string;

  rating: number;

  user: Types.ObjectId;
  product: Types.ObjectId;
}
 
export interface IReviewModel extends Model<IReview> {
  calcAverageRatingsAndQuantity(productId: Types.ObjectId): Promise<void>;
}
