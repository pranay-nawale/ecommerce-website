import { Heart, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/ShopContext";
import { Rating } from "./Rating";

export const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { addToCart, addToWishlist } = useShop();
  const navigate = useNavigate();

  const requireAuth = (action) => {
    if (!user) {
      toast.error("Please sign in first");
      navigate("/login");
      return;
    }
    action();
  };

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-3 shadow-soft transition hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900">
      <Link to={`/products/${product._id}`} className="block overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">
        <img src={product.images?.[0]} alt={product.title} className="aspect-square w-full object-cover transition hover:scale-105" />
      </Link>
      <div className="mt-3 space-y-2">
        <p className="text-xs font-semibold uppercase text-brand-600">{product.category}</p>
        <Link to={`/products/${product._id}`} className="line-clamp-2 min-h-10 text-sm font-semibold hover:text-brand-600">
          {product.title}
        </Link>
        <Rating value={product.rating} />
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">Rs. {product.price.toLocaleString("en-IN")}</p>
          <p className="text-xs text-slate-500">{product.stock} left</p>
        </div>
        <div className="grid grid-cols-[1fr_44px] gap-2">
          <button className="btn-primary h-10" onClick={() => requireAuth(() => addToCart(product._id))}>
            <ShoppingCart size={16} /> Cart
          </button>
          <button className="btn-secondary h-10 px-0" aria-label="Add to wishlist" onClick={() => requireAuth(() => addToWishlist(product._id))}>
            <Heart size={17} />
          </button>
        </div>
      </div>
    </article>
  );
};
