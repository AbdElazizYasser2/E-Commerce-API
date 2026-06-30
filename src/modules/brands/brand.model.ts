import mongoose, { Schema } from "mongoose";
import slugify from 'slugify';
import { IBrand, IBrandModel } from "./brand.interface.ts";

const brandSchema = new Schema<IBrand, IBrandModel>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Brand name is required'],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    logo: {
      type: String,
      default: null,
    },

    website: {
      type: String,
      default: null,
    },

    description: { type: String },

    is_active: { type: Boolean, default: true },

    is_delete: { type: Boolean, default: false, select: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

brandSchema.virtual("logo_url").get(function (this: IBrand) {
  if (this.logo && !this.logo.startsWith("http")) {
    return `${process.env.BASE_URL}/brands/${this.logo}`;
  }
  return this.logo;
});

brandSchema.pre("save", function (this: IBrand) {
  if (this.isModified("name") || !this.slug) {
    this.slug = slugify(this.name as string, { lower: true, strict: true });
  }
});

brandSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate() as { name?: string; slug?: string };
  if (update?.name) {
    update.slug = slugify(update.name, { lower: true, strict: true });
  }
});

brandSchema.index({ slug: 1, is_active: 1 });

const Brand = mongoose.model<IBrand, IBrandModel>(
  "Brand", 
  brandSchema
);
export default Brand;