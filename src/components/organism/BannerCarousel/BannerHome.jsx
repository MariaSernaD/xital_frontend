import "./BannerHome.css";

export default function BannerHome() {
  return (
    <div className="banner-container-home">
      <img
        src="/imagenes/BannerCarouselHome/banner-products.png"
        alt="Banner Products"
        className="banner-image"
      />
      <div className="banner-text">
        <h3 className="title-text">Descubre el poder de los hongos</h3>
      </div>
    </div>
  );
}
