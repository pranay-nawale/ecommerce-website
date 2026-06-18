import User from "../models/User.js";

const populatedCart = (userId) =>
  User.findById(userId).select("cart").populate("cart.product", "title price images stock rating category");

export const getCart = async (req, res, next) => {
  try {
    const user = await populatedCart(req.user._id);
    res.json(user.cart);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const user = await User.findById(req.user._id);
    const item = user.cart.find((entry) => entry.product.toString() === productId);

    if (item) item.quantity += Number(quantity);
    else user.cart.push({ product: productId, quantity: Number(quantity) });

    await user.save();
    const populated = await populatedCart(req.user._id);
    res.status(201).json(populated.cart);
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const user = await User.findById(req.user._id);
    const item = user.cart.find((entry) => entry.product.toString() === req.params.productId);

    if (!item) return res.status(404).json({ message: "Cart item not found" });
    item.quantity = Math.max(1, Number(quantity));
    await user.save();

    const populated = await populatedCart(req.user._id);
    res.json(populated.cart);
  } catch (error) {
    next(error);
  }
};

export const removeCartItem = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter((entry) => entry.product.toString() !== req.params.productId);
    await user.save();
    const populated = await populatedCart(req.user._id);
    res.json(populated.cart);
  } catch (error) {
    next(error);
  }
};
