import { useState } from "react";
import AddressManager from "../../components/organism/AddressManager/AddressManager";


export default function Checkout() {
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    const handleAddressSelect = (addressId) => {
        setSelectedAddressId(addressId);
    };

    return(
        <div className="checkout-container">
            <h3 className="checkout-title">¡Tu compra está a punto de completarse!</h3>
            <div className="checkout-content">
                <AddressManager selectable selectedId={selectedAddressId} onSelect={handleAddressSelect} />
            </div>
        </div>
    )
};