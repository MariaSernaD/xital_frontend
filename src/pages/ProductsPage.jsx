import ProductsCatalog from "../components/organism/ProductsCatalog/ProductsCatalog";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import { CatalogFallback } from "../components/ErrorBoundary/ErrorFallbacks";

export default function ProductsPage() {
  return (
    <ErrorBoundary name="catalog" fallback={<CatalogFallback />}>
      <ProductsCatalog></ProductsCatalog>
    </ErrorBoundary>
  );
}
