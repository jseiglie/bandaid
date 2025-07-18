import { useEffect } from "react";
import { ChartArea } from "../components/charts/AreaChart";
import useGlobalReducer from "../hooks/useGlobalReducer";
import chartUtils from "../utils/chartUtils";
import adminService from "../services/adminServices";

export const AdminDashboard = () => {
  const { store, dispatch } = useGlobalReducer();
  useEffect(() => {
    // Fetch premium users or any other admin data here
    adminService.getPremiumUsers().then((data) => {
      dispatch({
        type: "update_admin_data",
        payload: {
          premiumUsers: data,
        },
      });
      console.log("Premium users", data);
      console.log("Store after update:", store);
    });
  }, []);
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Manage users, content, and settings from this dashboard.</p>
      <ChartArea
        data={store.bands && chartUtils.groupByMonth(store.bands)}
        usage="New Bands by Month"
        x="name"
        y="count"
      />

      <ChartArea
        data={store.adminData?.premiumUsers}
        usage="New Premium Users by Month"
        x="name"
        y="count"
      />
    </div>
  );
};
