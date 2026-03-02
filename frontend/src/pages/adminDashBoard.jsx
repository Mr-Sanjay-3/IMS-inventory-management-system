import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";  // Import useNavigate for redirecting after logout
//import { LogoutAPI } from "../api/axios";  // Ensure both are correctly imported
import API from "../api/axios";
import styles from "../scss/adminDashboard.module.scss";
import { BarChart,
   Bar,
    XAxis,
    YAxis, 
    Tooltip, 
  ResponsiveContainer } from "recharts";
import Loader from '../Subcomponents/LoadingAnimation'


const AdminDashboard = () => {
  const [Loading , setLoing] = useState(false);
//  const navigate = useNavigate(); // Use navigate for programmatic routing
  const user = JSON.parse(localStorage.getItem("user"));
  //Alert State
  const [alerts , setAlerts] = useState([]);

  const [status, setStatus] = useState({
    staff: 0,
    products: 0,
    categories: 0,
    history: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
         setLoing(true)
        const [staffRes, productRes, categoryRes] = await Promise.all([
          API.get("/employee"),
          API.get("/product"),
          API.get("/category"),
        ]);

        setStatus({
          staff: staffRes.data.length,
          products: productRes.data.length,
          categories: categoryRes.data.length,
          history: productRes.data.length,
        });
      } catch (err) {
        console.error(err);
      } finally{
       setLoing(false)
      }
    };

    fetchData();
  }, []);

  const chartData = [
    { name: "Staff", value: status.staff },
    { name: "Products", value: status.products },
    { name: "Categories", value: status.categories },
  ];
  

  //For Alert 
    useEffect(() => {
      const fetchAlerts = async () => {
        try {
          const response = await  API.get("/alert");
          setAlerts(response.data.alerts);
          console.log("response", response)
        } catch (error) {
          console.error("Error fetching low stock alerts:", error);
        }
      };
  
      fetchAlerts();

        const interval = setInterval(fetchAlerts, 10000);

  return () => clearInterval(interval);
    }, []);

  // Handle Logout
 //// const handleLogout = async () => {
   // try {
      // Remove the JWT token from localStorage
     // localStorage.removeItem("authToken");

      // Optionally notify the backend that the user has logged out (you can use either API or LogoutAPI for this)
     // await LogoutAPI.post("/logout", {}, {
       /* headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      // Redirect to the login page after logout
      navigate("/login");  // Correct use of navigate without `.push`
    } catch (err) {
      console.error("Error during logout:", err);
    }
  
  
    };

    button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
     </button>
*/
  if(Loading)  return <Loader />;
  return(
    <div className={styles.container}>
     
      <h2 className={styles.wellcome}>Welcome, {user?.name || "Admin"}</h2>
      <h2 className={styles.heading}>Admin Dashboard</h2>
{alerts.length > 0 && (
  <div className={styles["admin-alert-box"]}>
    <h4>⚠ Low Stock Alerts</h4>
    {alerts?.map((alert) => (
      <div key={alert._id} className={styles["admin-alert-item"]}>
   {alert.message}
      </div>
    ))}
  </div>
)}      <div className={styles.card_container}>
        <StatCard title="Total Staff" value={status.staff} />
        <StatCard title="Total Products" value={status.products}  />
        <StatCard title="Total Categories" value={status.categories} />
        <StatCard title="History Records" value={status.history} />
      </div>

      <div className={styles.chart_container}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#00f2fe" />
            <YAxis stroke="#00f2fe" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
            <Bar
              dataKey="value"
              fill="#00f2fe"
              radius={[8, 8, 0, 0]}
              barSize={28}
              animationDuration={1200}
              activeBar={{
                fill: "#4facfe",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(20,20,20,0.9)",
          padding: "10px 15px",
          borderRadius: "10px",
          color: "#fff",
          boxShadow: "0 5px 20px rgba(0,0,0,0.4)",
          fontSize: "14px",
        }}
      >
        <strong>{label}</strong>
        <p style={{ margin: 0 }}>
          Value: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const StatCard = ({ title, value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += Math.ceil(value / 25);
      if (start >= value) {
        start = value;
        clearInterval(interval);
      }
      setCount(start);
    }, 30);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div
      className={styles.card}
      onClick={() => alert(`${title}: ${value}`)}
    >
      <h3>{title}</h3>
      <p>{count}</p>
    </div>
  );
};

export default AdminDashboard;