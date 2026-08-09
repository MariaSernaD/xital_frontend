import { useState } from "react";
import AddressManager from "../../components/organism/AddressManager/AddressManager";
import PaymentManager from "../../components/organism/PaymentMethodManager/PaymentManager";
import CartView from "../../components/organism/CartView/CartView";
import "./Checkout.css";


export default function Checkout() {
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);

    const handleAddressSelect = (addressId) => {
        setSelectedAddressId(addressId);
    };
    const handlePaymentMethodSelect = (paymentMethodId) => {
        setSelectedPaymentMethodId(paymentMethodId);
    };

    return(
        <div className="checkout-container">
            <h3 className="checkout-title">¡Tu compra está a punto de completarse!</h3>
            <div className="checkout-content">
                <h4 className="checkout-subtitle">Dirección de envío</h4>
                <AddressManager selectable selectedId={selectedAddressId} onSelect={handleAddressSelect} />
                <h4 className="checkout-subtitle">Método de pago</h4>
                <PaymentManager selectable selectedId={selectedPaymentMethodId} onSelect={handlePaymentMethodSelect} />
                <h4 className="checkout-subtitle">Resumen de tu compra</h4>
                <CartView></CartView>
            </div>
        </div>
    )
};