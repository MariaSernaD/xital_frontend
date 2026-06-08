import apiClient from "./apiClient";

export async function getAllProducts() {
    const response = await apiClient.get("/products");
    console.log(response.data);
    return response.data;
};

export async function getProductById(id, signal) {
    const response = await apiClient.get(`/products/${id}`, {signal});
    console.log(response.data);
    return response.data;
};
