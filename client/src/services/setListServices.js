import { fetcher } from "../utils/fetcher";
const setListServices = {};

setListServices.getSetLists = async (id) => {
  try {
    const data = await fetcher("/set_lists/"+id, {
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
