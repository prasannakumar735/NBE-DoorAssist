import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import Products from "@/pages/Products";

export default function ProductsContainer() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => base44.entities.Product.list(),
    initialData: [],
  });

  const detailHref = (product) =>
    product?.category === "pvc_strip_curtains" ? `/pvc-strip-curtains/${product.id}` : `/rapid-roller-doors/${product.id}`;

  return (
    <Products
      products={products}
      isLoading={isLoading}
      getProductDetailHref={detailHref}
      getProductCtaHref={detailHref}
      renderProductLink={({ href, className, children }) => (
        <Link to={href} className={className}>
          {children}
        </Link>
      )}
    />
  );
}
