import BannerHome from "../components/organism/BannerCarousel/BannerHome";
import ProductList from "../components/organism/ProductList/ProductList";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import { CatalogFallback } from "../components/ErrorBoundary/ErrorFallbacks";

export default function Home() {
  return (
    <div>
      <BannerHome />
      {/* Si la grilla revienta, el banner sigue en pie */}
      <ErrorBoundary name="catalog" fallback={<CatalogFallback />}>
        <ProductList></ProductList>
      </ErrorBoundary>
    </div>
  );
}
