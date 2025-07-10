const bandServices = {};
import { fetcher } from "../utils/fetcher";

bandServices.getBands = async () => {
  try {
    const data = await fetcher("/bands", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default bandServices;
