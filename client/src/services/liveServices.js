import { fetcher } from "../utils/fetcher";
const liveServices = {};
liveServices.getLives = async () => {
  try {
    const data = await fetcher("/lives", {
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
export default liveServices;
