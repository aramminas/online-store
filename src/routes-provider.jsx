import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Products } from "./pages/products";
import { Product } from "./pages/product";
import { NotFound } from "./pages/not-found";

export const RoutesProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
