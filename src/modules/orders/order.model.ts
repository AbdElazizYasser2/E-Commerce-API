import mongoose, { Schema } from "mongoose";
import { ORDER_STATUS, PAYMENT_METHODS, PAYMENT_STATUS } from "../../constants/order.ts";
import { IOrder, IOrderModel } from "./order.interface.ts";

const orderSchema = new Schema<IOrder, IOrderModel>(
  {
    order_number: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a user"],
    },

    cartItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number, default: 1 },
        color: String,
        price: { type: Number, required: true },
        total: Number,
      },
    ],

    shippingAddress: {
      details: String,
      phone: String,
      city: String,
      postalCode: String,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    shipping_cost: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "EGP",
    },

    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
      index: true,
    },

    payment_status: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
      index: true,
    },

    paymentMethodType: {
      type: String,
      enum: Object.values(PAYMENT_METHODS),
      default: PAYMENT_METHODS.CASH,
    },

    transaction_id: {
      type: String,
      default: null,
    },

    coupon_code: {
      type: String,
      default: null,
    },

    notes: {
      type: String,
      default: null,
    },

    paid_at: Date,

    shipped_at: Date,

    delivered_at: Date,

    is_deleted: {
      type: Boolean,
      default: false,
      select: false,
    },

    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.index({ user: 1, status: 1 });
orderSchema.index({ createdAt: -1 });

orderSchema.virtual("transactions", {
  ref: "Transaction",
  foreignField: "order",
  localField: "_id",
  justOne: true,
});

orderSchema.pre(/^find/, function () {
  (this as mongoose.Query<IOrder[], IOrder>)
    .where({ is_deleted: false })
    .populate({
      path: "user",
      select: "first_name last_name email phone",
    })
    .populate({
      path: "cartItems.product",
      select: "name image",
    });
});

const Order = mongoose.model<IOrder, IOrderModel>(
  "Order", 
  orderSchema
);
export default Order;