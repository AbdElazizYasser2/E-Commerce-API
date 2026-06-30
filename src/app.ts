import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import hpp from 'hpp';
import * as i18nextMiddleware from "i18next-http-middleware";

import i18next from "./config/i18n.ts";

import errorMiddleware from "./middlewares/error.middleware.ts";
import loggerMiddleware from "./middlewares/logger.middleware.ts";
import { globalLimiter } from './middlewares/rate-Limit.middleware.ts';

import ApiError from './utils/ApiError.ts';

import userRoutes from './modules/users/user.route.ts';
import authRoutes from './modules/auth/auth.route.ts';
import brandRoutes from './modules/brands/brand.route.ts';
import categoryRoutes from './modules/categories/category.route.ts';
import productRoutes from './modules/products/product.route.ts';
import orderRoutes from './modules/orders/order.route.ts';
import addressRoutes from './modules/address/addres.route.ts';
import couponRoutes from './modules/coupons/coupon.route.ts';
import cartRoutes from './modules/cart/cart.route.ts';
import wishlistRoutes from './modules/wishlists/wishlist.route.ts';
import paymentRoutes from './modules/payments/payment.route.ts';
import reviewRoutes from './modules/reviews/review.route.ts';
import notificationRoutes from './modules/notifications/notification.route.ts';
import settingRoutes from './modules/settings/setting.route.ts';
import shippingMethodRoutes from './modules/shipping-methods/shippingMethod.route.ts';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(hpp());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors());
app.use(i18nextMiddleware.handle(i18next));
app.use(loggerMiddleware);
app.use(globalLimiter);

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/brands', brandRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/addresses', addressRoutes);
app.use('/api/v1/coupons', couponRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/wishlists', wishlistRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/settings', settingRoutes);
app.use('/api/v1/shipping-methods', shippingMethodRoutes);

app.all('*splat', (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorMiddleware);

export default app;