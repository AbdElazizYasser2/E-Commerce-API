import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [3, 'Product name is too short'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    sku: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [20, 'Description must be at least 20 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      max: [1000000, 'Price is too high'],
    },
    compare_price: {
      type: Number,
      default: null,
    },
    cost: {
      type: Number,
      default: null,
    },
    quantity: {
      type: Number,
      default: 0,
      min: [0, 'Quantity cannot be negative']
    },
    low_stock_threshold: {
      type: Number,
      default: 5,
    },
    track_inventory: {
      type: Boolean,
      default: true,
    },
    stock_status: {
      type: String,
      enum: ['in_stock', 'out_of_stock', 'on_backorder'],
      default: 'in_stock',
    },
    image: {
      type: String,
      required: [true, 'Main product image is required'],
    },
    images: [String],
    is_active: {
      type: Boolean,
      default: true,
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
    views_count: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      default: 0,
      set: (val) => Math.round(val * 10) / 10,
    },
    reviews_count: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product must belong to a category']
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.pre('save', function(next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

productSchema.pre(/^find/, function(next) {
  this.populate({ path: 'category', select: 'name -_id' });
  next();
});

productSchema.virtual('image_url').get(function() {
  if (this.image && !this.image.startsWith('http')) {
    return `${process.env.BASE_URL}/products/${this.image}`;
  }
  return this.image;
});

productSchema.virtual('images_url').get(function() {
  if (this.images && this.images.length > 0) {
    return this.images.map(img =>
      img.startsWith('http') ? img : `${process.env.BASE_URL}/products/${img}`
    );
  }
  return this.images;
});

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id'
});

productSchema.virtual('discount_percentage').get(function() {
  if (this.compare_price && this.compare_price > this.price) {
    return Math.round(((this.compare_price - this.price) / this.compare_price) * 100);
  }
  return 0;
});

productSchema.index({ slug: 1 });
productSchema.index({ category: 1, is_active: 1 });
productSchema.index({ price: 1, rating: -1 });

const Product = mongoose.model("Product", productSchema);
export default Product;