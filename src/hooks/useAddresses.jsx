import {  useState, useEffect } from "react";
import { getAddresses, createAddress, deleteAddress, updateAddress} from "../services/addressService";

export default function useAddresses() {

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => { loadAddresses(); }, []);

  const loadAddresses = async () => {
    // Implementation for loading addresses
    try {
      const fetchedAddresses = await getAddresses();
      setAddresses(fetchedAddresses);
      setLoading(true);
    } catch (error) {
      setError(error);
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

/**addresses, loading, error         (estado)
loadAddresses()                    (trae del backend)
addAddress(data)                   (crea)
removeAddress(id)                  (elimina) */
