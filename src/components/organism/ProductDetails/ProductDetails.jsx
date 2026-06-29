import { useEffect, useState } from "react";
import { getProductById } from "../../../services/productsService";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../atoms/ErrorMessage/ErrorMessage";
import Badge from "../../atoms/Badge/Bagde";
import ProductImageGallery from "../../molecules/ProductImageGallery/ProductImageGallery";
import { Divider } from "../../atoms/Divider/Divider";
import { Leaf, Droplets, ShoppingCart, Heart, Share2 } from "lucide-react";
import Button from "../../atoms/Button/Button";
import "./ProductDetails.css";

export default function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
  const stockLabel = stock > 0 ? `En stock (${stock} unidades)` : "Agotado";

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
            className="category-badge"
          />
          <Badge text={volume} variant="primary" className="category-badge" />
          {product.stockLabel && (
            <Badge text={stockLabel} variant={stockBadge} />
          )}
        </div>
        {/*-Title-*/}
        <div className="product-title">
          <h1>{name}</h1>
          <p className="product-description">{description}</p>
        </div>

        <Divider />

        {/* Price */}
        <div className="product-price">
          <p className="price-muted">Precio Unitario</p>
          <p className="unitPrice">{`$${unitPrice.toFixed(2)}`}</p>
          <p className="text-muted">IVA incluido</p>
        </div>

        {/*Product meta details */}
        <div className="grid">
          <div className="meta-container">
            <Leaf className="leaf" size={12} color="grey" />
            <div className="meta-fungus">
              <span className="tags">Hongo</span>
              <span className="meta-tags">{fungus}</span>
            </div>
          </div>
          <div className="meta-container">
            <Droplets className=" droplets" size={12} color="grey" />
            <div className="meta-volume">
              <span className="tags">Volumen</span>
              <span className="meta-tags">{volume}</span>
            </div>
          </div>
        </div>

        {/*stock indicator */}
        <div className="stockBadge">
          <p>{stockLabel}</p>
        </div>

        <Divider />

        {/*actions*/}
        <div className="actions-container">
          <Button
            variant="primary"
            size="lg"
            fullwidth
            disabled={stock === 0}
            onClick={() => alert("Producto agregado al carrito")}
          >
            <ShoppingCart /> Agregar al carrito
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => alert("Agregado a tu wishlist")}
          >
            <Heart />
          </Button>
          <Button variant="ghost" size="lg">
            <Share2 />
          </Button>
        </div>

        <Divider />

        <div className="back-container">
          <Button variant="ghost" size="base" onClick={()=> navigate("/")}>
            Volver al inicio
          </Button>
          <Button variant="ghost" size="base" onClick={()=> navigate("/products")}>
            Regresar a productos
          </Button>
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
