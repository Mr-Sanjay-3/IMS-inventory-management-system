import React, { useState } from "react";
import API from '../api/axios'
import styles from "../scss/addStaff.module.scss";
import Loader from "../Subcomponents/LoadingAnimation";
const AddStaffPage = () => {
  const [Loading ,setLoading] = useState(false);
  const [staff, setStaff] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    salary: ""
  });

  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);
      const res = await API.post("/employee", staff);

      alert("Staff Added Successfully ");

      setStaff({
        name: "",
        email: "",
        phone: "",
        role: "",
        salary: ""
      });

    } catch (error) {
      console.error("Add Staff Error:", error);
      alert(error.response?.data?.message || "Something went wrong ");
    } finally {
      setLoading(false);
    }
  };
  
  if(Loading) return <Loader /> ;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add Staff</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input_group}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={staff.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.input_group}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={staff.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.input_group}>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={staff.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.input_group}>
          <label>Role</label>
          <select
            name="role"
            value={staff.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Manager">Manager</option>
            <option value="Cashier">Cashier</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className={styles.input_group}>
          <label>₹Salary</label>
          <input
            type="number"
            name="salary"
            value={staff.salary}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.btn}>
          Add Staff
        </button>
      </form>
    </div>
  );
};

export default AddStaffPage;
