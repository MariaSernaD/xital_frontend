import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Product from "../../pages/Product";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:productId" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}
