import mongoose, { Schema } from "mongoose";
import { ADDRESS_TYPES } from "../../constants/address.ts";
import { IAddress, IAddressModel } from "./address.interface.ts";

export const addressSchema = new Schema<IAddress, IAddressModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Address must belong to a user'],
    },

    type: {
      type: String,
      enum: Object.values(ADDRESS_TYPES),
      default: ADDRESS_TYPES.SHIPPING,
    },

    first_name: { type: String, required: true, trim: true },

    last_name: { type: String, required: true, trim: true },

    email: { type: String, lowercase: true, trim: true },

    phone: {
      type: String,
      trim: true,
      required: [true, "Phone number is required"],
    },

    address_line1: { type: String, required: true },

    address_line2: String,

    city: { type: String, required: true },

    state: String,

    postal_code: { type: String, required: true },

    country: { type: String, default: "Egypt" },

    is_default: {
      type: Boolean,
      default: false,
    },

    is_delete: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  { timestamps: true }
);

addressSchema.index({ user: 1, is_default: 1 });
addressSchema.index({ type: 1 });

addressSchema.pre(/^find/, function () {
  (this as mongoose.Query<IAddress[], IAddress>).where({ is_delete: false });
});

const Address = mongoose.model<IAddress, IAddressModel>(
  "Address", 
  addressSchema
);
export default Address;