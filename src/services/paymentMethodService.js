import apiClient from "./apiClient";

//GET /payment-method  →  todos los métodos de pago de un usuario
const getPaymentMethods = async () => {
  const response = await apiClient.get("/payment-method");
  return response.data;
};

//GET /payment-method/:id → obtener un método de pago por usuario
const getPaymentMethodById = async (id) => {
  const response = await apiClient.get(`/payment-method/${id}`);
  return response.data;
};

//POST /payment-method → agregar un método de pago
const createPaymentMethod = async (data) => {
  const response = await apiClient.post("/payment-method", data);
  return response.data;
};

//PUT /payment-method/:id → actualizar un método de pago
const updatePaymentMethod = async (id, data) => {
  const response = await apiClient.put(`/payment-method/${id}`, data);
  return response.data;
};

//DELETE /payment-method/:id → borrar un método de pago
const deletePaymentMethod = async (id) => {
  const response = await apiClient.delete(`/payment-method/${id}`);
  return response.data;
};

export {
  getPaymentMethods,
  getPaymentMethodById,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
};
/*
getPaymentMethods() → GET /payment-method
getPaymentMethodById(id) → GET /payment-method/:id
createPaymentMethod(data) → POST (¡con el data!)
updatePaymentMethod(id, data) → PUT (¡con el data!)
deletePaymentMethod(id) → DELETE*/
