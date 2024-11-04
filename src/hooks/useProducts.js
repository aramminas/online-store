import { useEffect, useState } from "react";
import { delay } from "../utils";

const apiUrl = import.meta.env.VITE_API_URL || "/";

export const useProducts = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        // make a simulated request
        await delay();

        const response = await fetch(`${apiUrl}/server/database.json`, {
          headers: {
            accept: "application/json",
          },
        });

        const { products } = await response.json();
        setData(products);
      } catch (err) {
        setError(err?.message || "Error while fetching data!");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, error, loading };
};
