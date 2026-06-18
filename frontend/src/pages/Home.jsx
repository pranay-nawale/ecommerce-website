import { Hero } from "../components/Hero";
import { ProductCard } from "../components/ProductCard";
import { Spinner } from "../components/Spinner";
import { useProducts } from "../hooks/useProducts";

export const Home = () => {
  const { products, loading } = useProducts({ limit: 8, sort: "rating" });

  return (
    <>
      <Hero />
      <section className="container-shell py-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Featured products</h2>
            <p className="text-sm text-slate-500">Fresh picks across popular categories.</p>
          </div>
        </div>
        {loading ? <Spinner /> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{products.map((product) => <ProductCard key={product._id} product={product} />)}</div>}
      </section>
    </>
  );
};
