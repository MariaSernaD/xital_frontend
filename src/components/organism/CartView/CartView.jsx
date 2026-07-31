import { useCart } from "../../../context/cartContext";
import Button from "../../atoms/Button/Button";
import Icon from "../../atoms/Icon/Icon";
import "./CartView.css";

export default function CartView() {
  const { cart, totalItems, removeProduct, updateQuantity } = useCart();

  return (
    <div className="cart-view-container">
      {cart?.products?.map(({ product, quantity }) => (
        <div className="cart-view-products" key={product._id}>
          {/* Columna 1: imagen */}
          <div className="cart-view-image">
            <img
              src={"/imagenes/xital.png"}
              alt={product.name}
              loading="lazy"
            />
          </div>

          {/* Columna 2: info + acciones */}
          <div className="cart-view-details">
            <h3>{product.name}</h3>
            <div className="cart-view-tags">
              <span>{product.category?.name}</span>
              <span>{product.fungus}</span>
              <span>{product.volume}</span>
            </div>

            {/* acciones: cantidad + eliminar juntas abajo */}
            <div className="cart-view-actions">
              <div className="multiple-button">
                <Button
                  className="btn-cart-view"
                  variant="secondary"
                  onClick={() =>
                    quantity === 1
                      ? removeProduct(product._id)
                      : updateQuantity(product._id, quantity - 1)
                  }
                >
                  {quantity === 1 ? (
                    <Icon name="trash" size={15} />
                  ) : (
                    <Icon name="minus" size={15} />
                  )}
                </Button>
                <span className="quantity-number">{quantity}</span>
                <Button
                  className="btn-cart-view"
                  variant="secondary"
                  size="sm"
                  onClick={() => updateQuantity(product._id, quantity + 1)}
                >
                  <Icon name="plus" size={15} />
                </Button>
              </div>

              <Button
                variant="ghost"
                className="remove-item"
                size="sm"
                onClick={() => removeProduct(product._id)}
              >
                <Icon name="trash" size={16} /> Eliminar
              </Button>
            </div>
          </div>

          {/* Columna 3: precios */}
          <div className="cart-view-prices">
            <p className="unit-price">${product.unitPrice.toFixed(2)}</p>
            <p className="line-total">
              ${(product.unitPrice * quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
