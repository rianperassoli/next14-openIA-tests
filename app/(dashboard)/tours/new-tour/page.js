import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { NewTour } from "@/components/NewTour";

const NewTourPage = () => {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewTour />
    </HydrationBoundary>
  );
};

export default NewTourPage;
