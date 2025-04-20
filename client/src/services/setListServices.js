import { fetcher } from "../utils/fetcher";
const setListServices = {};

setListServices.getSetLists = async () => {
  try {
    const data = await fetcher("/set_list/set_lists", {
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

export default setListServices;
