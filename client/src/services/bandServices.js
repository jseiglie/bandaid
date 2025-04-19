const bandServices = {};
import validationUtils from "../utils/validationUtils";

bandServices.getBands = async () => {
  try {
    const resp = await fetch("http://localhost:3000/api/band/bands", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!resp.ok) {
      throw new Error("Network response was not ok");
    }

    validationUtils.validateJSONResponse(resp.headers.get("Content-Type"), 'getBands')
    const data = await resp.json();

    return data;
  } catch (error) {
    console.error(error);
   
  }
};

export default bandServices;
