import { fetcher } from "../utils/fetcher";
const songServices = {};

songServices.getSongs = async () => {
  try {
    const data = await fetcher("/songs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching setlists");
  }
};

export default songServices;
