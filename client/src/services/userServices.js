const userServices = {};
import validationUtils from "../utils/validationUtils";

userServices.getUsers = async () => {
  try {
    const resp = await fetch("http://localhost:3000/api/user/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!resp.ok) {
      throw new Error("Network response was not ok");
    }
    validationUtils.validateJSONResponse(
      resp.headers.get("Content-Type"),
      "getUsers"
    );

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching users");
  }
};

export default userServices;
