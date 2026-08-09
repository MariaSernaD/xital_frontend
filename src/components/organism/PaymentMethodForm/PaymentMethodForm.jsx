import { useState, useEffect } from "react";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import "./PaymentMethodForm.css";

export default function PaymentMethodForm({
  onSubmit,
  onCancel,
  initialValues = {},
  isEditMode = false,
}) {
  const [formData, setFormData] = useState({
    type: initialValues.type || "",
    cardNumber: initialValues.cardNumber || "",
    cardHolderName: initialValues.cardHolderName || "",
    expiryDate: initialValues.expiryDate || "",
    paypalEmail: initialValues.paypalEmail || "",
    bankName: initialValues.bankName || "",
    accountNumber: initialValues.accountNumber || "",
    isDefault: initialValues.isDefault || false,
    cvv: initialValues.cvv || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { cvv, ...dataToSend } = formData; // Excluye el campo cvv y deja todo lo demás por protección, regla de seguridad PCI-DSS
    onSubmit(dataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-method-form">
      <h3>{isEditMode ? "Editar método de pago" : "Agregar método de pago"}</h3>

      <div className="form-type-selection">
        <label htmlFor="type">Tipo de método de pago</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar tipo</option>
          <option value="credit_card">Tarjeta de crédito</option>
          <option value="debit_card">Tarjeta de débito</option>
          <option value="paypal">PayPal</option>
          <option value="bank_transfer">Transferencia bancaria</option>
        </select>
      </div>

      {(formData.type === "credit_card" || formData.type === "debit_card") && (
        <>
        <Input 
        label="Nombre del banco"
        name="bankName"
        value={formData.bankName}
        onChange={handleChange}
        placeholder="Nombre del banco"
        required
        />
          <Input
            label="Número de tarjeta"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}"
            placeholder="1234-5678-9012-3456"
            required
          />
          <Input
            label="Nombre del titular"
            type="text"
            name="cardHolderName"
            value={formData.cardHolderName}
            onChange={handleChange}
            required
          />
          <Input
            label="Fecha de vencimiento"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
            pattern="[0-9]{2}/[0-9]{2}"
            required
          />
          <Input
            label="CVV"
            type="password"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            maxLength="4"
            pattern="[0-9]{3,4}"
            required
          />
        </> //Aquí esta donde se cierra el fragmento de React para los campos de tarjeta de crédito/débito
      )}

      {formData.type === "paypal" && (
        <Input
          label="Correo electrónico de PayPal"
          type="email"
          name="paypalEmail"
          value={formData.paypalEmail}
          onChange={handleChange}
        />
      )}

      {formData.type === "bank_transfer" && (
        <>
          <Input
            label="Nombre del banco"
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            required
          />
          <Input
            label="Número de cuenta"
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            required
          />
        </>
      )}
      <div className="form-payment-checkbox">
        <label>
          <input
            type="checkbox"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
            id="isDefaultPayment"
          />
          Establecer este método de pago como predeterminado
        </label>
      </div>
      <div className="form-buttons">
        <Button type="submit" className="btn-payment-methody">
          {isEditMode ? "Actualizar método de pago" : "Agregar método de pago"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Volver atrás
          </Button>
        )}
      </div>
    </form>
  );
}
