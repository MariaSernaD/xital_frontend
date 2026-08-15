import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressManager from "../../components/organism/AddressManager/AddressManager";
import PaymentManager from "../../components/organism/PaymentMethodManager/PaymentManager";
import CartView from "../../components/organism/CartView/CartView";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/orderService";
import { logEvent } from "../../services/logService";
import Loading from "../../components/atoms/Loading/Loading";
import ErrorMessage from "../../components/atoms/ErrorMessage/ErrorMessage";
import Button from "../../components/atoms/Button/Button";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import { CheckoutFallback } from "../../components/ErrorBoundary/ErrorFallbacks";
import "./Checkout.css";

export default function Checkout() {
  const { loading, totalPrice, cart, emptyCart } = useCart();
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [orderError, setOrderError] = useState(null);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };
  const handlePaymentMethodSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const productsTotal = totalPrice; // 1810 — precio real, IVA incluido
  const ivaIncluido = productsTotal - productsTotal / 1.16; // cuánto IVA ya está dentro (desglose)
  const subtotalSinIva = productsTotal / 1.16; // el precio sin IVA (informativo)
  const shippingCost = productsTotal >= 2000 ? 0 : 200; // el umbral se evalúa sobre el precio real
  const grandTotal = productsTotal + shippingCost; // productos + envío (NO sumas IVA)

  const handleCreateOrder = async () => {
    try {
      setOrderError(null);
      const orderData = {
        products: cart.products.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        address: selectedAddress._id,
        paymentMethod: selectedPayment._id,
        totalPrice: productsTotal,
        shippingCost: shippingCost,
      };

      const newOrder = await createOrder(orderData);
      await emptyCart();
      navigate(`/order-confirmation/${newOrder._id}`);
    } catch (error) {
      setOrderError(error.kind ?? "SERVER_ERROR");
      logEvent("error", "create_order_failed", error.kind, {
        kind: error.kind,
        status: error.status,
      });
    }
  };

  if (loading)
    return (
      <Loading className="checkout-loading">
        Cargando tu información de compra...
      </Loading>
    );

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Finaliza tu compra </h1>
      <ErrorBoundary name="checkout" fallback={<CheckoutFallback />}>
        <div className="checkout-layout">
          <div className="checkout-left">
            <section className="checkout-section">
              <h3>1. Dirección de envío</h3>
              <AddressManager
                selectable
                selectedId={selectedAddress?._id}
                onSelect={setSelectedAddress}
              />
            </section>

            <section className="checkout-section">
              <h3>2. Método de pago</h3>
              <PaymentManager
                selectable
                selectedId={selectedPayment?._id}
                onSelect={setSelectedPayment}
              />
            </section>

            <section className="checkout-section">
              <h3>3. Tus tinturas</h3>
              <CartView />
            </section>
          </div>

          <aside className="checkout-summary">
            <h3>Resumen de la orden</h3>
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
            {orderError && (
              <ErrorMessage>
                No pudimos crear tu orden. Tu compra no se cobró; vuelve a
                intentarlo.
              </ErrorMessage>
            )}
            <Button
              className="btn-confirm-order"
              variant="primary"
              disabled={
                !selectedAddress || !selectedPayment || !cart?.products?.length
              }
              onClick={handleCreateOrder}
            >
              Confirmar y pagar
            </Button>
          </aside>
        </div>
      </ErrorBoundary>
    </div>
  );
}
