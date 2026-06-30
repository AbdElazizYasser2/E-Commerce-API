import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser, IUserModel } from "./user.interface.ts";
import { USER_ROLES } from "../../constants/auth.ts";
import { USER_STATUS } from "../../constants/auth.ts";
import { GENDER_TYPES } from "../../constants/user.ts";

const userSchema = new Schema<IUser, IUserModel>(
  {
    first_name: {
      type: String,
      trim: true,
      required: [true, "First Name is required"],
    },

    last_name: {
      type: String,
      trim: true,
      required: [true, "Last Name is required"],
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, "Email is required"],
    },

    email_verified_at: {
      type: Date,
      default: null,
    },

    password: {
      type: String,
      minlength: [8, "Too short password"],
      required: [true, "Password is required"],
      select: false,
    },

    passwordChangedAt: Date,

    passwordResetCode: String,

    passwordResetExpires: Date,

    passwordResetVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.CUSTOMER,
    },

    status: {
      type: String,
      enum: Object.values(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },

    gender: {
      type: String,
      enum: Object.values(GENDER_TYPES),
      default: null,
    },

    phone: {
      type: String,
      sparse: true,
      index: true,
    },

    avatar: {
      type: String,
      default: null,
    },

    birth_date: {
      type: Date,
    },

    last_login_at: {
      type: Date,
    },

    is_delete: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,

    toJSON: {
      virtuals: true,
    },

    toObject: {
      virtuals: true,
    },
  }
);

userSchema.index({ email: 1, status: 1 });

userSchema.index({ role: 1 });

userSchema.virtual("myAddress", {
  ref: "Address",
  foreignField: "user",
  localField: "_id",
});

userSchema.virtual("wishlist", {
  ref: "Wishlist",
  foreignField: "user",
  localField: "_id",
  justOne: true,
});

userSchema.virtual("payments", {
  ref: "Transaction",
  foreignField: "user",
  localField: "_id",
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model<IUser, IUserModel>(
  "User",
  userSchema
);

export default User;