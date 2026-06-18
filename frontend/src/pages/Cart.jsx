import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export const Cart = () => {
  const { cart, loadCart, updateQuantity, removeFromCart } = useShop();
  useEffect(() => { loadCart(); }, []);
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <section className="container-shell py-8">
      <h1 className="mb-5 text-2xl font-bold">Shopping cart</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.product._id} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <img src={item.product.images?.[0]} alt={item.product.title} className="h-24 w-24 rounded-md object-cover" />
              <div className="flex-1">
                <h2 className="font-bold">{item.product.title}</h2>
                <p>Rs. {item.product.price.toLocaleString("en-IN")}</p>
                <input className="input mt-3 max-w-24" type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.product._id, e.target.value)} />
              </div>
              <button className="btn-secondary h-10 px-3" onClick={() => removeFromCart(item.product._id)}><Trash2 size={18} /></button>
            </div>
          ))}
        </div>
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-bold">Order summary</h2>
          <div className="my-4 flex justify-between text-xl font-black"><span>Total</span><span>Rs. {total.toLocaleString("en-IN")}</span></div>
          <Link className="btn-primary w-full" to="/checkout">Proceed to checkout</Link>
        </aside>
      </div>
    </section>
  );
};
