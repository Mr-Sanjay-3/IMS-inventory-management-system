import React, { useEffect, useState } from "react";
import styles from "../scss/staffDashboard.module.scss";
import API from "../api/axios";
import Loader from "../Subcomponents/LoadingAnimation";
import { useNavigate } from "react-router-dom";
import Footer from "../Subcomponents/Footer";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isStaff = user?.role === "staff";
  

  const [loading, setLoading] = useState(true);
  const [staffs, setStaffs] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch staffs (admin only) and products
  const fetchData = async () => {
    try {
      if (isStaff) {
        const staffRes = await API.get("/employee");
        setStaffs(staffRes.data);
      }
      const productRes = await API.get("/product");
      setProducts(productRes.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
    <div className={styles.container}>
      <h1>Welcome, {user.name}</h1>
      <p>Role: {user.role.toUpperCase()}</p>

      {/* Products Section */}
      <section className={styles.section}>
        <h2>Products</h2>
        <div className={styles.cards}>
          {products.map((p) => (
            <div key={p._id} className={styles.card}>
              <h3>{p.name}</h3>
              <p>Price: ₹{p.product}</p>
              <p>Category: {p.staffs}</p>

              {isStaff && (
                <div className={styles.actions}>
                  <button onClick={() => navigate(`/edit-product/${p._id}`)}>Edit</button>
                  <button
                    onClick={async () => {
                      await API.delete(`/product/${p._id}`);
                      setProducts((prev) => prev.filter((pr) => pr._id !== p._id));
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Staff Section (Admin only) */}
      {isStaff && (
        <section className={styles.section}>
          <h2>Staffs</h2>
          <div className={styles.cards}>
            {staffs.map((s) => (
              <div key={s._id} className={styles.card}>
                <h3>{s.name}</h3>
                <p>Email: {s.email}</p>
                <p>Role: {s.role}</p>
                <p>Phone: {s.phone}</p>

                <div className={styles.actions}>
                  <button onClick={() => navigate(`/edit-staff/${s._id}`)}>Edit</button>
                  <button
                    onClick={async () => {
                      await API.delete(`/staff/${s._id}`);
                      setStaffs((prev) => prev.filter((st) => st._id !== s._id));
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
   <Footer />

    </>
   
  );
};

export default StaffDashboard;