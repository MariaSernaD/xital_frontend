import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOrderById } from "../services/orderService";
import Icon from "../components/atoms/Icon/Icon";
import Loading from "../components/atoms/Loading/Loading";
import "./OrderConfirmation.css";

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        const orderData = await getOrderById(id);
        setOrder(orderData);
      } catch (error) {
        setError(error.kind ?? "UNKNOWN");
      } finally {
        setLoading(false);
      }
    };
    loadOrder();
  }, [id]);

  if (loading)
    return (
      <Loading className="order-loading">
        Cargando información de tu orden...
      </Loading>
    );

  if (error)
    return (
      <div className="order-confirmation">
        <p className="order-error">
          No pudimos cargar tu orden. Intenta de nuevo más tarde.
        </p>
      </div>
    );

  if (!order) return null;

  
const productsTotal = order.totalPrice;              
const shippingCost = order.shippingCost;
const ivaIncluido = productsTotal - productsTotal / 1.16;  
const subtotalSinIva = productsTotal / 1.16;
const grandTotal = productsTotal + shippingCost;     // productos + envío = lo que paga

  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString()
    : "No disponible";

  return (
    <div className="order-confirmation">
      <div className="order-confirmation-content">
        <div className="confirmation-icon">
          <Icon name="check-circle" size={48} color="#4CAF50" />
        </div>
        <h1 className="order-confirmation-title">¡Gracias por tu compra!</h1>
        <p className="confirmation-message">
          Tu pedido <strong>#{order._id}</strong> ha sido confirmado y está
          siendo procesado.
        </p>

        <div className="confirmation-details">
          <h2>Detalles de tu pedido</h2>
          <div className="order-info">
            <p>
              <strong>Fecha: </strong>
              {orderDate}
            </p>

            <h3>Productos</h3>
            <ul className="order-products">
              {order.products?.length ? (
                order.products.map((item) => (
                  <li key={item.product._id} className="order-product">
                    <span>{item.product.name}</span>
                    <span>
                      ${item.unitPrice.toFixed(2)} x {item.quantity}
                    </span>
                  </li>
                ))
              ) : (
                <li className="order-product">
                  No hay productos en este pedido.
                </li>
              )}
            </ul>

            <div className="summary-line">
              <span>Subtotal (sin IVA)</span>
              <span>${subtotalSinIva.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>IVA incluido (16%)</span>
              <span>${ivaIncluido.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Envío</span>
              <span>
                {shippingCost === 0 ? "Gratis" : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <p className="delivery-estimate">
              Entrega estimada:{" "}
              {new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000,
              ).toLocaleDateString()}
            </p>

            <div className="address-info">
              <p>
                <strong>Dirección de envío:</strong>
              </p>
              <p>
                {order.address?.address}, {order.address?.city},{" "}
                {order.address?.state}
              </p>
              <p>
                CP {order.address?.postalCode} · {order.address?.country}
              </p>
            </div>
          </div>

          <p className="confirmation-note">
            Guarda el número de tu pedido para cualquier consulta.
          </p>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="button primary">
            <Icon name="home" size={20} />
            <span>Volver al inicio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
