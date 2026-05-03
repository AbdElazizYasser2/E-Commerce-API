import asyncHandler from 'express-async-handler';
import ApiFeatures from './ApiFeatures.js';
import ApiError from './ApiError.js';

// Delete One Handler
export const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiError(`No document found for this id: ${id}`, 404));
    }
    res.status(204).send();
  });

// Update One Handler
export const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(new ApiError(`No document found for this id: ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
  });

// Create One Handler
export const createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

// Get One Handler
export const getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(`No document found for this id: ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

// Get All Handler
export const getAll = (Model) =>
  asyncHandler(async (req, res) => {
    const totalDocs = await Model.countDocuments();

    const features = new ApiFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .search(Model.modelName)
      .paginate(totalDocs);

    const documents = await features.query;

    res.status(200).json({
      results: documents.length,
      pagination: features.paginationResult,
      data: documents,
    });
  });

const Factory = { createOne, deleteOne, getAll, getOne, updateOne };
export default Factory;