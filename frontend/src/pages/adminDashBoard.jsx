import React, { useEffect, useState } from "react";
import API from "../api/axios";
import styles from "../scss/adminDashboard.module.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    staff: 0,
    products: 0,
    categories: 0,
    history: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [staffRes, productRes, categoryRes] = await Promise.all([
          API.get("/employee"),
          API.get("/product"),
        API.get("/category")
        ]);

        setStats({
          staff: staffRes.data.length,
          products: productRes.data.length,
          categories: categoryRes.data.length,
          history: productRes.data.length
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const chartData = [
    { name: "Staff", value: stats.staff },
    { name: "Products", value: stats.products },
    { name: "Categories", value: stats.categories }
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Admin Dashboard</h2>

      <div className={styles.card_container}>
        <StatCard title="Total Staff" value={stats.staff} />
        <StatCard title="Total Products" value={stats.products} />
        <StatCard title="Total Categories" value={stats.categories} />
        <StatCard title="History Records" value={stats.history} />
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
    strokeWidth: 2
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
          fontSize: "14px"
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
