import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import Home from "@/pages/Home";

export default function HomeContainer() {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => base44.entities.Product.list(),
    initialData: [],
  });

  return <Home products={products} />;
}
