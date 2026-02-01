import { useEffect, useState } from "react";
import { getAdminStatus } from "../api/axios";
import Loader from "../Subcomponents/LoadingAnimation";
import '../scss/adminDashBoard.scss'
import SideNavbar from '../Subcomponents/sideNavbar'
const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAdminStatus();
        setStats(res.data);
      } catch (err) {
        console.error("Admin stats error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (!stats) return <p>No data</p>;

  return (
    <>
    <div className="admin-layout">

    <SideNavbar />
    <div className="admin-conttent">
    <div>
      <h2 style={{color:'wheat'}}>Admin Dashboard</h2>
      <p>Total Products: {stats.totalProducts}</p>
      <p>Low Stock Alerts: {stats.lowStockAlerts}</p>
      <p>Total Users: {stats.totalUsers}</p>
    </div>
      
    </div>
   
    </div>
    
    </>
  
  );
};

export default AdminDashboard;
