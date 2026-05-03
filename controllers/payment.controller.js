import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Payment from '../models/Payment.js';
import ApiError from '../utils/ApiError.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// CASH
/**
 * @desc    Create cash order
 * @route   POST /api/v1/payments/cash
 * @access  Private/User
 */
export const createCashOrder = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart || cart.cartItems.length === 0) {
    return next(new ApiError('No cart found', 404));
  }

  const total = cart.totalPriceAfterDiscount ?? cart.totalCartPrice;

  const order = await Order.create({
    order_number: `ORD-${Date.now()}`,
    user_id: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    subtotal: cart.totalCartPrice,
    total,
    paymentMethodType: 'cash',
    payment_status: 'pending',
    status: 'pending',
  });

  await Transaction.create({
    order: order._id,
    user: req.user._id,
    payment_method: 'cash',
    transaction_id: `CASH-${Date.now()}`,
    amount: total,
    status: 'pending',
  });

  await Cart.findOneAndDelete({ user: req.user._id });

  res.status(201).json({ data: order });
});

// STRIPE
/**
 * @desc    Create stripe payment intent
 * @route   POST /api/v1/payments/stripe/create-intent
 * @access  Private/User
 */
export const createStripePaymentIntent = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart || cart.cartItems.length === 0) {
    return next(new ApiError('No cart found', 404));
  }

  const total = cart.totalPriceAfterDiscount ?? cart.totalCartPrice;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total * 100, 
    currency: 'egp',
    metadata: { userId: req.user._id.toString() },
  });

  res.status(200).json({
    clientSecret: paymentIntent.client_secret,
    total,
  });
});

/**
 * @desc    Confirm stripe order after payment
 * @route   POST /api/v1/payments/stripe/confirm
 * @access  Private/User
 */
export const confirmStripeOrder = asyncHandler(async (req, res, next) => {
  const { paymentIntentId } = req.body;

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.status !== 'succeeded') {
    return next(new ApiError('Payment not confirmed', 400));
  }

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart || cart.cartItems.length === 0) {
    return next(new ApiError('No cart found', 404));
  }

  const total = cart.totalPriceAfterDiscount ?? cart.totalCartPrice;

  const order = await Order.create({
    order_number: `ORD-${Date.now()}`,
    user_id: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    subtotal: cart.totalCartPrice,
    total,
    paymentMethodType: 'card',
    payment_status: 'paid',
    status: 'processing',
    transaction_id: paymentIntentId,
    paid_at: Date.now(),
  });

  await Transaction.create({
    order: order._id,
    user: req.user._id,
    payment_method: 'card',
    transaction_id: paymentIntentId,
    amount: total,
    status: 'success',
    paid_at: Date.now(),
  });

  await Cart.findOneAndDelete({ user: req.user._id });

  res.status(201).json({ data: order });
});

/**
 * @desc    Stripe webhook
 * @route   POST /api/v1/payments/stripe/webhook
 * @access  Public
 */
export const stripeWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    await Transaction.findOneAndUpdate(
      { transaction_id: paymentIntent.id },
      { status: 'success', paid_at: Date.now() }
    );
  }

  res.status(200).json({ received: true });
});

// FAWRY
/**
 * @desc    Create fawry order
 * @route   POST /api/v1/payments/fawry/create
 * @access  Private/User
 */
export const createFawryOrder = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart || cart.cartItems.length === 0) {
    return next(new ApiError('No cart found', 404));
  }

  const total = cart.totalPriceAfterDiscount ?? cart.totalCartPrice;

  // Fawry reference number
  const fawryRefNumber = `FAWRY-${Date.now()}`;

  const order = await Order.create({
    order_number: `ORD-${Date.now()}`,
    user_id: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    subtotal: cart.totalCartPrice,
    total,
    paymentMethodType: 'fawry',
    payment_status: 'pending',
    status: 'pending',
    transaction_id: fawryRefNumber,
  });

  await Transaction.create({
    order: order._id,
    user: req.user._id,
    payment_method: 'fawry',
    transaction_id: fawryRefNumber,
    amount: total,
    status: 'pending',
  });

  await Cart.findOneAndDelete({ user: req.user._id });

  res.status(201).json({
    data: order,
    fawryRefNumber, 
  });
});

/**
 * @desc    Fawry webhook - confirm payment
 * @route   POST /api/v1/payments/fawry/webhook
 * @access  Public
 */
export const fawryWebhook = asyncHandler(async (req, res) => {
  const { referenceNumber, paymentStatus } = req.body;

  if (paymentStatus === 'PAID') {
    await Transaction.findOneAndUpdate(
      { transaction_id: referenceNumber },
      { status: 'success', paid_at: Date.now() }
    );

    await Order.findOneAndUpdate(
      { transaction_id: referenceNumber },
      { payment_status: 'paid', status: 'processing', paid_at: Date.now() }
    );
  }

  res.status(200).json({ received: true });
});