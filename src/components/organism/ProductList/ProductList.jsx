import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../molecules/ProductCard/ProductCard";
import Loading from "../../atoms/Loading/Loading";
import Button from "../../atoms/Button/Button";
import ErrorMessage from "../../atoms/ErrorMessage/ErrorMessage";
import { getAllProducts } from "../../../services/productsService";
import { logEvent } from "../../../services/logService";
import { FlaskConical, MousePointerClick } from "lucide-react";
import "./ProductList.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err.kind || "UNKNOWN");
        logEvent("error", "load_products_failed", err.kind, {
          kind: err.kind,
          status: err.status,
          component: "ProductList",
        });
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="product-list-container">
      {/* Left column: general information */}
      <div className="extract-info">
        <h4 className="product-list-heading">Nuestras tinturas</h4>

        <div className="extract-info-content">
          <div className="info-item">
            <p>
              Eleva tu bienestar con extractos puros y biológicamente
              disponibles.
            </p>
          </div>

          <div className="info-item">
            <FlaskConical size={18} color="#0D0614" />
            <p>Ultra concentrados 8:1 y 100% puros.</p>
          </div>

          <div className="info-item">
            <FlaskConical size={18} color="#0D0614" />
            <p>Estandarizados y verificados por laboratorios independientes.</p>
          </div>

          <div className="info-item">
            <FlaskConical size={18} color="#0D0614" />
            <p>
              Resultados reales: energía, claridad, sistema inmunitario y
              bienestar.
            </p>
          </div>
        </div>

        <div className="product-info-footer">
          <Button
            variant="primary"
            size="lg" 
            fullwidth 
            aria-label="Explorar catálogo completo"
            className="product-info-button"
            onClick={() => navigate("/products")}
          >
            Explorar catálogo <MousePointerClick size={18} />
          </Button>
        </div>
      </div>

      {/*Rigth column: products */}
      <div className="products-column">
        {loading ? (
          <Loading>Cargando productos...</Loading>
        ) : error ? (
          <ErrorMessage message={error}>
            {error === "NETWORK_ERROR" || error === "TIMEOUT" ? (
              <p>
                No pudimos conectar con el servidor. Revisa tu conexión a
                internet.
              </p>
            ) : (
              <p>No pudimos cargar las tinturas. Intenta más tarde.</p>
            )}
          </ErrorMessage>
        ) : (
          <div className="product-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
