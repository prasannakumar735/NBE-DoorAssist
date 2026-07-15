import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import ProductDetail from "@/pages/ProductDetail";

export default function ProductDetailContainer() {
  const { id: productId } = useParams();

  const { data: allProducts = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => base44.entities.Product.list(),
    initialData: [],
  });

  const { data: product = null, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () =>
      productId
        ? base44.entities.Product.list().then((products) => products.find((item) => item.id === productId) || null)
        : null,
    enabled: !!productId,
    initialData: null,
  });

  const relatedProducts = product
    ? allProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3)
    : [];

  const renderLink = ({ href, className, children }) => (
    <Link to={href} className={className}>
      {children}
    </Link>
  );

  return (
    <ProductDetail
      product={product}
      isLoading={isLoading}
      backHref="/rapid-roller-doors"
      renderLink={renderLink}
      relatedProducts={relatedProducts}
      getRelatedHref={(p) => `/rapid-roller-doors/${p.id}`}
    />
  );
}
