import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import RapidRollerDoorsHub from "@/pages/RapidRollerDoorsHub";

export default function RapidRollerDoorsContainer() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => base44.entities.Product.list(),
    initialData: [],
  });

  const products = allProducts.filter((p) => p.category !== "pvc_strip_curtains");

  return <RapidRollerDoorsHub products={products} isLoading={isLoading} />;
}
