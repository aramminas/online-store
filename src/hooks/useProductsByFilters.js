import { useEffect, useState } from "react";
import { useProducts } from "./useProducts";
import { filterProductData } from "../utils";

export const useProductsByFilters = (filters, page, limit) => {
  const [products, setProducts] = useState(null);
  const [total, setTotal] = useState(0);
  const { data, error, loading } = useProducts();

  useEffect(() => {
    if (data?.length) {
      const { data: currentPageData, total: currentTotal } = filterProductData(
        data,
        filters,
        page,
        limit
      );

      setTotal(currentTotal);
      setProducts(currentPageData);
    }
  }, [data, filters, page]);

  return { data: products, total, error, loading };
};
