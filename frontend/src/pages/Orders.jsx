import { useEffect, useState } from "react";
import api from "../services/api";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => { api.get("/orders/my-orders").then(({ data }) => setOrders(data)); }, []);

  return (
    <section className="container-shell py-8">
      <h1 className="mb-5 text-2xl font-bold">Order history</h1>
      <div className="space-y-3">
        {orders.map((order) => (
          <article key={order._id} className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap justify-between gap-2">
              <p className="font-bold">Order #{order._id.slice(-8)}</p>
              <p className="font-semibold text-brand-600">{order.status}</p>
            </div>
            <p className="mt-2">Rs. {order.totalPrice.toLocaleString("en-IN")}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
