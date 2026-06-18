import { Link } from "react-router-dom";

export const NotFound = () => (
  <section className="container-shell flex min-h-[60vh] flex-col items-center justify-center text-center">
    <h1 className="text-5xl font-black">404</h1>
    <p className="mt-2 text-slate-500">Page not found.</p>
    <Link className="btn-primary mt-5" to="/">Go home</Link>
  </section>
);
