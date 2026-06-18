import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { Spinner } from "../components/Spinner";
import { useProducts } from "../hooks/useProducts";

const categories = ["All", "Electronics", "Wearables", "Fashion", "Home", "Beauty"];

export const Products = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: "All",
    minPrice: "",
    maxPrice: "",
    sort: searchParams.get("sort") || "newest"
  });

  const params = useMemo(() => Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== "")), [filters]);
  const { products, loading } = useProducts(params);

  return (
    <section className="container-shell grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center gap-2 font-bold"><SlidersHorizontal size={18} /> Filters</div>
        <div className="space-y-4">
          <input className="input" placeholder="Search" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
          <select className="input" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-2">
            <input className="input" type="number" placeholder="Min" value={filters.minPrice} onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} />
            <input className="input" type="number" placeholder="Max" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} />
          </div>
          <select className="input" value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })}>
            <option value="newest">Newest</option>
            <option value="priceAsc">Price Low to High</option>
            <option value="priceDesc">Price High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </aside>
      <div>
        <h1 className="mb-5 text-2xl font-bold">All products</h1>
        {loading ? <Spinner /> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{products.map((product) => <ProductCard key={product._id} product={product} />)}</div>}
      </div>
    </section>
  );
};
