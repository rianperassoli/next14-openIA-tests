"use server";
import OpenAI from "openai";
import axios from "axios";
import prisma from "./db";

const UNSPLASH_URL = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (chatMessages) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "you are a helpful assistant",
        },
        ...chatMessages,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 100,
    });

    return {
      message: response.choices[0].message,
      tokens: response.usage.total_tokens,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const generateTourResponse = async ({ city, country }) => {
  const query = `Find a ${city} in this ${country}.
If ${city} in this ${country} exists, create a list of things families can do in this ${city},${country}.
Once you have a list, create a one-day tour. Response should be in the following JSON format:
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "description of the city and tour",
    "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
  }
}
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country} return { "tour": null }, with no additional characters.`;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "you are a tour guide" },
        { role: "user", content: query },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });
    // potentially returns a text with error message
    const tourData = JSON.parse(response.choices[0].message.content);

    if (!tourData.tour) {
      return null;
    }

    return { tour: tourData.tour, tokens: response.usage.total_tokens };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const generateTourImageWithOpenAI = async ({ city, country }) => {
  try {
    const tourImage = await openai.images.generate({
      prompt: `a panoramic view of the ${city} ${country}`,
      n: 1,
      size: "256x256",
    });

    return tourImage?.data[0]?.url;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const generateTourImageWithUnsplash = async ({ city }) => {
  try {
    const { data } = await axios(`${UNSPLASH_URL}${city}`);

    return data?.results[0]?.urls?.raw;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getExistingTour = async ({ city, country }) => {
  return prisma.tour.findUnique({
    where: {
      city_country: {
        city,
        country,
      },
    },
  });
};

export const createNewTour = async (tour) => {
  return prisma.tour.create({
    data: tour,
  });
};

export const getAllTours = async (searchTerm) => {
  if (!searchTerm) {
    const tours = await prisma.tour.findMany({
      orderBy: {
        city: "asc",
      },
    });

    return tours;
  }

  const tours = await prisma.tour.findMany({
    where: {
      OR: [
        {
          city: {
            contains: searchTerm,
          },
        },
        {
          country: {
            contains: searchTerm,
          },
        },
      ],
    },
    orderBy: {
      city: "asc",
    },
  });

  return tours;
};

export const getSingleTour = async (id) => {
  if (!id) return null;

  return await prisma.tour.findUnique({
    where: { id },
  });
};
