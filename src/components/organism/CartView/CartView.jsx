import { useCart } from "../../../context/cartContext";
import Button from "../../atoms/Button/Button";
import Icon from "../../atoms/Icon/Icon";

export default function CartView() {
  const { cart, totalItems, removeProduct, updateQuantity } = useCart();

  return (
    <div className="cart-view-container">
      <div className="cart-view-header">
        <h4>
          {totalItems}
          {totalItems === 1 ? "tintura" : "tinturas"}
        </h4>
      </div>

      {cart?.products?.map(({ product, quantity }) => (
        <div className="cart-view-products" key={product._id}>
          <div className="cart-view-image">
            <img
              src={product?.imageURL?.[0] ?? "/imagenes/xital.png"}
              alt={product.name}
              loading="lazy"
            />
          </div>

          <div className="cart-view-details">
            <h3>{product.name}</h3>
            <div className="cart-view-header">
              <span>{product.category?.name}</span>
              <span>{product.fungus}</span>
              <span>{product.volume}</span>
            </div>
          </div>

          <div className="cart-view-price">
            <p>{`$${product.unitPrice.toFixed(2)}`}</p>
          </div>
          <div className="cart-view-quantity">
            <div className="cart-view-quantity-actions">
              <div className="multiple-button">
                <Button
                  className="btn-cart-view"
                  variant="secondary"
                  onClick={() => updateQuantity(product._id, quantity - 1)}
                >
                  {quantity === 1 ? (
                    <Icon name="trash" size={15} />
                  ) : (
                    <Icon name="minus" size={15} />
                  )}
                </Button>
                <span className="quantity-number">{quantity}</span>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => updateQuantity(product._id, quantity + 1)}
                  className="btn-cart-view"
                >
                  <Icon name="plus" size={15}></Icon>
                </Button>
              </div>
            </div>
            <div className="cart-view-total">
              ${(product.unitPrice * quantity).toFixed(2)}
            </div>

            <div>
              <Button
                variant="ghost"
                className="remove-item"
                size="sm"
                onClick={() => removeProduct(product._id)}
              >
                <Icon name="trash" size={16} />
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
