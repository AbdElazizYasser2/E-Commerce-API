import mongoose, { Schema } from "mongoose";
import slugify from 'slugify';

const categorySchema = new Schema(
  {
    parent_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      minlength: [3, 'Category name is too Short'],
      maxlength: [100, 'Category name is too Long'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
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
    isDelete: {
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

categorySchema.virtual('image_url').get(function() {
  if (this.image && !this.image.startsWith('http')) {
    return `${process.env.BASE_URL}/categories/${this.image}`;
  }
  return this.image;
});

categorySchema.pre('save', function(next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
})

categorySchema.index({ slug: 1, is_active: 1 });
categorySchema.index({ order: 1, is_active: 1 });
categorySchema.index({ parent_id: 1 });

const Category = mongoose.model("Category", categorySchema);
export default Category;