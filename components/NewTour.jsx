"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  getExistingTour,
  generateTourResponse,
  createNewTour,
} from "../utils/action";
import { TourInfo } from "@/components/TourInfo";

const NewTour = () => {
  const [messages, setMessages] = useState([]);

  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination) => {
      const newTour = await generateTourResponse(destination);
      if (newTour) {
        return newTour;
      }
      toast.error("No matching city found...");
      return null;
    },
    // onSuccess: (data) => {
    //   if (!data) {
    //     toast.error("Something went wrong...");
    //     return;
    //   }
    //   setMessages((prev) => [...prev, data]);
    // },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    mutate(destination);
  };

  if (isPending) {
    return <span className="loading loading-lg"></span>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <h2 className="mb-4">Select your dream destination</h2>
        <div className="join w-full">
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="city"
            name="city"
            required
          />
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="country"
            name="country"
            required
          />
          <button
            className="btn btn-primary join-item"
            type="submit"
            disabled={isPending}
          >
            {isPending && <span className="loading loading-bars loading-xs" />}
            generate tour
          </button>
        </div>
      </form>

      <div className="mt-16">{tour ? <TourInfo tour={tour} /> : null}</div>
    </>
  );
};

export { NewTour };
