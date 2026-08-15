import apiClient from "./apiClient";

//POST /logs  →  registra un evento estructurado en el backend
const logEvent = async (level, event, message, context = {}) => {
  try {
    await apiClient.post("/logs", {
      level,
      event,
      message: message || "Error sin mensaje",
      source: "frontend",
      context: {
        url: window.location.pathname,
        userAgent: navigator.userAgent,
        ...context,
      },
    });
  } catch {
    //Vacío a propósito: si el logging falla, la app sigue funcionando.
    //Aquí NO se puede llamar a logEvent: con el backend caído sería un bucle
    //infinito de peticiones.
  }
};

export { logEvent };
