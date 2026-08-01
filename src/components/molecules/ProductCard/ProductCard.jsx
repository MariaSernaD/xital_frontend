import { Link, useNavigate } from "react-router-dom";
import Button from "../../atoms/Button/Button";
import Badge from "../../atoms/Badge/Bagde";
import { ShoppingCart, Star } from "lucide-react";
import "./ProductCard.css";
import { useCart } from "../../../context/cartContext";
import { useAuth } from "../../../context/AuthContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { name, description, unitPrice, stock, imageURL, category, volume } =
    product || {};

  if (!product) {
    return (
      <div className="product-card product-card--empty">
        <p className="muted">
          Este producto no está disponible por el momento.
        </p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    addToCart(product._id, 1);
  };

  const productLink = `/products/${product._id}`;

  return (
    <div className="product-card">
      {/* Contenedor de Imagen */}
      <div className="product-card-image-wrapper">
        <Link to={productLink}>
          <img
            src={"/imagenes/xital.png"}
            alt={name}
            className="product-card-image"
          />
        </Link>
      </div>

      {/* Contenido Informativo */}
      <div className="product-card-content">
        {/* Categoría */}
        <div className= "product-card-category-row">
          <span className="product-card-category">
            {category?.name ?? "General"}
          </span>
          <span className="product-card-category">{volume}</span>
        </div>

        <h3 className="product-card-title">
          <Link to={productLink}>{name}</Link>
        </h3>

        {/* Descripción breve (Texto más pequeño debajo del título) */}
        <div className="product-card-rating">
          <div className="rating-starts">
            <Star size={14} fill="#0a0a0a" color="#0a0a0a" />
            <Star size={14} fill="#0a0a0a" color="#0a0a0a" />
            <Star size={14} fill="#0a0a0a" color="#0a0a0a" />
            <Star size={14} fill="#0a0a0a" color="#0a0a0a" />
            <Star size={14} color="#0a0a0a" />
          </div>
          <span className="rating-number">4.8</span>
        </div>
      </div>

      {/* Footer: Precio y Botón */}
      <div className="product-card-footer">
        <div className="product-card-price">${unitPrice}.00</div>

        <Button
          variant="primary"
          disabled={stock === 0}
          onClick={handleAddToCart}
          className="product-card-quick-buy"
          aria-label="Agregar al carrito"
        >
          <ShoppingCart size={18} />
        </Button>
      </div>
    </div>
  );
}
