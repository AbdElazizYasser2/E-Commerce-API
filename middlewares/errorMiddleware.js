import ApiError from '../utils/ApiError.js';

// Handle Wrong MongoDB ID
const handleCastErrorDB = (err) => 
  new ApiError(`Invalid ${err.path}: ${err.value}`, 400);

// Handle Duplicate Fields
const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  return new ApiError(`${field}: ${value} already exists`, 400);
};

// Handle Validation Errors
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new ApiError(`Invalid input data: ${errors.join(', ')}`, 400);
};

// Handle JWT Errors
const handleJWTError = () => 
  new ApiError('Invalid token, please login again', 401);

const handleJWTExpiredError = () => 
  new ApiError('Token expired, please login again', 401);

// Development Error Response
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

// Production Error Response
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err, message: err.message };

    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

export default errorMiddleware;