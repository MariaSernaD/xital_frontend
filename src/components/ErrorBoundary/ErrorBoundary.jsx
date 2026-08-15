import { Component } from "react";
import { logEvent } from "../../services/logService";

/**
 * Único componente de clase del proyecto. React exige una clase para un error
 * boundary: getDerivedStateFromError y componentDidCatch no tienen equivalente
 * con hooks. Es una excepción consciente al patrón de la sección 5.6 de CLAUDE.md.
 *
 * Props:
 *  - name: identifica el boundary en el log (global, catalog, cart, checkout)
 *  - fallback: qué renderizar cuando el subárbol revienta
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  //Se ejecuta durante el render: solo cambia el estado, sin efectos secundarios.
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  //Se ejecuta después del render fallido: aquí sí se puede reportar.
  componentDidCatch(error, errorInfo) {
    logEvent("error", "react_error_boundary", error?.message, {
      boundary: this.props.name,
      componentStack: errorInfo?.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
