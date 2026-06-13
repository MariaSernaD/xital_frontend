import { Link } from "react-router-dom";
import Button from "../../atoms/Button/Button";
import Badge from "../../atoms/Badge/Bagde";


export default function ProductCard({product}) {
  const {
    name,
    description,
    unitPrice,
    stock,
    imageURL,
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
      ? { text: "Disponible", variant: "success" }
      : { text: "Agotado", variant: "error" };
  const productLink = `/products/${product._id}`;

  return (
    <div className="principal-productCard">
      <div className="product-cards-fondoColor">
        <div className=" product-card">
          <a href={productLink}>
            <img
              src={imageURL ? imageURL[0] : "/imagenes/BannerCarouselProducts/Melena de Leon/melena-1.png"}
              alt={name}
              className="product-card-image"
            />
          </a>
          <div className="product-card-content">
            <h3 className="product-card-title">
              <a style={{ textDecoration: "none" }}>{name}</a>
            </h3>
            <p style={{ color: "grey" }}>
              {description
                ? description.length > 60
                  ? `${description.substring(0, 60)}...`
                  : description
                : "Sin descripción"}
            </p>
          </div>
          <div className="product-card-actions">
            <div className="product-card-price">${unitPrice}</div>
            <div className="badge-product-card">
              <Badge
                className={!stock ? "Agotado" : "Disponible"}
                text={stockBadge.text}
                variant={stockBadge.variant}
              >
                {stock > 0 ? "Disponible" : "Agotado"}
              </Badge>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="btn-product-card"
            disabled={stock === 0}
          >
            Agregar al carrito 🛒
          </Button>
        </div>
      </div>
    </div>
  );
}
