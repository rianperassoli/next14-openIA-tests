import { redirect } from "next/navigation";
import Link from "next/link";
import { getSingleTour } from "@/utils/action";
import { TourInfo } from "@/components/TourInfo";

const TourPage = async ({ params }) => {
  const tour = await getSingleTour(params.id);

  if (!tour) {
    redirect("/tours");
  }

  return (
    <div>
      <Link href="/tours" className="btn btn-secondary mb-12">
        back to tours
      </Link>

      <TourInfo tour={tour} />
    </div>
  );
};

export default TourPage;
