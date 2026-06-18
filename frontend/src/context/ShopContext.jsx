import { createContext, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const loadCart = async () => {
    const { data } = await api.get("/cart");
    setCart(data);
  };

  const addToCart = async (productId, quantity = 1) => {
    const { data } = await api.post("/cart", { productId, quantity });
    setCart(data);
    toast.success("Added to cart");
  };

  const updateQuantity = async (productId, quantity) => {
    const { data } = await api.put(`/cart/${productId}`, { quantity });
    setCart(data);
  };

  const removeFromCart = async (productId) => {
    const { data } = await api.delete(`/cart/${productId}`);
    setCart(data);
    toast.success("Removed from cart");
  };

  const loadWishlist = async () => {
    const { data } = await api.get("/wishlist");
    setWishlist(data);
  };

  const addToWishlist = async (productId) => {
    const { data } = await api.post(`/wishlist/${productId}`);
    setWishlist(data);
    toast.success("Saved to wishlist");
  };

  const removeFromWishlist = async (productId) => {
    const { data } = await api.delete(`/wishlist/${productId}`);
    setWishlist(data);
    toast.success("Removed from wishlist");
  };

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      loadCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      loadWishlist,
      addToWishlist,
      removeFromWishlist
    }),
    [cart, wishlist]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => useContext(ShopContext);
