import Category from "./category.model.ts";
import { ICategory } from "./category.interface.ts";
import ApiError from "../../utils/ApiError.ts";
import ApiFeatures, { QueryString } from "../../utils/ApiFeatures.ts";
import { t } from "../../utils/translate.ts";

export const getAllCategories = async (queryString: QueryString) => {
  const totalDocs = await Category.countDocuments();
  const features = new ApiFeatures<ICategory>(Category.find(), queryString)
    .filter()
    .sort()
    .limitFields()
    .search(Category.modelName)
    .paginate(totalDocs);

  const categories = await features.query;
  return {
    results: categories.length,
    pagination: features.paginationResult,
    data: categories,
  };
};

export const getCategoryById = async (id: string) => {
  const category = await Category.findById(id);
  if (!category) throw new ApiError(t("category:not_found", { id }), 404);
  return category;
};

export const getSubcategories = async (parentId: string) => {
  const categories = await Category.find({ parent_id: parentId });
  return {
    results: categories.length,
    data: categories,
  };
};

export const createCategory = async (data: Partial<ICategory>) => {
  const category = await Category.create(data);
  return category;
};

export const updateCategory = async (id: string, data: Partial<ICategory>) => {
  const category = await Category.findByIdAndUpdate(id, data, { new: true });
  if (!category) throw new ApiError(t("category:not_found", { id }), 404);
  return category;
};

export const deleteCategory = async (id: string) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new ApiError(t("category:not_found", { id }), 404);
};