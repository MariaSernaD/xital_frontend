import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./HeaderLayoutCarousel.css";

const relevantInfo = [
  { texto: "¡Envio GRATIS en compras mayores a $2000 MXN!" },
  { texto: "🍄‍🟫 15% DESCUENTO si te suscribes y compras ahora mismo" },
  { texto: "20% en la compra de 3 productos iguales ⚡" },
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
        <ChevronLeft size={16} />
      </button>
      <p>{relevantInfo[currentIndex].texto}</p>
      <button className="carousel-btn carousel-btn--next" onClick={next}>
         <ChevronRight size={16} />
      </button>
    </div>
  );
}
