import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import Button from "../components/atoms/Button/Button";
import Icon from "../components/atoms/Icon/Icon";
import { MousePointerClick } from "lucide-react";
import "./Cart.css";

export default function Cart() {
  const { isCartEmpty } = useCart();
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
    <div className="cart-container">
      <h1>Tu carrito</h1>
      <div>Aqui van los productos del carrito</div>
    </div>
  );
}
