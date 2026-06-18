import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ForgotPassword, Login, Register } from "./pages/Auth";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { OrderSuccess } from "./pages/OrderSuccess";
import { Orders } from "./pages/Orders";
import { ProductDetails } from "./pages/ProductDetails";
import { Products } from "./pages/Products";
import { Wishlist } from "./pages/Wishlist";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route element={<ProtectedRoute admin />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
