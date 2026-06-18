import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error("Email and password are required");
    const user = await login(form);
    navigate(user?.role === "admin" ? "/admin" : "/");
  };
  return <AuthForm title="Login" form={form} setForm={setForm} submit={submit} loading={loading} />;
};

export const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    const user = await register(form);
    navigate(user?.role === "admin" ? "/admin" : "/");
  };
  return <AuthForm title="Register" form={form} setForm={setForm} submit={submit} loading={loading} />;
};

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/forgot-password", { email });
    toast.success("Reset instructions sent if the email exists");
  };
  return (
    <section className="container-shell flex min-h-[70vh] items-center justify-center">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h1 className="mb-5 text-2xl font-bold">Forgot password</h1>
        <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="btn-primary mt-4 w-full">Send reset link</button>
      </form>
    </section>
  );
};

const AuthForm = ({ title, form, setForm, submit, loading }) => (
  <section className="container-shell flex min-h-[70vh] items-center justify-center">
    <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h1 className="mb-5 text-2xl font-bold">{title}</h1>
      <div className="space-y-3">
        {"name" in form && <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />}
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      </div>
      <button disabled={loading} className="btn-primary mt-4 w-full">{title}</button>
      <div className="mt-4 flex justify-between text-sm text-brand-600">
        <Link to={title === "Login" ? "/register" : "/login"}>{title === "Login" ? "Create account" : "Have an account?"}</Link>
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
    </form>
  </section>
);
