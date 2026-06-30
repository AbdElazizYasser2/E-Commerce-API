import { Document, Model, Types } from "mongoose";
import { AddressType } from "../../constants/address.ts";

export interface IAddress extends Document {
  user: Types.ObjectId;

  type: AddressType;

  first_name: string;
  last_name: string;

  email?: string;
  phone: string;

  address_line1: string;
  address_line2?: string;

  city: string;
  state?: string;

  postal_code: string;
  country: string;

  is_default: boolean;
  is_delete: boolean;
};

export interface IAddressModel extends Model<IAddress> {}