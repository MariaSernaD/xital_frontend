import { useState } from "react";
import usePaymentMethods from "../../../hooks/usePaymentMethods";
import Loading from "../../atoms/Loading/Loading";
import Button from "../../atoms/Button/Button";
import PaymentMethodForm from "../PaymentMethodForm/PaymentMethodForm";
import Icon from "../../atoms/Icon/Icon";
import { Pencil } from "lucide-react";
import "./PaymentManager.css";

export default function PaymentManager({
  selectable = false,
  selectedId,
  onSelect,
}) {
  const {
    paymentMethods,
    loading,
    addPaymentMethod,
    removePaymentMethod,
    updatingPaymentMethod,
  } = usePaymentMethods();

  const [showForm, setShowForm] = useState(false);
  const [editingPaymentMethod, setEditingPaymentMethod] = useState(null);

  const handleFormSubmit = async (data) => {
    if (editingPaymentMethod) {
      await updatingPaymentMethod(editingPaymentMethod._id, data);
    } else {
      await addPaymentMethod(data);
    }
    setShowForm(false);
    setEditingPaymentMethod(null);
  };

  const handleEdit = (paymentMethods) => {
    setEditingPaymentMethod(paymentMethods);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingPaymentMethod(null);
    setShowForm(true);
  };

  if (loading)
    return (
      <Loading className="payment-loading">Cargando métodos de pago...</Loading>
    );

  return (
    <div className="payment-manager">
      {paymentMethods.length === 0 && !showForm && (
        <p className="payment-empty">No tienes métodos de pago agregados.</p>
      )}
      <div className="payment-list">
        {paymentMethods.map((payment) => (
          <div
            key={payment._id}
            className={`payment-item ${selectedId === payment._id ? "selected" : ""}`}
            onClick={selectable ? () => onSelect(payment) : undefined}
          >
            {selectable && (
              <input
                type="radio"
                name="payment-method"
                checked={selectedId === payment._id}
                onChange={() => onSelect && onSelect(payment)}
              />
            )}
            <div className="payment-details">
              <div className="payment-type-container">
                <strong className="payment-type">{payment.bankName}</strong>
                {payment.isDefault && (
                  <span className="payment-default">Predeterminado</span>
                )}
                <span className="payment-type-badge">{payment.type}</span>
              </div>
              <p className="payment-card-number">
                **** **** **** {payment.cardNumber?.slice(-4) || "****"}
              </p>
              <p className="payment-card-holder">{payment.cardHolderName}</p>
            </div>
            <div className="payment-actions">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(payment)}
              >
                <Pencil size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removePaymentMethod(payment._id)}
              >
                <Icon name="trash" size={10}></Icon>
              </Button>
            </div>
          </div>
        ))}
      </div>
      {showForm ? (
        <PaymentMethodForm
          initialValues={editingPaymentMethod || {}}
          isEditMode={!!editingPaymentMethod}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingPaymentMethod(null);
          }}
        />
      ) : (
        <Button
          variant="primary"
          className="payment-add-button"
          onClick={handleAddNew}
        >
          <Icon name="plus" size={16} />
          Agregar método de pago
        </Button>
      )}
    </div>
  );
}
