import { useEffect, useState } from "react";
import { useProducts } from "./useProducts";

export const useTopProducts = () => {
  const [products, setProducts] = useState(null);
  const { data, error, loading } = useProducts();

  useEffect(() => {
    if (data?.length) {
      // get three product as top products
      const topProducts = data.slice(0, 3);
      setProducts(topProducts);
    }
  }, [data]);

  return { data: products, error, loading };
};
