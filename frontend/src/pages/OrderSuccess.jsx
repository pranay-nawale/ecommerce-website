import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export const OrderSuccess = () => (
  <section className="container-shell flex min-h-[60vh] flex-col items-center justify-center text-center">
    <CheckCircle2 className="text-brand-600" size={64} />
    <h1 className="mt-4 text-3xl font-black">Order placed successfully</h1>
    <p className="mt-2 text-slate-500">Your order is confirmed and will appear in your order history.</p>
    <Link className="btn-primary mt-6" to="/orders">View orders</Link>
  </section>
);
