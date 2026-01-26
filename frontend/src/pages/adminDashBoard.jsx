// import React from 'react'
// import { useEffect, useState } from 'react';
// import API from '../api/axios';
// import Loader from '../Subcomponents/LoadingAnimation'
// import { getAdminStatus } from '../api/axios';


// const adminDashBoard = () => {
//   const [loading , setLoading] = useState(true);
//   const [stats, setStats] = useState(null);
 
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getAdminStatus();
      
//         setStats(res.data);
          
     
       
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <Loader />;
//   if (!stats) {
//     return <p style={{ color: "white" }}>No data available</p>;
//   }

//     const user = JSON.parse(localStorage.getItem("user"));
//   return (
//     <>
//      <div>
//       <h1>Admin Dashboard</h1>
//       <h4>"Welcome",{user?.name}</h4>
//     </div>
    
//     </>
//   )
// }

// export default  adminDashBoard;

import { useEffect, useState } from "react";
import { getAdminStatus } from "../api/axios";
import Loader from "../Subcomponents/LoadingAnimation";

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
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Products: {stats.totalProducts}</p>
      <p>Low Stock Alerts: {stats.lowStockAlerts}</p>
      <p>Total Users: {stats.totalUsers}</p>
    </div>
  );
};

export default AdminDashboard;
