import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    order_number: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Order must belong to a user'],
    },
    cartItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
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
      default: 'EGP',
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'failed'],
      default: 'pending',
      index: true,
    },
    payment_status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
      index: true,
    },
    paymentMethodType: {
      type: String,
      enum: ['card', 'cash'],
      default: 'cash',
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

    is_Delete: {
      type: Boolean,
      default: false,
      select: false, 
    },
    deleted_at: {
      type: Date,
      default: null,
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
  }
);

orderSchema.index({ user_id: 1, status: 1 });
orderSchema.index({ createdAt: -1 });

orderSchema.virtual('transactions', {
  ref: 'Transaction',
  foreignField: 'order',
  localField: '_id',
  justOne: true
});

orderSchema.pre(/^find/, function (next) {
  this.where({ is_Delete: false });

  this.populate({
    path: 'user_id',
    select: 'first_name last_name email phone',
  });

  this.populate({
    path: 'cartItems.product',
    select: 'title imageCover',
  });

  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;