import User from "../models/User.js";

const populateWishlist = (userId) =>
  User.findById(userId).select("wishlist").populate("wishlist", "title price images rating category stock");

export const getWishlist = async (req, res, next) => {
  try {
    const user = await populateWishlist(req.user._id);
    res.json(user.wishlist);
  } catch (error) {
    next(error);
  }
};

export const addWishlist = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { $addToSet: { wishlist: req.params.productId } });
    const user = await populateWishlist(req.user._id);
    res.status(201).json(user.wishlist);
  } catch (error) {
    next(error);
  }
};

export const removeWishlist = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { $pull: { wishlist: req.params.productId } });
    const user = await populateWishlist(req.user._id);
    res.json(user.wishlist);
  } catch (error) {
    next(error);
  }
};
