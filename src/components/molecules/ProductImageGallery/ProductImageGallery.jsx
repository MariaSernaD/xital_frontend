import { useState } from "react";
import "./ProductImageGallery.css";

const images = [
  "/imagenes/BannerCarouselProducts/Melena de Leon/melena-1.png",
  "/imagenes/BannerCarouselProducts/Melena de Leon/melena-2.png",
  "/imagenes/BannerCarouselProducts/Melena de Leon/melena-3.png",
];

export default function ProductImageGallery() {
  const [currentImage, setCurrentImage] = useState(0);

  const prev = () =>
    setCurrentImage((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setCurrentImage((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="gallery-container">
      {/* Imagen principal */}
      <div className="gallery-main">
        <button className="gallery-btn gallery-btn--prev" onClick={prev}>
          &#8592;
        </button>

        <img
          src={images[currentImage]}
          alt={`Producto vista ${currentImage + 1}`}
          className="gallery-img"
        />

        <button className="gallery-btn gallery-btn--next" onClick={next}>
          &#8594;
        </button>
      </div>

      {/* Thumbnails */}
      <div className="gallery-thumbs">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Vista ${i + 1}`}
            className={`gallery-thumb ${i === currentImage ? "gallery-thumb--active" : ""}`}
            onClick={() => setCurrentImage(i)}
          />
        ))}
      </div>
    </div>
  );
}
