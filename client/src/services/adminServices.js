
import { fetcher } from "../utils/fetcher";

const adminService = {}

adminService.getPremiumUsers = async () => {
  try {
    const response = await fetcher("/admin/premium-users");
    return response.data;
  } catch (error) {
    console.error("Error fetching premium users:", error);
    throw error;
  }
};




export default adminService;