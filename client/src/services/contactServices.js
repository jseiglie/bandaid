import { fetcher } from "../utils/fetcher";

const contactServices = {};

contactServices.sendContactForm = async (formData) => {
  try {
   const data = await fetcher("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return data;
  } catch (error) {
    console.error("Error sending contact form:", error);
  }
};

export default contactServices;
