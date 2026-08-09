import apiClient from "./apiClient";

//GET /orders → todos los orders de un usuario
const getOrders = async () => {
  const response = await apiClient.get("/orders");
  return response.data;
};

// GET /orders/:id → traer una orden de un usuario
const getOrderById = async (id) => {
  const response = await apiClient.get(`/orders/${id}`);
  return response.data;
};

//POST /orders → crear una orden por usuario
const createOrder = async (data) => {
  const response = await apiClient.post("/orders", data);
  return response.data;
};

//PUT /orders/:id → modificar una orden de compra
const updateOrder = async (id, data) => {
  const response = await apiClient.put(`/orders/${id}`, data);
  return response.data;
};

export { getOrders, getOrderById, createOrder, updateOrder };
