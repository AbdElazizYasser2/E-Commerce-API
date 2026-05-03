import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: [true, 'First Name is required'],
    },
    last_name: {
      type: String,
      trim: true,
      required: [true, 'Last Name is required'],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, 'Email is required'],
    },
    email_verified_at: { type: Date, default: null },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'To short password'],
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ['customer', 'vendor', 'admin'],
      default: 'customer',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending', 'banned'],
      default: 'active',
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: null,
    },
    phone: {
      type: String,
      sparse: true,
      index: true,
    },
    avatar: { type: String, default: null },
    birth_date: { type: Date },
    last_login_at: { type: Date },
    is_delete: {
      type: Boolean,
      default: false,
      select: false,
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.index({ email: 1, status: 1});
userSchema.index({ role: 1 });

userSchema.virtual('myAddress', {
  ref: 'Address',
  foreignField: 'user',
  localField: '_id',
});

userSchema.virtual('wishlist', {
  ref: 'Wishlist',
  foreignField: 'user',
  localField: '_id',
  justOne: true 
});

userSchema.virtual('payments', {
  ref: 'Transaction',
  foreignField: 'user',
  localField: '_id',
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;