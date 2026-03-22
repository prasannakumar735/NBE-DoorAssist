import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import Products from "@/pages/Products";

export default function ProductsContainer() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => base44.entities.Product.list(),
    initialData: [],
  });

  return (
    <Products
      products={products}
      isLoading={isLoading}
      getProductDetailHref={(product) => createPageUrl(`ProductDetail?id=${product.id}`)}
      getProductCtaHref={(product) =>
        product.is_part
          ? createPageUrl(`ProductDetail?id=${product.id}`)
          : createPageUrl(`Quote?product=${product.id}`)
      }
      renderProductLink={({ href, className, children }) => (
        <a href={href} className={className}>
          {children}
        </a>
      )}
    />
  );
}
