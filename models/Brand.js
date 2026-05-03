import mongoose, { Schema } from "mongoose";
import slugify from 'slugify';

const brandSchema = new Schema(
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
    isDelete: { type: Boolean, default: false, select: false }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

brandSchema.virtual('logo_url').get(function() {
    if (this.logo && !this.logo.startsWith('http')) {
        return `${process.env.BASE_URL}/brands/${this.logo}`;
    }
    return this.logo;
});

brandSchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

brandSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true, strict: true });
  }
  next();
});

brandSchema.index({ slug: 1, is_active: 1 });

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;