import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

const emptyProduct = { title: "", description: "", price: "", category: "", stock: "", images: "", rating: 0 };

export const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const [analyticsRes, productsRes, ordersRes, usersRes] = await Promise.all([
      api.get("/admin/analytics"),
      api.get("/products?limit=100"),
      api.get("/orders"),
      api.get("/admin/users")
    ]);
    setAnalytics(analyticsRes.data);
    setProducts(productsRes.data.products);
    setOrders(ordersRes.data);
    setUsers(usersRes.data);
  };

  useEffect(() => { load(); }, []);

  const saveProduct = async (event) => {
    event.preventDefault();
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock), images: form.images.split(",").map((url) => url.trim()) };
    if (editing) await api.put(`/products/${editing}`, payload);
    else await api.post("/products", payload);
    toast.success(editing ? "Product updated" : "Product added");
    setForm(emptyProduct);
    setEditing(null);
    load();
  };

  const editProduct = (product) => {
    setEditing(product._id);
    setForm({ ...product, images: product.images.join(", ") });
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    toast.success("Product deleted");
    load();
  };

  const updateOrderStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    toast.success("Order updated");
    load();
  };

  const updateUserRole = async (id, role) => {
    await api.put(`/admin/users/${id}`, { role });
    toast.success("User updated");
    load();
  };

  const deleteUser = async (id) => {
    await api.delete(`/admin/users/${id}`);
    toast.success("User deleted");
    load();
  };

  return (
    <section className="container-shell space-y-8 py-8">
      <h1 className="text-3xl font-black">Admin dashboard</h1>
      {analytics && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(analytics).map(([key, value]) => (
            <div key={key} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm capitalize text-slate-500">{key}</p>
              <p className="text-2xl font-black">{key === "revenue" ? `Rs. ${value.toLocaleString("en-IN")}` : value}</p>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={saveProduct} className="grid gap-3 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2">
        <h2 className="md:col-span-2 text-xl font-bold">{editing ? "Edit product" : "Add product"}</h2>
        {Object.keys(emptyProduct).map((key) => (
          <input key={key} className="input" placeholder={key} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
        ))}
        <button className="btn-primary md:col-span-2"><Plus size={18} /> Save product</button>
      </form>
      <div className="grid gap-6 lg:grid-cols-2">
        <AdminPanel title="Manage Products">
          {products.map((product) => (
            <Row key={product._id} title={product.title} meta={`Rs. ${product.price}`} actions={<><button onClick={() => editProduct(product)}><Pencil size={17} /></button><button onClick={() => deleteProduct(product._id)}><Trash2 size={17} /></button></>} />
          ))}
        </AdminPanel>
        <AdminPanel title="Manage Orders">
          {orders.map((order) => (
            <Row
              key={order._id}
              title={`Order ${order._id.slice(-8)}`}
              meta={`Rs. ${order.totalPrice}`}
              actions={
                <select className="input max-w-36" value={order.status} onChange={(e) => updateOrderStatus(order._id, e.target.value)}>
                  {["Placed", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => <option key={status}>{status}</option>)}
                </select>
              }
            />
          ))}
        </AdminPanel>
        <AdminPanel title="Manage Users">
          {users.map((user) => (
            <Row
              key={user._id}
              title={user.name}
              meta={user.email}
              actions={
                <>
                  <select className="input max-w-28" value={user.role} onChange={(e) => updateUserRole(user._id, e.target.value)}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                  <button onClick={() => deleteUser(user._id)}><Trash2 size={17} /></button>
                </>
              }
            />
          ))}
        </AdminPanel>
      </div>
    </section>
  );
};

const AdminPanel = ({ title, children }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
    <h2 className="mb-4 text-xl font-bold">{title}</h2>
    <div className="space-y-2">{children}</div>
  </div>
);

const Row = ({ title, meta, actions }) => (
  <div className="flex items-center justify-between gap-3 rounded-md bg-slate-50 p-3 dark:bg-slate-950">
    <div><p className="font-semibold">{title}</p><p className="text-sm text-slate-500">{meta}</p></div>
    <div className="flex gap-2 text-slate-500">{actions}</div>
  </div>
);
