import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  generateTourImageWithOpenAI,
  generateTourImageWithUnsplash,
  getSingleTour,
} from "@/utils/action";
import { TourInfo } from "@/components/TourInfo";

const TourPage = async ({ params }) => {
  const tour = await getSingleTour(params.id);

  if (!tour) {
    redirect("/tours");
  }

  //   -- Creating image with openAI -- EXPENSIVE
  //   const tourImage = await generateTourImageWithOpenAI({
  //     city: tour.city,
  //     country: tour.country,
  //   });

  //   -- Creating image with Unsplash API
  const tourImage = await generateTourImageWithUnsplash({
    city: tour.city,
  });

  return (
    <div>
      <Link href="/tours" className="btn btn-secondary mb-12">
        back to tours
      </Link>

      {tourImage ? (
        <div>
          <Image
            src={tourImage}
            className="rounded-xl h-96 w-96 object-cover mb-16 shadow-xl"
            width={300}
            height={300}
            alt={tour.title}
            priority
          />
        </div>
      ) : null}

      <TourInfo tour={tour} />
    </div>
  );
};

export default TourPage;
