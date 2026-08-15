import { useState, useEffect } from "react";
import {
  getAddresses,
  createAddress,
  deleteAddress,
  updateAddress,
} from "../services/addressService";
import { logEvent } from "../services/logService";

export default function useAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    // Implementation for loading addresses
    try {
      setLoading(true);
      const fetchedAddresses = await getAddresses();
      setAddresses(fetchedAddresses);
    } catch (error) {
      setError(error);
      logEvent("error", "load_addresses_failed", error.kind, {
        kind: error.kind,
        status: error.status,
      });
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (data) => {
    // Implementation for adding address
    try {
      await createAddress(data);
      await loadAddresses();
    } catch (error) {
      setError(error);
    }
  };

  const removeAddress = async (id) => {
    // Implementation for removing address
    try {
      await deleteAddress(id);
      await loadAddresses();
    } catch (error) {
      setError(error);
    }
  };

  const updatingAddress = async (id, data) => {
    // cambios en el address
    try {
      await updateAddress(id, data);
      await loadAddresses();
    } catch (error) {
      setError(error);
    }
  };

  return {
    addresses,
    loading,
    error,
    loadAddresses,
    addAddress,
    removeAddress,
    updatingAddress,
  };
}
