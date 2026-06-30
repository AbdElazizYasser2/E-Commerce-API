import mongoose, { Schema } from "mongoose";
import { ICart, ICartModel } from "./cart.interface.ts";

const cartSchema = new Schema<ICart, ICartModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Cart must belong to a user"],
    },
    cartItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Quantity cannot be less than 1"],
        },
        color: String,
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalCartPrice: {
      type: Number,
      default: 0,
    },
    totalPriceAfterDiscount: {
      type: Number,
      default: undefined,
    },
  },
  { timestamps: true }
);

cartSchema.pre(/^find/, function () {
  (this as mongoose.Query<ICart[], ICart>).populate({
    path: "cartItems.product",
    select: "name image price quantity",
  });
});

cartSchema.index({ user: 1 });

const Cart = mongoose.model<ICart, ICartModel>(
  "Cart", 
  cartSchema
);
export default Cart;