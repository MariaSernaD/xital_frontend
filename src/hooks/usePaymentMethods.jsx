import { useState, useEffect } from "react";
import {
  getPaymentMethods,
  createPaymentMethod,
  deletePaymentMethod,
  updatePaymentMethod,
} from "../services/paymentMethodService";

export default function usePaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  //cargar todos los métodos de pago del usuario(eso lo determina el backend)
  const loadPaymentMethods = async () => {
    try {
      setLoading(true);
      const fetchedPaymentMethods = await getPaymentMethods();
      setPaymentMethods(fetchedPaymentMethods);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addPaymentMethod = async (data) => {
    try {
      await createPaymentMethod(data);
      await loadPaymentMethods();
    } catch (error) {
      setError(error);
    }
  };

  const removePaymentMethod = async (id) => {
    try {
      await deletePaymentMethod(id);
      await loadPaymentMethods();
    } catch (error) {
      setError(error);
    }
  };

  const updatingPaymentMethod = async (id, data) => {
    try {
      await updatePaymentMethod(id, data);
      await loadPaymentMethods();
    } catch (error) {
      setError(error);
    }
  };

  return {
    paymentMethods,
    loading,
    error,
    loadPaymentMethods,
    addPaymentMethod,
    removePaymentMethod,
    updatingPaymentMethod,
  };
}
