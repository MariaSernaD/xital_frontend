import axios from "axios";
import { getToken } from "../utils/auth";

//Incluye el /api: la variable es la base completa, así no hay que concatenar ni arriesgar /api/api.
const API_URL = import.meta.env.VITE_API_URL;

//Sin fallback a propósito: una URL de reserva escondería una configuración incorrecta.
if (!API_URL) {
  throw new Error("Falta configurar VITE_API_URL. Revisa .env.example");
}

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

//tipos de errores por si cae en alguno, si no señalar que es error del cliente
function classifyError(error) {
  if(error.name === "CanceledError" || error.code === "ERR_CANCELED") { 
    return { kind: "CANCELED", original: error };
  }
  if (error.response) {
    const status = error.response.status;
    if (status === 404) return { kind: "NOT FOUND", status, original: error };
    if (status === 401)
      return { kind: "UNAUTHORIZED", status, original: error };
    if (status === 403) return { kind: "FORBIDDEN", status, original: error };
    if (status === 422)
      return {
        kind: "VALIDATION",
        status,
        fields: error.response.data?.errors,
        original: error,
      };
    if (status === 500)
      return { kind: "SERVER_ERROR", status, original: error };
    return { kind: "CLIENT_ERROR", status, original: error };
  }
  //por alguna razón el servidor se cae
  if (error.code === "ECONNABORTED") {
    return { kind: "TIMEOUT", original: error };
  }
  //no se pudo alcanzar la conexion de red entre Front y Back
  if (error.request) {
    return { kind: "NETWORK_ERROR", original: error };
  }
  return { kind: "UNKNOWN", original: error };
}

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const classified = classifyError(error);
    if (classified.kind !== "CANCELED") {
      console.error(`[API ${classified.kind}]`, classified);
    }
    return Promise.reject(classified);
  },
);

export default apiClient;
