import apiClient from "./apiClient";

export async function getAllProducts() {
  const response = await apiClient.get("/products");
  console.log(response.data);
  return response.data.products;
}

export async function getProductById(id, signal) {
  const response = await apiClient.get(`/products/${id}`, { signal });
  console.log(response.data);
  return response.data;
}

export async function searchProducts(filters = {}) {
  const params = {};
  if (filters.q) params.q = filters.q;
  if (filters.category) params.category = filters.category;
  if (filters.minUnitPrice != null && !Number.isNaN(filters.minUnitPrice)) {
    params.minUnitPrice = filters.minUnitPrice;
  }
  if (filters.maxUnitPrice != null && !Number.isNaN(filters.maxUnitPrice)) {
    params.maxUnitPrice = filters.maxUnitPrice;
  }
  if (typeof filters.inStock === "boolean") params.inStock = filters.inStock;
  if (filters.fungus) params.fungus = filters.fungus;
  if (filters.volume) params.volume = filters.volume;
  if (filters.sort) params.sort = filters.sort;
  if (filters.order) params.order = filters.order;
  
  const response = await apiClient.get(`/products/search`, {params});
  return response.data;
}

export async function createProduct(data) {
  const response = await apiClient.post("/products", data);
  return response.data;
}

export async function updateProduct(id, data) {
  const response = await apiClient.put(`/products/${id}`, data);
  return response.data;
}

export async function deleteProduct(id, data) {
  const response = await apiClient.delete(`/products/${id}`, data);
}
