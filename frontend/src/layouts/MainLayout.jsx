import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const MainLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <footer className="mt-12 border-t border-slate-200 py-8 dark:border-slate-800">
      <div className="container-shell flex flex-col justify-between gap-3 text-sm text-slate-500 sm:flex-row">
        <p>Copyright 2026 ShopSphere. Built for modern commerce.</p>
        <p>Secure checkout | Fast delivery | Easy returns</p>
      </div>
    </footer>
  </>
);
