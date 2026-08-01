import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Product from "../../pages/Product";
import ProductsPage from "../../pages/ProductsPage";
import Login from "../../pages/Login";
import Layout from "../../layout/Layout";
import Register from "../../pages/Register";
import { AuthProvider } from "../../context/AuthContext";
import { CartProvider } from "../../context/cartContext";
import Cart from "../../pages/Cart";
import ProtectedRoute from "../../pages/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:productId" element={<Product />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<ProtectedRoute> <Cart /> </ProtectedRoute>}/>
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
