import React, { useEffect, useState } from "react";
import API from "../api/axios"; // Axios API Call
import { useNavigate } from "react-router-dom"; //  useNavigate for react-router v6
import styles from '../scss/lowstockalert.module.scss'

const LowStockAlertList = () => {
  const [alerts, setAlerts] = useState([]);
  const history = useNavigate();

  // Fetch low stock alerts
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await API.get("/alert");
        setAlerts(response.data.alerts);
      } catch (error) {
        console.error("Error fetching low stock alerts:", error);
      }
    };

    fetchAlerts();
  }, []);

  // Resolve low stock alert
  const resolveAlert = async (alertId) => {
    try {
await API.put(`/alert/resolve/${alertId}`);
      setAlerts(alerts.filter((alert) => alert._id !== alertId)); // Remove the resolved alert from state
    } catch (error) {
      console.error("Error resolving alert:", error);
    }
  };

  return (

  <div className={styles["alert-container"]}>
    <h2>Low Stock Alerts</h2>

    {alerts.length === 0 ? (
      <p>No low stock alerts</p>
    ) : (
      <ul>
        {alerts.map((alert) => (
          <li key={alert._id} className={styles["alert-item"]}>
            <div className= {styles["alert-details"]}>
              <p><strong>Product:</strong> {alert.product?.name}</p>
              <p><strong>Message:</strong> {alert.message}</p>
              <p><strong>Status:</strong> {alert.isResolved ? "Resolved" : "Unresolved"}</p>
            </div>

            {!alert.isResolved && (
              <button onClick={() => resolveAlert(alert._id)} className={styles["button-red"]}>
                Resolve
              </button>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);

};

export default LowStockAlertList;