import { useEffect } from "react";
import { ChartArea } from "../components/charts/AreaChart";
import useGlobalReducer from "../hooks/useGlobalReducer";
import chartUtils from "../utils/chartUtils";
import adminService from "../services/adminServices";
import ChartPie from "../components/charts/PieChart";

export const AdminDashboard = () => {
  const { store, dispatch } = useGlobalReducer();
  useEffect(() => {
    adminService.getPremiumUsers().then((data) => {
      dispatch({
        type: "update_admin_data",
        payload: {
          premiumUsers: data,
        },
      });
      
    });
  }, []);
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Manage users, content, and settings from this dashboard.</p>
      <ChartArea
        data={store.bands && chartUtils.groupByMonth(store.bands)}
        usage="Bands"
        x="name"
        y="count"
      />

      <ChartArea
        data={store.adminData?.premiumUsers}
        usage="Premium Users"
        x="name"
        y="count"
      />

      <ChartPie />
    </div>
  );
};
