import { useEffect, useState } from "react";
import { useProducts } from "./useProducts";

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const { data, error, loading } = useProducts();

  useEffect(() => {
    if (data?.length) {
      setProduct(data.find((product) => product.id === +id));
    }
  }, [id, data]);

  return { data: product, error, loading };
};
