import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Product from "../../pages/Product";
import ProductsPage from "../../pages/ProductsPage";
import Login from "../../pages/Login";
import Layout from "../../layout/Layout";
import Register from "../../pages/Register";
import { AuthProvider } from "../../context/AuthContext";
import { CartProvider } from "../../context/CartContext";
import Cart from "../../pages/Cart";
import Checkout  from "../../pages/Checkout/Checkout";
import OrderConfirmation from "../../pages/OrderConfirmation";
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
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    {" "}
                    <Cart />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    {" "}
                    <Checkout />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-confirmation/:id"
                element={
                  <ProtectedRoute>
                    {" "}
                    <OrderConfirmation />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<div>Ruta no encontrada</div>} />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
