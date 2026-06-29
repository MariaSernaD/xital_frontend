import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Product from "../../pages/Product";
import ProductsPage from "../../pages/ProductsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/products/:productId" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}
