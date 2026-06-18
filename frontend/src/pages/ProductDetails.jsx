import { Heart, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "../components/Rating";
import { Spinner } from "../components/Spinner";
import { useShop } from "../context/ShopContext";
import api from "../services/api";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, addToWishlist } = useShop();

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => setProduct(data));
  }, [id]);

  if (!product) return <Spinner />;

  return (
    <section className="container-shell grid gap-8 py-8 md:grid-cols-2">
      <img src={product.images?.[0]} alt={product.title} className="aspect-square w-full rounded-lg object-cover" />
      <div className="space-y-5">
        <p className="font-semibold uppercase text-brand-600">{product.category}</p>
        <h1 className="text-3xl font-black">{product.title}</h1>
        <Rating value={product.rating} />
        <p className="text-3xl font-bold">Rs. {product.price.toLocaleString("en-IN")}</p>
        <p className="leading-7 text-slate-600 dark:text-slate-300">{product.description}</p>
        <p className="font-medium">{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</p>
        <div className="flex flex-wrap gap-3">
          <button className="btn-primary" onClick={() => addToCart(product._id)}><ShoppingCart size={18} /> Add to Cart</button>
          <button className="btn-secondary" onClick={() => addToWishlist(product._id)}><Heart size={18} /> Wishlist</button>
        </div>
      </div>
    </section>
  );
};
