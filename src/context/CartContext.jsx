import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { clearCart, getCartByUser } from "../services/cartService";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { isAuthenticated, user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }

    // variable bandera: evita actualizar el estado si el componente se desmonta(el usuario puede salir inmediatamente)
    // antes de que responda el servidor (previene warning de React)
    let cancelled = false;

    (async () => {
      try {
        const serverCart = await getCartByUser();
        if (cancelled) return;
        setCart(serverCart); // guarda el carrito completo
      } catch (error) {
        if (cancelled) return;
        if (error.kind !== "NOT FOUND") {
          setError(error.kind ?? "SERVER_ERROR");
        }
      }
    })();
    return () => {
      cancelled = true; //cleanup del useEffect
    };
  }, [isAuthenticated, user?.id]);

  const emptyCart = async () => {
    if (!isAuthenticated) return;
    try {
      await clearCart();
      setCart({ products: [] });
    } catch (error) {
      setError(error.kind ?? "SERVER_ERROR");
    }
  };

  const totalItems =
    cart?.products?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const totalPrice =
    cart?.products?.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    ) ?? 0;
  const isCartEmpty = !cart?.products?.length;

  const value = { cart, loading, error, emptyCart, totalItems, totalPrice, isCartEmpty };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart debe ser usado dentro del CartProvider");
  return context;
}

/**
 * 
loadCart — llama a getCartByUser
addToCart — llama a addProductToCart
updateQuantity — llama a updateCart
removeProduct — llama a deleteProductFromCart
emptyCart — llama a clearCart
 */
