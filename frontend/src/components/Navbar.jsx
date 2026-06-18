import { Heart, Menu, Moon, Search, ShoppingCart, Sun, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/ShopContext";

export const Navbar = () => {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [query, setQuery] = useState("");
  const { user, logout } = useAuth();
  const { cart, wishlist } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const onSearch = (event) => {
    event.preventDefault();
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="container-shell flex h-16 items-center gap-3">
        <Link to="/" className="text-xl font-black tracking-tight text-brand-600">ShopSphere</Link>
        <nav className="hidden items-center gap-4 text-sm font-medium md:flex">
          <NavLink to="/products">Categories</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
        </nav>
        <form onSubmit={onSearch} className="ml-auto hidden min-w-0 flex-1 max-w-xl items-center md:flex">
          <input className="input rounded-r-none" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, brands and categories" />
          <button className="btn-primary h-[38px] rounded-l-none px-3" aria-label="Search"><Search size={18} /></button>
        </form>
        <button className="btn-secondary px-3" onClick={() => setDark((value) => !value)} aria-label="Toggle theme">
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Link className="btn-secondary relative px-3" to="/wishlist" aria-label="Wishlist">
          <Heart size={18} />
          {wishlist.length > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-1.5 text-xs text-white">{wishlist.length}</span>}
        </Link>
        <Link className="btn-secondary relative px-3" to="/cart" aria-label="Cart">
          <ShoppingCart size={18} />
          {cart.length > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-brand-600 px-1.5 text-xs text-white">{cart.length}</span>}
        </Link>
        {user ? (
          <button onClick={logout} className="btn-secondary hidden sm:inline-flex"><User size={17} /> {user.name.split(" ")[0]}</button>
        ) : (
          <Link to="/login" className="btn-primary hidden sm:inline-flex"><User size={17} /> Login</Link>
        )}
        <button className="btn-secondary px-3 md:hidden" aria-label="Open menu"><Menu size={18} /></button>
      </div>
      <form onSubmit={onSearch} className="container-shell pb-3 md:hidden">
        <input className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" />
      </form>
    </header>
  );
};
