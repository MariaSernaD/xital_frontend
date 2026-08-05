import { useState, useEffect } from "react";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import "./AddressForm.css";

export default function AddressForm({
  onSubmit,
  onCancel,
  initialValues = {},
  isEditMode = false,
}) {
  const [formData, setFormData] = useState({
    name: initialValues.name || "",
    address: initialValues.address || "",
    city: initialValues.city || "",
    state: initialValues.state || "",
    postalCode: initialValues.postalCode || "",
    country: initialValues.country || "",
    phone: initialValues.phone || "",
    isDefault: initialValues.isDefault || false,
    addressType: initialValues.addressType || "home",
  });
  
  /**useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      setFormData({
        name: "",
        address1: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        reference: "",
        default: false,
        ...initialValues,
      });
    }
  }, [initialValues]); */
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

 
  return (
    <form onSubmit={handleSubmit} className="address-form">
      <h3>{isEditMode ? "Editar dirección" : "Nueva Dirección"}</h3>

      <Input
        label="Nombre de la dirección"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <Input
        label="Dirección"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />

      <Input
        label="Ciudad"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
      />

      <Input
        label="Estado"
        name="state"
        value={formData.state}
        onChange={handleChange}
        required
      />

      <Input
        label="Código Postal"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
        required
      />

      <Input
        label="País"
        name="country"
        value={formData.country}
        onChange={handleChange}
        required
      />

      <Input
        label="Número de teléfono"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <div className="form-address-select">
        <label htmlFor="addressType">Tipo de dirección</label>
        <select
          name="addressType"
          id="addressType"
          value={formData.addressType}
          onChange={handleChange}
        >
          <option value="home">Casa</option>
          <option value="work">Trabajo</option>
          <option value="other">Otro</option>
        </select>
      </div>
      <div className="form-checkbox">
        <input
          type="checkbox"
          name="isDefault"
          checked={formData.isDefault}
          onChange={handleChange}
          id="defaultAddress"
        />
        <label htmlFor="defaultAddress">
          Establecer como dirección predeterminada
        </label>
      </div>

      <div className="form-actions">
        <Button type="submit" className="btn-agregar-direccion">
          {isEditMode ? "Guardar Cambios" : "Agregar Dirección"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="btn-cancel"
          >
            Volver atrás
          </Button>
        )}
      </div>
    </form>
  );
}
