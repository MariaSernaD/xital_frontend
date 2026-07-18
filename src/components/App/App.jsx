import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Product from "../../pages/Product";
import ProductsPage from "../../pages/ProductsPage";
import Login from "../../pages/Login";
import Layout from "../../layout/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<Product />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
