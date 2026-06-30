import Brand from './brand.model.ts';
import { IBrand } from './brand.interface.ts';
import ApiError from "../../utils/ApiError.ts";
import ApiFeatures, { QueryString } from '../../utils/ApiFeatures.ts';
import { t } from "../../utils/translate.ts";

export const getAllBrands = async (queryString: QueryString) => {
  const totalDocs = await Brand.countDocuments();
  const features = new ApiFeatures<IBrand>(Brand.find(), queryString)
    .filter()
    .sort()
    .limitFields()
    .search(Brand.modelName)
    .paginate(totalDocs);

  const brands = await features.query;
  return {
    results: brands.length,
    pagination: features.paginationResult,
    data: brands,
  };
};

export const getBrandById = async (id: string) => {
  const brand = await Brand.findById(id);
  if (!brand) throw new ApiError(t("brand:not_found", { id }), 404);
  return brand;
};

export const createBrand = async (data: Partial<IBrand>) => {
  const brand = await Brand.create(data);
  return brand;
};

export const updateBrand = async (id: string, data: Partial<IBrand>) => {
  const brand = await Brand.findByIdAndUpdate(id, data, { new: true });
  if (!brand) throw new ApiError(t("brand:not_found", { id }), 404);
  return brand;
};

export const deleteBrand = async (id: string) => {
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) throw new ApiError(t("brand:not_found", { id }), 404);
};