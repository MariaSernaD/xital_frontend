import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Button from "../components/atoms/Button/Button";
import Icon from "../components/atoms/Icon/Icon";
import { MousePointerClick } from "lucide-react";
import CartView from "../components/organism/CartView/CartView";
import "./Cart.css";

export default function Cart() {
  const { isCartEmpty, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (isCartEmpty) {
    return (
      <div className="cart-empty-container">
        <div className="cart-empty-display">
          <Icon name="cart" size={100} className="cart-icon"></Icon>
          <h2 className="cart-empty-title">Tu carrito está vacío</h2>
          <p>Aquí no hay nada, solo posibilidades 🍄... </p>
          <Button
            className="btn-empty-cart"
            variant="primary"
            size="md"
            onClick={() => navigate("/products")}
          >
            Explorar catálogo <MousePointerClick size={18} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page-header">
        <h1 className="cart-page-title"><Icon name= "cart" size={25}/>Tu carrito</h1>
        <p className="cart-page-subtitle">
          Revisa la compra de tus tinturas <span>{totalItems} {totalItems === 1 ? "unidad" : "unidades"}</span>
        </p>
      </div>

      <div className="cart-layout">
        {/* Columna izquierda: los productos */}
        <div className="cart-list-column">
          <CartView />
        </div>

        {/* Columna derecha: resumen sticky */}
        <aside className="cart-summary">
          <div className="cart-total">
            <span className="cart-total-subtitle">Total a pagar</span>
            <h3 className="cart-total-amount">${totalPrice.toFixed(2)}</h3>
          </div>
          <Button
            onClick={() => navigate("/checkout")}
            disabled={isCartEmpty}
            className="btn-cartDisplay-pay"
            variant="primary"
          >
            <Icon name="creditCard" size={18} />
            <span>Proceder al pago</span>
            <span className="cart-items-count">
              {totalItems} {totalItems === 1 ? "producto" : "productos"}
            </span>
          </Button>
        </aside>
      </div>
    </div>
  );
}
