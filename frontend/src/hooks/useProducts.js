import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

export const useProducts = (params = {}) => {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/products", { params, signal: controller.signal });
        setProducts(data.products);
        setMeta({ total: data.total, pages: data.pages });
      } catch (error) {
        if (error.name !== "CanceledError") toast.error("Unable to load products");
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [JSON.stringify(params)]);

  return { products, meta, loading };
};
