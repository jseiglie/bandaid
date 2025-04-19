const liveServices = {};
import validationUtils from "../utils/validationUtils";

liveServices.getLives = async () => {
  try {
    const resp = await fetch("http://localhost:3000/api/lives/lives", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!resp.ok) {
      throw new Error("Network response was not ok");
    }
        validationUtils.validateJSONResponse(resp.headers.get("Content-Type"), 'getLives');
    
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching setlists");
  }
};
export default liveServices;
