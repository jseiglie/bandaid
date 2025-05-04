import { fetcher } from "../utils/fetcher";

const emailServices = {};

emailServices.sendEmailNotification = async (emailData) => {
  try {
    const data = await fetcher("/api/send_email_notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


export default emailServices;
