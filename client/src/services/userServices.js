import { fetcher } from "../utils/fetcher";
const userServices = {};

userServices.getUsers = async () => {
  try {
    const data = await fetcher("/users", {
      method: "GET",
      
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching users");
  }
};

userServices.auth = async (login, formData) => {
  try {
    const data = await fetcher(`/users/auth/${login? 'login': 'register'}`, {
      method: "POST",
     
      body: JSON.stringify(formData),
    });

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

userServices.logout = async () => {
  try {
    const data = await fetcher("/users/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error logging out");
  }
};

userServices.changePassword = async (data) => {
  try {
    const response = await fetcher("/users/change-password", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error changing password");
  }
};

userServices.getUserInfo = async () => {
  try {
    const response = await fetcher("/users/auth/me", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching user info");
  }
};

export default userServices;
