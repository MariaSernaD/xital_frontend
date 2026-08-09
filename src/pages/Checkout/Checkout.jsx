import { useState } from "react";
import AddressManager from "../../components/organism/AddressManager/AddressManager";
import PaymentManager from "../../components/organism/PaymentMethodManager/PaymentManager";
import CartView from "../../components/organism/CartView/CartView";
import { useCart } from "../../context/cartContext";
import Loading from "../../components/atoms/Loading/Loading";
import Button from "../../components/atoms/Button/Button";
import "./Checkout.css";

export default function Checkout() {
  const { loading, totalPrice, cart } = useCart();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };
  const handlePaymentMethodSelect = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  const handleCreateOrder = () => {
  console.log("Crear orden:", { selectedAddress, selectedPayment, cart });
};

  const subtotal = totalPrice;
  const taxAmount = subtotal * 0.16; // IVA 16%
  const shippingCost = subtotal >= 2000 ? 0 : 200; // gratis arriba de $2000 (promo del carousel)
  const grandTotal = subtotal + taxAmount + shippingCost;

  if (loading)
      return (
        <Loading className="checkout-loading">Cargando tu información de compra...</Loading>
      );

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Finaliza tu compra </h1>
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
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>IVA (16%)</span>
            <span>${taxAmount.toFixed(2)}</span>
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
          <Button
            className="btn-confirm-order"
            variant="primary"
            disabled={
              !selectedAddress || !selectedPayment || !cart?.products?.length
            }
            onClick={(handleCreateOrder)}
          >
            Confirmar y pagar
          </Button>
        </aside>
      </div>
    </div>
  );
}
