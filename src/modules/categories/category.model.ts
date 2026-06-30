import mongoose, { Schema } from "mongoose";
import slugify from 'slugify';
import { ICategory, ICategoryModel } from "./category.interface.ts";

const categorySchema = new Schema<ICategory, ICategoryModel>(
  {
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    name: {
      type: String,
      unique: true,
      minlength: [3, 'Category name is too Short'],
      maxlength: [100, 'Category name is too Long'],
      required: [true, 'Category name is required'],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    description: { type: String },

    image: {
      type: String,
      default: null,
    },

    order: {
      type: Number,
      default: 0,
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    is_featured: {
      type: Boolean,
      default: false,
    },

    is_deleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.index({ slug: 1, is_active: 1 });
categorySchema.index({ order: 1, is_active: 1 });
categorySchema.index({ parent: 1 });

categorySchema.virtual("subCategories", {
  ref: "Category",
  foreignField: "parent",
  localField: "_id",
});

categorySchema.virtual("image_url").get(function () {
  if (this.image && !this.image.startsWith("http")) {
    return `${process.env.BASE_URL}/categories/${this.image}`;
  }
  return this.image;
});

categorySchema.pre("save", function () {
  if (this.isModified("name") || !this.slug) {
    this.slug = slugify(this.name as string, { lower: true, strict: true });
  }
});

categorySchema.pre(/^find/, function (
  this: mongoose.Query<ICategory[], ICategory>
) {
  this.where({ is_delete: false });
});

const Category = mongoose.model<ICategory, ICategoryModel>(
  "Category", 
  categorySchema
);
export default Category;