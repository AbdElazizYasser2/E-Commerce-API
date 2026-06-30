import Cart from "./cart.model.ts";
import { ICartItem } from "../orders/order.interface.ts";
import { ICart } from "./cart.interface.ts";
import Product from "../products/product.model.ts";
import ApiError from "../../utils/ApiError.ts";
import { t } from "../../utils/translate.ts";

const calculateTotal = (cartItems: ICartItem[]): number => {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const getCart = async (userId: string) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, cartItems: [] });
  }
  return cart;
};

export const addItemToCart = async (
  userId: string,
  data: { productId: string; quantity: number; color?: string }
) => {
  const { productId, quantity, color } = data;

  const product = await Product.findById(productId);
  if (!product)
    throw new ApiError(t("product:not_found", { id: productId }), 404);

  if (product.track_inventory && product.quantity < quantity) {
    throw new ApiError(t("cart:out_of_stock", { name: product.name, quantity: product.quantity }), 400);
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      cartItems: [{ product: productId, quantity, color, price: product.price }],
    });
  } else {
    const itemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );

    if (itemIndex > -1) {
      cart.cartItems[itemIndex].quantity += quantity;
    } else {
      cart.cartItems.push({
        product: new (await import("mongoose")).default.Types.ObjectId(productId),
        quantity,
        color,
        price: product.price,
      });
    }
  }

  cart.totalCartPrice = calculateTotal(cart.cartItems);
  cart.totalPriceAfterDiscount = undefined;

  await cart.save();
  return cart;
};

export const updateCartItemQuantity = async (userId: string, itemId: string, quantity: number) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) 
    throw new ApiError(t("cart:not_found"), 404);

  const itemIndex = cart.cartItems.findIndex((item) => item._id?.toString() === itemId);

  if (itemIndex === -1) 
    throw new ApiError(t("cart:item_not_found"), 404);

  const product = await Product.findById(cart.cartItems[itemIndex].product);
  if (product?.track_inventory && product.quantity < quantity) {
    throw new ApiError(t("cart:out_of_stock", { name: product.name, quantity: product.quantity }), 400);
  }

  cart.cartItems[itemIndex].quantity = quantity;
  cart.totalCartPrice = calculateTotal(cart.cartItems);
  cart.totalPriceAfterDiscount = undefined;

  await cart.save();
  return cart;
};

export const removeItemFromCart = async (userId: string, itemId: string) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) 
    throw new ApiError(t("cart:not_found"), 404);

  const itemIndex = cart.cartItems.findIndex(
    (item) => item._id?.toString() === itemId
  );
  if (itemIndex === -1) 
    throw new ApiError(t("cart:item_not_found"), 404);

  cart.cartItems.splice(itemIndex, 1);
  cart.totalCartPrice = calculateTotal(cart.cartItems);
  cart.totalPriceAfterDiscount = undefined;

  await cart.save();
  return cart;
};

export const clearCart = async (userId: string) => {
  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { cartItems: [], totalCartPrice: 0, totalPriceAfterDiscount: undefined },
    { new: true }
  );
  if (!cart) 
    throw new ApiError(t("cart:not_found"), 404);
  return cart;
};

export const applyCoupon = async (userId: string, discount: number) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) 
    throw new ApiError(t("cart:not_found"), 404);

  if (cart.cartItems.length === 0)
    throw new ApiError(t("cart:cart_empty"), 400);

  cart.totalPriceAfterDiscount =
    Math.round((cart.totalCartPrice - discount) * 100) / 100;

  await cart.save();
  return cart;
};