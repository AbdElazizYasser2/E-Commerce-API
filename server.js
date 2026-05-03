import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import compression from 'compression';
import ApiError from './utils/ApiError.js';
import connectionDB from './config/database.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import { globalLimiter } from './middlewares/rateLimitMiddleware.js';
import loggerMiddleware from './middlewares/loggerMiddleware.js';

import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import brandRoutes from './routes/brand.route.js';
import categoryRoutes from './routes/category.route.js';
import addressRoutes from './routes/address.route.js';
import cartRoutes from './routes/cart.route.js';
import couponRoutes from './routes/coupon.route.js';
import orderRoutes from './routes/order.route.js';
import productRoutes from './routes/product.route.js';
import reviewRoutes from './routes/review.route.js';
import shippingMethodRoutes from './routes/shippingMethod.route.js';
import transactionRoutes from './routes/transaction.route.js';
import wishlistRoutes from './routes/wishlist.route.js';

const app = express();

// Middlewares
app.use(loggerMiddleware);
app.use(express.json());
app.use(compression());
app.use(cors());
app.options('*', cors());
app.use('/api', globalLimiter);

// DB Connection
connectionDB();

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/brands', brandRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/addresses', addressRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/coupons', couponRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/shipping-methods', shippingMethodRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/wishlist', wishlistRoutes);

// Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Error Middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`unhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error('Shutting down');
    process.exit(1);
  });
});

export default server;