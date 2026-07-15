import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import Products from "@/pages/Products";

export default function RapidRollerDoorsContainer() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => base44.entities.Product.list(),
    initialData: [],
  });

  const products = allProducts.filter((p) => p.category !== "pvc_strip_curtains");

  return (
    <Products
      products={products}
      isLoading={isLoading}
      getProductDetailHref={(product) => `/rapid-roller-doors/${product.id}`}
      getProductCtaHref={(product) => `/rapid-roller-doors/${product.id}`}
      renderProductLink={({ href, className, children }) => (
        <Link to={href} className={className}>
          {children}
        </Link>
      )}
    />
  );
}
