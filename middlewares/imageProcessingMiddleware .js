import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import asyncHandler from 'express-async-handler';

export const processSingleImage = (folderName, fieldName) =>
  asyncHandler(async (req, res, next) => {
    if (!req.file) return next();

    const filename = `${folderName}-${uuidv4()}-${Date.now()}.webp`;

    await sharp(req.file.buffer)
      .resize(800, 800, { fit: 'cover' })
      .toFormat('webp')
      .webp({ quality: 90 })
      .toFile(`uploads/${folderName}/${filename}`);

    req.body[fieldName] = filename;
    next();
  });
  
export const processMultipleImages = (folderName) =>
  asyncHandler(async (req, res, next) => {
    if (!req.files) return next();

    // Main Image
    if (req.files.image) {
      const filename = `${folderName}-${uuidv4()}-${Date.now()}.webp`;

      await sharp(req.files.image[0].buffer)
        .resize(800, 800, { fit: 'cover' })
        .toFormat('webp')
        .webp({ quality: 90 })
        .toFile(`uploads/${folderName}/${filename}`);

      req.body.image = filename;
    }

    // Additional Images
    if (req.files.images) {
      req.body.images = await Promise.all(
        req.files.images.map(async (file) => {
          const filename = `${folderName}-${uuidv4()}-${Date.now()}.webp`;

          await sharp(file.buffer)
            .resize(800, 800, { fit: 'cover' })
            .toFormat('webp')
            .webp({ quality: 90 })
            .toFile(`uploads/${folderName}/${filename}`);

          return filename;
        })
      );
    }

    next();
  });