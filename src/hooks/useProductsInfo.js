import { useEffect, useState } from "react";
import { useProducts } from "./useProducts";

const initState = {
  brands: [],
  categories: [],
  maxPrice: 0,
};

export const useProductsInfo = () => {
  const [productInfo, setProductInfo] = useState(initState);
  const { data, error, loading } = useProducts();

  useEffect(() => {
    if (data?.length) {
      const brands = [...new Set(data.map((product) => product.brand))];
      const categories = [...new Set(data.map((product) => product.category))];
      const maxPrice = Math.max.apply(
        null,
        data.map((product) => product.price)
      );

      setProductInfo({
        brands,
        categories,
        maxPrice,
      });
    }
  }, [data]);

  return { data: productInfo, error, loading };
};
