import { useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { useShop } from "../context/ShopContext";

export const Wishlist = () => {
  const { wishlist, loadWishlist } = useShop();
  useEffect(() => { loadWishlist(); }, []);

  return (
    <section className="container-shell py-8">
      <h1 className="mb-5 text-2xl font-bold">Wishlist</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {wishlist.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </section>
  );
};
