import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useShop } from "../context/ShopContext";
import api from "../services/api";

export const Checkout = () => {
  const { cart } = useShop();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", address: "", city: "", postalCode: "", country: "India", phone: "" });

  const submit = async (event) => {
    event.preventDefault();
    if (Object.values(form).some((value) => !value)) return toast.error("Complete shipping details");
    const products = cart.map((item) => ({ product: item.product._id, quantity: item.quantity }));
    await api.post("/orders", { products, shippingAddress: form, paymentMethod: "Cash on Delivery" });
    navigate("/order-success");
  };

  return (
    <section className="container-shell max-w-3xl py-8">
      <h1 className="mb-5 text-2xl font-bold">Checkout</h1>
      <form onSubmit={submit} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        {Object.keys(form).map((key) => (
          <input key={key} className="input" placeholder={key.replace(/([A-Z])/g, " $1")} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
        ))}
        <button className="btn-primary">Place order</button>
      </form>
    </section>
  );
};
