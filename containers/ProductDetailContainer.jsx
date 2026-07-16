import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuoteEnquiry } from "@/lib/useQuoteEnquiry";
import ProductDetail from "@/pages/ProductDetail";

export default function ProductDetailContainer() {
  const { id: productId } = useParams();
  const { uploadFile, submitEnquiry } = useQuoteEnquiry(`product-detail:${productId}`);

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

  const family = product?.category === "pvc_strip_curtains" ? "pvc" : "rapid-door";
  const hubHref = family === "pvc" ? "/pvc-strip-curtains" : "/rapid-roller-doors";

  const relatedProducts = product
    ? allProducts
        .filter((p) => p.id !== product.id && p.category === product.category)
        .filter((p) => (product.product_family ? p.product_family === product.product_family : true))
        .slice(0, 3)
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
      family={family}
      backHref={hubHref}
      renderLink={renderLink}
      relatedProducts={relatedProducts}
      getRelatedHref={(p) => `${hubHref}/${p.id}`}
      uploadFile={uploadFile}
      submitEnquiry={submitEnquiry}
    />
  );
}
