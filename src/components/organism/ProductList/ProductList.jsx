import { useState, useEffect } from "react";
import ProductCard from "../../molecules/ProductCard/ProductCard";
import Loading from "../../atoms/Loading/Loading";
import { getAllProducts } from "../../../services/productsService";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllProducts();
        console.log("data que llega:", data);
        console.log("es array?:", Array.isArray(data));
        setProducts(data);
      } catch (err) {
        setError(err.kind || "UNKNOWN");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="product-list-container">
      <h4 className="product-list-title">Nuestras tinturas</h4>
      {loading ? (
        <Loading message="Cargando productos..." />
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
