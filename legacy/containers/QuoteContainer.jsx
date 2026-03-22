import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import Quote from "@/pages/Quote";

export default function QuoteContainer() {
  const search = typeof window !== "undefined" ? window.location.search : "";

  const productId = useMemo(() => {
    const params = new URLSearchParams(search);
    return params.get("product") || "";
  }, [search]);

  const { data: product = null } = useQuery({
    queryKey: ["quote-product", productId],
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
    <Quote
      product={product}
      productId={productId}
      uploadFile={uploadFile}
      submitEnquiry={submitEnquiry}
    />
  );
}
