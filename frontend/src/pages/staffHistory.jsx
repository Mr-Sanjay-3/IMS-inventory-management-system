import React, { useEffect, useState } from "react";
import API from "../api/axios";
import styles from "../scss/listStaff.module.scss";

const StaffListPage = () => {
  const [staffs, setStaffs] = useState([]);
  const [filterRole, setFilterRole] = useState("All");

  const userRole = localStorage.getItem("role"); // 🔥 RBAC

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await API.get("/staff");
      setStaffs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStaff = async (id) => {
    await API.delete(`/staff/${id}`);
    fetchStaff();
  };

  const filteredStaff =
    filterRole === "All"
      ? staffs
      : staffs.filter((s) => s.role === filterRole);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Staff Management</h2>

      {/* Role Filter */}
      <select
        className={styles.filter}
        value={filterRole}
        onChange={(e) => setFilterRole(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Manager">Manager</option>
        <option value="Cashier">Cashier</option>
        <option value="Sales">Sales</option>
      </select>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone</th>
            {userRole === "admin" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {filteredStaff.map((staff) => (
            <tr key={staff._id}>
              <td>{staff.name}</td>
              <td>{staff.email}</td>
              <td>
                <span className={`${styles.badge} ${styles[staff.role.toLowerCase()]}`}>
                  {staff.role}
                </span>
              </td>
              <td>{staff.phone}</td>

              {userRole === "admin" && (
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffListPage;
