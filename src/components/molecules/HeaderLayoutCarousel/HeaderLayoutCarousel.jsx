import { useState, useEffect } from "react";

const relevantInfo = [
  { texto: "¡Envio GRATIS en compras mayores a $2000 MXN!" },
  { texto: "🍄‍🟫 15% DESCUENTO si te suscribes y compras ahora" },
  { texto: "20% en la compra de 3 productos iguales" },
];
export default function HeaderLayoutCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () =>
    setCurrentIndex((i) => (i === 0 ? relevantInfo.length - 1 : i - 1));
  const next = () =>
    setCurrentIndex((i) => (i === relevantInfo.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="header-carousel">
      <button className="carousel-btn carousel-btn--prev" onClick={prev}>
        &#8592;
      </button>
      <p>{relevantInfo[currentIndex].texto}</p>
      <button className="carousel-btn carousel-btn--next" onClick={next}>
        &#8594;
      </button>
    </div>
  );
}
