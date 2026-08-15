import { Link } from "react-router-dom";
import { AlertTriangle, RotateCcw, ShoppingCart, Store } from "lucide-react";
import Button from "../atoms/Button/Button";
import "./ErrorBoundary.css";

//Fallback global: cubre toda la app, así que la única salida segura es recargar.
export function GlobalFallback() {
  return (
    <div className="error-boundary-fallback error-boundary-global">
      <AlertTriangle size={40} className="error-boundary-icon" />
      <h2>Algo se rompió de nuestro lado</h2>
      <p>
        No es culpa tuya. Ya registramos el error para poder revisarlo; intenta
        recargar la página.
      </p>
      <Button variant="primary" onClick={() => window.location.reload()}>
        <RotateCcw size={18} /> Recargar la página
      </Button>
    </div>
  );
}

//Fallback del catálogo: el header, el footer y el resto de la página siguen vivos.
export function CatalogFallback() {
  return (
    <div className="error-boundary-fallback">
      <AlertTriangle size={32} className="error-boundary-icon" />
      <h2>No pudimos mostrar el catálogo</h2>
      <p>Nuestras tinturas siguen aquí, solo que ahora mismo no las alcanzamos.</p>
      <Link to="/" className="error-boundary-link">
        <Store size={18} /> Volver al inicio
      </Link>
    </div>
  );
}

//Fallback del carrito: lo importante es que nadie crea que perdió sus productos.
export function CartFallback() {
  return (
    <div className="error-boundary-fallback">
      <AlertTriangle size={32} className="error-boundary-icon" />
      <h2>No pudimos mostrar tu carrito</h2>
      <p>
        <strong>Tus productos siguen guardados.</strong> Es un problema al
        mostrarlos, no al guardarlos.
      </p>
      <Link to="/products" className="error-boundary-link">
        <Store size={18} /> Seguir explorando
      </Link>
    </div>
  );
}

//Fallback del checkout: aquí hay dinero de por medio, hay que decirlo explícito.
export function CheckoutFallback() {
  return (
    <div className="error-boundary-fallback">
      <AlertTriangle size={32} className="error-boundary-icon" />
      <h2>No pudimos cargar el checkout</h2>
      <p>
        <strong>Tu compra no se cobró.</strong> Vuelve al carrito y vuelve a
        intentarlo desde ahí.
      </p>
      <Link to="/cart" className="error-boundary-link">
        <ShoppingCart size={18} /> Volver al carrito
      </Link>
    </div>
  );
}
