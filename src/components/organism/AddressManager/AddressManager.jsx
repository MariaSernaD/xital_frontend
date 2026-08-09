import { useState } from "react";
import useAddresses from "../../../hooks/useAddresses";
import AddressForm from "../AddressForm/AddressForm";
import Loading from "../../atoms/Loading/Loading";
import Button from "../../atoms/Button/Button";
import Icon from "../../atoms/Icon/Icon";
import { Pencil } from "lucide-react";
import "./AddressManager.css";


export default function AddressManager({
  selectable = false,
  selectedId,
  onSelect,
}) {
  const { addresses, loading, addAddress, removeAddress, updatingAddress } =
    useAddresses();

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleFormSubmit = async (data) => {
    if (editingAddress) {
      await updatingAddress(editingAddress._id, data);
    } else {
      await addAddress(data);
    }
    setShowForm(false);
    setEditingAddress(null);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

    if (loading)
      return (
        <Loading className="address-loading">Cargando direcciones...</Loading>
      );

  return (
    <div className="address-manager">
      {/* Lista de direcciones */}
      {addresses.length === 0 && !showForm && (
        <p className="address-empty">Aún no tienes direcciones guardadas.</p>
      )}

      <div className="address-list">
        {addresses.map((addr) => (
          <div
            key={addr._id}
            className={`address-card ${selectable && selectedId === addr._id ? "selected" : ""}`}
            onClick={selectable ? () => onSelect(addr) : undefined}
          >
            {selectable && (
              <input
                type="radio"
                name="selectedAddress"
                checked={selectedId === addr._id}
                onChange={() => onSelect(addr)}
              />
            )}

            <div className="address-info">
              <div className="address-name-row">
                <strong>{addr.name}</strong>
                {addr.isDefault && (
                  <span className="address-default-badge">Predeterminada</span>
                )}
                <span className="address-type-badge">{addr.addressType}</span>
              </div>
              <p>{addr.address}</p>
              <p>
                {addr.city}, {addr.state}, CP {addr.postalCode}
              </p>
              <p>
                {addr.country} · Tel: {addr.phone}
              </p>
            </div>

            <div className="address-actions">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(addr)}
              >
                <Pencil size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="address-remove"
                onClick={() => removeAddress(addr._id)}
              >
                <Icon name="trash" size={10} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {showForm ? (
        <AddressForm
          initialValues={editingAddress || {}}
          isEditMode={!!editingAddress}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingAddress(null);
          }}
        />
      ) : (
        <Button
          variant="primary"
          className="btn-add-address"
          onClick={handleAddNew}
        >
          <Icon name="plus" size={16} /> Agregar nueva dirección
        </Button>
      )}
    </div>
  );
}
