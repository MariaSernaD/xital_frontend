import apiClient from "./apiClient";

//GET /cart  →  todos los carritos de compra (solo admin)
const getCarts = async () => {
  const response = await apiClient.get("/cart");
  return response.data;
};

//GET /cart/user  →  solo el carrito por usuario
// message: "Tu carrito está vacío aún, explora nuestras tinturas", esto irá acorde a la function  del useCart : isCartEmpty y mostrara un cart-empty-container en la página del DisplayCart, así que no será necesario colocar un msg aquí.
const getCartByUser = async (products) => {
  try {
    const response = await apiClient.get("/cart/user");
    return response.data;
  }catch (error){
    if(error.kind === "NOT FOUND"){
      return {products: []};
    }
    throw error;
  }
};

//POST /cart/product  →  crea un carrito por agregar un producto
const addProductToCart = async (productId, quantity) => {
  const response = await apiClient.post("/cart/product", {
    product: productId,
    quantity,
  });
  return response.data;
};

//PUT /cart/product  →  modifica cantidades de producto en el carrito
const updateCart = async (productId, quantity) => {
  const response = await apiClient.put("/cart/product", {
    product: productId,
    quantity,
  });
  return response.data;
};

//DELETE /cart/product/:productId →  elimina producto del carrito
const deleteProductFromCart = async ( productId ) => {
  const response = await apiClient.delete(`/cart/product/${productId}`);
  return response.data;
};

//DELETE /cart/clear → limpia el carrito, pero no se elimina por completo
const clearCart = async () => {
  const response = await apiClient.delete("/cart/clear");
  return response.data;
};

export {
  getCarts,
  getCartByUser,
  addProductToCart,
  updateCart,
  deleteProductFromCart,
  clearCart,
};
