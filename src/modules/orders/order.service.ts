import Order from "./order.model.ts";
import { IOrder } from "./order.interface.ts";
import { ICartItem } from "./order.interface.ts";
import Product from "../products/product.model.ts";
import ApiError from "../../utils/ApiError.ts";
import ApiFeatures, { QueryString } from "../../utils/ApiFeatures.ts";
import { t } from "../../utils/translate.ts";

export const getAllOrders = async (queryString: QueryString) => {
  const totalDocs = await Order.countDocuments();
  const features = new ApiFeatures<IOrder>(Order.find(), queryString)
    .filter()
    .sort()
    .limitFields()
    .paginate(totalDocs);

  const orders = await features.query;
  return {
    results: orders.length,
    pagination: features.paginationResult,
    data: orders,
  };
};

export const getUserOrders = async (userId: string, queryString: QueryString) => {
  const totalDocs = await Order.countDocuments({ user_id: userId });
  const features = new ApiFeatures<IOrder>(Order.find({ user_id: userId }), queryString)
    .filter()
    .sort()
    .limitFields()
    .paginate(totalDocs);

  const orders = await features.query;
  return {
    results: orders.length,
    pagination: features.paginationResult,
    data: orders,
  };
};

export const getOrderById = async (id: string) => {
  const order = await Order.findById(id);
  if (!order) 
    throw new ApiError(t("order:not_found", { id }), 404);
  return order;
};

export const createOrder = async (
  userId: string,
  data: {
    cartItems: ICartItem[];
    shippingAddress: IOrder["shippingAddress"];
    shipping_cost?: number;
    paymentMethodType?: IOrder["paymentMethodType"];
    coupon_code?: string;
    discount?: number;
    notes?: string;
  }
) => {
  const {
    cartItems,
    shippingAddress,
    shipping_cost = 0,
    paymentMethodType = "cash",
    coupon_code = null,
    discount = 0,
    notes = null,
  } = data;

  const orderItems: ICartItem[] = [];
  for (const item of cartItems) {
    const product = await Product.findById(item.product);

    if (!product)
      throw new ApiError(t("order:product_not_found", { id: item.product }), 404);

    if (product.track_inventory && product.quantity < item.quantity) {
      throw new ApiError(t("order:out_of_stock", { name: product.name, quantity: product.quantity }), 400);
    }

    orderItems.push({
      product: item.product,
      quantity: item.quantity,
      color: item.color,
      price: product.price,
      total: product.price * item.quantity,
    });
  }

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.14 * 100) / 100;
  const total = subtotal + tax + shipping_cost - discount;
  const order_number = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const order = await Order.create({
    order_number,
    user: userId,
    cartItems: orderItems,
    shippingAddress,
    subtotal,
    tax,
    shipping_cost,
    discount,
    total,
    paymentMethodType,
    coupon_code,
    notes,
  });

  for (const item of orderItems) {
    await Product.findByIdAndUpdate(item.product, { $inc: { quantity: -item.quantity } });
  }

  return order;
};

export const updateOrderStatus = async (id: string, status: IOrder["status"]) => {
  const updateData: Partial<IOrder> = { status };

  if (status === "shipped") updateData.shipped_at = new Date();
  if (status === "delivered") updateData.delivered_at = new Date();

  const order = await Order.findByIdAndUpdate(id, updateData, { new: true });
  if (!order) 
    throw new ApiError(t("order:not_found", { id }), 404);
  return order;
};

export const updatePaymentStatus = async (id: string, payment_status: IOrder["payment_status"]) => {
  const updateData: Partial<IOrder> = { payment_status };

  if (payment_status === "paid") updateData.paid_at = new Date();

  const order = await Order.findByIdAndUpdate(id, updateData, { new: true });
  if (!order) 
    throw new ApiError(t("order:not_found", { id }), 404);
  return order;
};

export const cancelOrder = async (id: string, userId: string) => {
  const order = await Order.findOne({ _id: id, user_id: userId });
  if (!order) 
    throw new ApiError(t("order:not_found", { id }), 404);

  if (!["pending", "processing"].includes(order.status))
    throw new ApiError(t("order:cannot_cancel"), 400);

  for (const item of order.cartItems) {
    await Product.findByIdAndUpdate(item.product, { $inc: { quantity: item.quantity } });
  }

  order.status = "cancelled";
  await order.save();
  return order;
};

export const deleteOrder = async (id: string) => {
  const order = await Order.findByIdAndUpdate(
    id,
    { is_Delete: true, deleted_at: new Date() },
    { new: true }
  );
  if (!order) 
    throw new ApiError(t("order:not_found", { id }), 404);
};