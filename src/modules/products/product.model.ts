import mongoose, { Schema } from "mongoose";
import slugify from "slugify";
import { STOCK_STATUS } from "../../constants/product.ts";
import { IProduct, IProductModel } from "./product.interface.ts";

const productSchema = new Schema<IProduct, IProductModel>(
  {
    name: {
      type: String,
      trim: true,
      minlength: [3, 'Product name is too short'],
      required: [true, 'Product name is required'],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    sku: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
    },

    description: {
      type: String,
      minlength: [20, 'Description must be at least 20 characters'],
      required: [true, 'Product descritpion is required'],
    },

    price: {
      type: Number,
      max: [1000000, 'Price is to high'],
      required: [true, 'Product price is required'],
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
      min: [0, 'Quantity cannot be negative'],
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
      enum: Object.values(STOCK_STATUS),
      default: STOCK_STATUS.IN_STOCK,
    },

    image: {
      type: String,
      required: [true, 'Main product image is required'],
    },

    images: {
      type: [String],
      default: [],
    },
    
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
      min: [0, 'Rating must be above 0'],
      max: [5, 'Rating must be below 5.0'],
      default: 0,
      set: (val: number) => Math.round(val * 10) / 10,
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
    toObject: { virtuals: true }
  }
);

productSchema.pre("save", function () {
  if (this.isModified("name") || !this.slug) {
    this.slug = slugify(this.name as string, { lower: true, strict: true });
  }
});

productSchema.pre(/^find/, function () {
  (this as mongoose.Query<IProduct[], IProduct>).populate({
    path: "category",
    select: "name -_id",
  });
});

productSchema.virtual("image_url").get(function () {
  if (this.image && !this.image.startsWith("http")) {
    return `${process.env.BASE_URL}/products/${this.image}`;
  }
  return this.image;
});

productSchema.virtual("images_url").get(function () {
  if (this.images && this.images.length > 0) {
    return this.images.map((img: string) =>
      img.startsWith("http") ? img : `${process.env.BASE_URL}/products/${img}`
    );
  }
  return this.images;
});

productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

productSchema.virtual("discount_percentage").get(function () {
  if (this.compare_price && this.compare_price > this.price) {
    return Math.round(
      ((this.compare_price - this.price) / this.compare_price) * 100
    );
  }
  return 0;
});

productSchema.index({ category: 1, is_active: 1 });
productSchema.index({ price: 1, rating: -1 });

const Product = mongoose.model<IProduct, IProductModel>(
  "Product", 
  productSchema
);
export default Product;