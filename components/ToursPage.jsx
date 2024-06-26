"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllTours } from "@/utils/action";
import { ToursList } from "@/components/ToursList";

const ToursPage = () => {
  const { data, isPending } = useQuery({
    queryKey: ["tours"],
    queryFn: () => getAllTours(),
  });

  return isPending ? <span className="loading" /> : <ToursList data={data} />;
};

export { ToursPage };
