import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Address must belong to a user']
    },
    type: {
      type: String,
      enum: ['shipping', 'billing', 'both'],
      default: 'shipping'
    },
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    phone: { 
        type: String, 
        required: [true, 'Phone number is required'],
        trim: true 
    },
    address_line1: { type: String, required: true },
    address_line2: String,
    city: { type: String, required: true },
    state: String,
    postal_code: { type: String, required: true },
    country: { type: String, default: 'Egypt' },
    is_default: {
      type: Boolean,
      default: false,
    },
    is_deleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  { timestamps: true }
);

addressSchema.index({ user: 1, is_default: 1 });
addressSchema.index({ type: 1 });

addressSchema.pre(/^find/, function (next) {
  this.where({ is_deleted: false });
  next();
});

const Address = mongoose.model("Address", addressSchema);
export default Address;