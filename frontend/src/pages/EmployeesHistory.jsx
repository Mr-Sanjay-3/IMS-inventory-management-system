import React, { useEffect, useState } from "react";
import styles from "../scss/listStaff.module.scss";
import Loader from "../Subcomponents/LoadingAnimation";
import API from "../api/axios";

const EmployeesHistory = () => {
  const [filterRole, setFilterRole] = useState("All");
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoader] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const IsAdmin = user?.role === "admin";

  const fetchStaff = async () => {
    try {
      const res = await API.get("/employee");

      if (!IsAdmin) {
        const filteredStaff = res.data.filter(
          (s) => s.role !== "admin" && s.role !== "manager"
        );
        setStaffs(filteredStaff);
      } else {
        setStaffs(res.data);
      }
    } catch (error) {
      console.error("Error On Fetch Staff:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const deleteStaff = async (id) => {
    await API.delete(`/employee/${id}`);
    fetchStaff();
  };

  const handleChange = (e) => {
    setFilterRole(e.target.value);
  };

  const filteredStaff =
    filterRole === "All"
      ? staffs
      : staffs.filter((s) => s.role === filterRole);

  if (loading) return <Loader />;

  const roles = IsAdmin ? ["Manager", "Cashier", "Sales"] : ["Cashier", "Sales"];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Staff Management</h2>

      <select
        className={styles.filter}
        value={filterRole}
        onChange={handleChange}
      >
        <option value="All">All</option>
        {roles.map((role, index) => (
          <option key={index} value={role}>
            {role}
          </option>
        ))}
      </select>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone</th>
            {IsAdmin && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {filteredStaff.length === 0 ? (
            <tr>
              <td colSpan={IsAdmin ? 5 : 4} className={styles.no_data}>
                No staffs found in this category
              </td>
            </tr>
          ) : (
            filteredStaff.map((staff) => (
              <tr key={staff._id}>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>
                  <span
                    className={`${styles.badge} ${
                      styles[staff.role.toLowerCase()]
                    }`}
                  >
                    {staff.role}
                  </span>
                </td>
                <td>{staff.phone}</td>

                {IsAdmin && (
                  <td>
                    <button
                      className={styles.delete_btn}
                      onClick={() => deleteStaff(staff._id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesHistory;