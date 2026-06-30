import Product from "./product.model.ts";
import { IProduct } from "./product.interface.ts";
import ApiError from "../../utils/ApiError.ts";
import ApiFeatures, { QueryString } from "../../utils/ApiFeatures.ts";
import { t } from "../../utils/translate.ts";

export const getAllProducts = async (queryString: QueryString) => {
  const totalDocs = await Product.countDocuments();
  const features = new ApiFeatures<IProduct>(Product.find(), queryString)
    .filter()
    .sort()
    .limitFields()
    .search(Product.modelName)
    .paginate(totalDocs);

  const products = await features.query;
  return {
    results: products.length,
    pagination: features.paginationResult,
    data: products,
  };
};

export const getProductById = async (id: string) => {
  const product = await Product.findById(id).populate("brand", "name");
  if (!product) throw new ApiError(t("product:not_found", { id }), 404);

  await Product.findByIdAndUpdate(id, { $inc: { views_count: 1 } });
  return product;
};

export const createProduct = async (data: Partial<IProduct>) => {
  const product = await Product.create(data);
  return product;
};

export const updateProduct = async (id: string, data: Partial<IProduct>) => {
  const product = await Product.findByIdAndUpdate(id, data, { new: true });
  if (!product) throw new ApiError(t("product:not_found", { id }), 404);
  return product;
};

export const deleteProduct = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new ApiError(t("product:not_found", { id }), 404);
};

export const getProductsByCategory = async (
  categoryId: string,
  queryString: QueryString
) => {
  const totalDocs = await Product.countDocuments({ category: categoryId });
  const features = new ApiFeatures<IProduct>(
    Product.find({ category: categoryId }),
    queryString
  )
    .filter()
    .sort()
    .limitFields()
    .paginate(totalDocs);

  const products = await features.query;
  return {
    results: products.length,
    pagination: features.paginationResult,
    data: products,
  };
};

export const getProductsByBrand = async (
  brandId: string,
  queryString: QueryString
) => {
  const totalDocs = await Product.countDocuments({ brand: brandId });
  const features = new ApiFeatures<IProduct>(
    Product.find({ brand: brandId }),
    queryString
  )
    .filter()
    .sort()
    .limitFields()
    .paginate(totalDocs);

  const products = await features.query;
  return {
    results: products.length,
    pagination: features.paginationResult,
    data: products,
  };
};