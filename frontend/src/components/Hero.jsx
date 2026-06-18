import { Link } from "react-router-dom";

export const Hero = () => (
  <section className="bg-slate-900 text-white">
    <div className="container-shell grid min-h-[340px] items-center gap-8 py-8 md:grid-cols-[1.05fr_0.95fr]">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase text-emerald-300">Big festive deals are live</p>
        <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl">ShopSphere</h1>
        <p className="mt-4 max-w-xl text-slate-200">Electronics, fashion, wearables, and daily essentials with sharp prices and fast checkout.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn-primary" to="/products">Shop deals</Link>
          <Link className="btn-secondary border-white/30 text-white hover:bg-white/10" to="/products?sort=rating">Top rated</Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80"].map((src) => (
          <img key={src} src={src} alt="Promotional product" className="h-64 w-full rounded-lg object-cover shadow-2xl" />
        ))}
      </div>
    </div>
  </section>
);
