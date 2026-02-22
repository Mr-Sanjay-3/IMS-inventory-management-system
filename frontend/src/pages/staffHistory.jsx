import React, { useEffect, useState } from "react";
import styles from "../scss/listStaff.module.scss";
import Loader from '../Subcomponents/LoadingAnimation';
import API from '../api/axios'
const staffHistory = () => {
  const [filterRole, setFilterRole] = useState("All");
  const [staffs, setStaffs] = useState([]);
  const [loading , setLoader ]= useState(true);

const user = JSON.parse(localStorage.getItem("user")) //RBAC > Role Based Accsess Control
const IsAdmin = user?.role ==="admin";
  //console.log("Role:",userRole);

  const fetchStaff = async () => {
   try {
      const res = await API.get("/employee");
      setStaffs(res.data);
    } catch (error) {
      console.error("Error On Fetch Staff:",error );
    }finally{
      setLoader(false);
    }
  };
  useEffect(()=>{
    fetchStaff();
  }, []);
 
   const deleteStaff = async (id) => {
    await API.delete(`/employee/${id}`);
    fetchStaff(); // now works
  };

  const handleChange = (e) => {
    setFilterRole(e.target.value);
  };

  const filteredStaff =
    filterRole === "All"
      ? staffs
      : staffs.filter((s) => s.role === filterRole);

  if (loading) return <Loader />;

  // Get unique roles
 // const uniqueRoles = [...new Set(staffs.map((s) => s.role))];
const roles = ["Manager", "Cashier", "Sales"];
      if (loading) return <Loader /> ;
      
  return (
    <>
    <div className={styles.container}>
      <h2 className={styles.heading}>Staff Management</h2>

      {/* Role Filter */}
      <select
        className={styles.filter}
        value={filterRole}
        onChange={handleChange}
      > 
        <option value="All">All</option>
      {/*{staffs.map((sta)=>(
        <option key={staffs._id} value={sta.role} >{sta.role}</option>
      ))};*/}
      {roles.map((roles,index)=>(
        <option key={index} value={roles}>{roles}</option>
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
      <td colSpan="5" className={styles.no_data}>
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

        {IsAdmin&& (
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
    </>
  );
};

export default staffHistory;
