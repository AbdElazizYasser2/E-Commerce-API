import mongoose, { Schema } from "mongoose";
import { IWishlist, IWishlistModel } from "./wishlist.interface.ts";

const wishlistSchema = new Schema<IWishlist, IWishlistModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Wishlist must belong to a user'],
    },

    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true }
);

wishlistSchema.index({ user: 1 });

const Wishlist = mongoose.model<IWishlist, IWishlistModel>(
  "Wishlist", 
  wishlistSchema
);
export default Wishlist;