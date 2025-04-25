import { fetcher } from "../utils/fetcher";
const userServices = {};

userServices.getUsers = async () => {
  try {
    const data = await fetcher("/user/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching users");
  }
};

userServices.login = async (formData) => {
  try {
    const data = await fetcher("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error logging in");
  }
};

export default userServices;
