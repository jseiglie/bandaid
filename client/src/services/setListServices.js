const setListServices = {};
import validationUtils from "../utils/validationUtils";

setListServices.getSetLists = async () => {
  try {
    const resp = await fetch("http://localhost:3000/api/set_list/set_lists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!resp.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await resp.json();
        validationUtils.validateJSONResponse(resp.headers.get("Content-Type"), 'getSetLists');
    
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching setlists");
  }
};

export default setListServices;
