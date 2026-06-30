import { Document, Model, Types } from "mongoose";

export interface IWishlist extends Document {
  user: Types.ObjectId,
  products: Types.ObjectId[],
};

export interface IWishlistModel extends Model<IWishlist> {}
