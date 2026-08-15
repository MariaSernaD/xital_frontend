import { useEffect, useState } from "react";
import { getAllProducts } from "../../../services/productsService";
import { logEvent } from "../../../services/logService";
import Loading from "../../atoms/Loading/Loading";
import ErrorMessage from "../../atoms/ErrorMessage/ErrorMessage";
import ProductCard from "../../molecules/ProductCard/ProductCard";
import "./ProductsCatalog.css"

export default function ProductsCatalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        setError(error.kind || "UNKNOWN");
        logEvent("error", "load_products_failed", error.kind, {
          kind: error.kind,
          status: error.status,
          component: "ProductsCatalog",
        });
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) return <Loading>Cargando catálogo completo</Loading>;

  if (error) {
    return (
      <div className="products-page-container">
        <ErrorMessage message={error}>
          {error === "NETWORK_ERROR" || error === "TIMEOUT" ? (
            <p>
              No pudimos conectar con el servidor. Revisa tu conexión a internet.
            </p>
          ) : (
            <p>No pudimos cargar el catálogo. Intenta más tarde.</p>
          )}
        </ErrorMessage>
      </div>
    );
  }

  return (
    <div className="products-page-container">
      <header className="products-page-header">
        <h2>Nuestro Catálogo completo</h2>
        <p>
          Explora todas nuestras tinturas disponibles para ti y elige la que más
          se adapte a lo que buscas hoy, puedes combinarlas o probar nuestro mix
          de tinturas. 
        </p>
      </header>
      <div className="catalog-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
