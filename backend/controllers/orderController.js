import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const createOrder = async (req, res, next) => {
  try {
    const { products, shippingAddress, paymentMethod } = req.body;
    if (!products?.length) return res.status(400).json({ message: "Order requires products" });

    const ids = products.map((item) => item.product);
    const dbProducts = await Product.find({ _id: { $in: ids } });

    const orderProducts = products.map((item) => {
      const product = dbProducts.find((entry) => entry._id.toString() === item.product);
      if (!product) throw new Error("One or more products are unavailable");
      return { product: product._id, quantity: Number(item.quantity), price: product.price };
    });

    const totalPrice = orderProducts.reduce((total, item) => total + item.price * item.quantity, 0);
    const order = await Order.create({
      user: req.user._id,
      products: orderProducts,
      totalPrice,
      shippingAddress,
      paymentMethod
    });

    await User.findByIdAndUpdate(req.user._id, { cart: [] });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const myOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("products.product", "title images");
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("products.product", "title");
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    next(error);
  }
};
