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

userServices.auth = async (login, formData) => {
  try {
    const data = await fetcher(`/user/${login? 'login': 'register'}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default userServices;
