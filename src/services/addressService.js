import apiClient from "./apiClient";

//GET /address  →  todos los addresses de un usuario
const getAddresses = async ()=>{
    const response = await apiClient.get("/address");
    return response.data;
};

//GET /address/:id  →  address por id
const getAddressById = async (id)=>{
    const response = await apiClient.get(`/address/${id}`);
    return response.data;
};

//POST /address  → el usuario crea una dirección de envío
const createAddress = async(data)=>{
    const response = await apiClient.post("/address", data);
    return response.data;
};


//PUT /address/:id → edición de una dirección de envío
const updateAddress = async (id, data)=>{
    const response = await apiClient.put(`/address/${id}`, data);
    return response.data;
};

//DELETE /address/:id → borrar una dirección de envío
const deleteAddress = async (id) => {
    const response = await apiClient.delete(`/address/${id}`);
    return response.data;
}

export {getAddresses, getAddressById, createAddress, updateAddress, deleteAddress};