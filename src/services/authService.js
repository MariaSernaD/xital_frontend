import apiClient from "./apiClient";

/**
 * @param {Object} data
 * @param {string} data.name        Requerido
 * @param {string} data.email       Requerido
 * @param {string} data.password    Requerido
 * @returns {Promise<Object>}       Usuario registrado (SIN token)
 */

const register = async (data) => {
  const payload = {
    name: data.name?.trim(),
    email: data.email?.trim().toLowerCase(),
    password: data.password,
  };
  const response = await apiClient.post("/auth/register", payload);
  return response.data;
};

/**
 * @param {Object} credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @returns {Promise<{token:string,refreshToken:string}>}
 */

const login = async (credentials) => {
  const payload = {
    email: credentials.email?.trim().toLowerCase(),
    password: credentials.password,
  };
  const response = await apiClient.post("/auth/login", payload);
  return {
    token: response.data.token,
    refreshToken: response.data.refreshToken,
  };
};

export {register, login};
