import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import ProductDetail from "@/pages/ProductDetail";

export default function ProductDetailContainer() {
  const search = typeof window !== "undefined" ? window.location.search : "";

  const productId = useMemo(() => {
    const params = new URLSearchParams(search);
    return params.get("id") || "";
  }, [search]);

  const { data: product = null, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () =>
      productId
        ? base44.entities.Product.list().then((products) => products.find((item) => item.id === productId) || null)
        : null,
    enabled: !!productId,
    initialData: null,
  });

  const uploadFile = async (file) => {
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    return file_url;
  };

  const submitEnquiry = (payload) => base44.entities.Enquiry.create(payload);

  return (
    <ProductDetail
      product={product}
      isLoading={isLoading}
      backHref={createPageUrl("Products")}
      renderLink={({ href, className, children }) => (
        <a href={href} className={className}>
          {children}
        </a>
      )}
      uploadFile={uploadFile}
      submitEnquiry={submitEnquiry}
    />
  );
}
