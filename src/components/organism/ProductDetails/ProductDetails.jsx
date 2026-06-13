import { useEffect, useState } from "react";
import { getProductById } from "../../../services/productsService";
import { Link } from "react-router-dom";
import ErrorMessage from "../../atoms/ErrorMessage/ErrorMessage";
import Badge from "../../atoms/Badge/Bagde";
import ProductImageGallery from "../../molecules/ProductImageGallery/ProductImageGallery";

export default function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(productId, controller.signal);
        setProduct(data);
      } catch (err) {
        if (
          err.code === "ERR_CANCELED" ||
          err.original?.name === "CanceledError"
        ) {
          return;
        }
        setError(err.kind || "UNKNOWN");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
    return () => {
      controller.abort();
    };
  }, [productId]);

  if (loading) return <ProductDetailSkeleton />;
  //Errores
  //1.Producto no encontrado
  if (error === "NOT FOUND") {
    return (
      <div className="product-details-container">
        <ErrorMessage message={error}>
          <h2>Producto no encontrado</h2>
          <p className="muted">
            Revisa nuestra <Link to="/">página principal</Link> o explora otras
            categorías
          </p>
        </ErrorMessage>
      </div>
    );
  }

  //2.Error en la conexión con el servidor
  if (error === "NETWORK" || error === "TIMEOUT") {
    return (
      <div className="product-details-container">
        <ErrorMessage message={error}>
          <h2>No pudimos conectar con el servidor</h2>
          <p className="muted">
            Revisa tu conexión a internet{" "}
            <button onClick={() => window.location.reload()}>Reintentar</button>
          </p>
        </ErrorMessage>
      </div>
    );
  }

  //3. Error del servidor
  if (error === "SERVER") {
    return (
      <div className="product-details-container">
        <ErrorMessage message={error}>
          <h2>Algo salió mal de nuestro lado.</h2>
          <p className="muted">
            Estamos trabajando en ello, intenta volver más tarde...
          </p>
        </ErrorMessage>
      </div>
    );
  }
  //4. Error desconocido
  if (error) {
    return (
      <div className="product-details-container">
        <ErrorMessage message={error}>
          <p className="muted">Ocurrió un error inesperado</p>
        </ErrorMessage>
      </div>
    );
  }

  if (!product) return null;
  const {
    name,
    description,
    unitPrice,
    stock,
    imageURL,
    fungus,
    volume,
    category,
  } = product;
  const stockBadge = stock > 0 ? "success" : "error";
  const stockLabel = stock > 0 ? "En stock" : "Agotado";

  return (
    <section className="product-details-container">
        {/*-Left gallery-*/}
        <div className="product-image-container">
          <ProductImageGallery />
        </div>
        {/*-Right details- */}
        <div className="product-details">
          {/* category and tags row*/}
          <div className="product-category">
            <Badge
              text={category?.name ?? "Categoría no especificada"}
              variant="primary"
            />
            <Badge text={volume} variant="primary" />
            {product.stockLabel && (
              <Badge text={stockLabel} variant={stockBadge} />
            )}
          </div>
          {/*-Title-*/}
          <div className="product-title">
            <h1>{name}</h1>
            <p className="product-descripction">{description}</p>
          </div>
        </div>
    </section>
  );
}
function ProductDetailSkeleton() {
  return (
    <div className="max-w-2x1 mx-auto p-6 animate-pulse">
      <div className="bg-gray-200 h-80 mb-4 rounded"></div>
      <div className="bg-gray-200 h-8  w-3/4 mb-2 rounded"></div>
      <div className="bg-gray-200 h-6 w-1/4 rounded"></div>
    </div>
  );
}
