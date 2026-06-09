import { Link } from "react-router-dom";
import Badge from "../../atoms/Badge/Bagde";


export default function ProductCard({ product }) {
  const {
    name,
    description,
    unitPrice,
    stock,
    imageUrl,
    fungus,
    volume,
    category,
  } = product || {};
  if (!product) {
    return (
      <div
        className="product-card"
        style={{ padding: "24px", textAlign: "center" }}
      >
        <p className="muted">
          Este producto no está disponible por el momento.
        </p>
      </div>
    );
  }
  const stockBadge =
    stock > 0
      ? { text: "En stock", variant: "success" }
      : { text: "Agotado", variant: "error" };
  const productLink = `/products/${product._id}`;

  return (
    <section className="product-details-container">
      <Link to= {productLink}>
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
      </Link>
    </section>
  );
}
