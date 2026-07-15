import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuoteEnquiry } from "@/lib/useQuoteEnquiry";
import Quote from "@/pages/Quote";

export default function QuoteContainer() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product") || "";
  const width = searchParams.get("width") || "";
  const height = searchParams.get("height") || "";
  const { uploadFile, submitEnquiry } = useQuoteEnquiry("request-a-quote");

  const { data: product = null } = useQuery({
    queryKey: ["quote-product", productId],
    queryFn: () =>
      productId
        ? base44.entities.Product.list().then((products) => products.find((item) => item.id === productId) || null)
        : null,
    enabled: !!productId,
    initialData: null,
  });

  const prefill = useMemo(() => {
    const messageParts = [];
    if (width) messageParts.push(`Width: ${width}mm`);
    if (height) messageParts.push(`Height: ${height}mm`);
    return {
      message: messageParts.join("\n"),
    };
  }, [width, height]);

  return (
    <Quote
      product={product}
      productId={productId}
      prefill={prefill}
      uploadFile={uploadFile}
      submitEnquiry={submitEnquiry}
    />
  );
}
