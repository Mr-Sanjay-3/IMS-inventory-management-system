import styles from "../scss/sideNavbar.module.scss";

//ICONS FROM REACT-ICONS PACKAGE
import {
  MdOutlineDashboard,
  MdOutlineLogout,
  MdBrowserUpdated ,
} from "react-icons/md";
import { BsFillPersonVcardFill, BsThreeDots } from "react-icons/bs";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { IoMdLogIn, IoIosPersonAdd  } from "react-icons/io";
import {   FaTimes } from "react-icons/fa";
import { VscDashboard } from "react-icons/vsc";
import { GiBilledCap } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const StaffNavbar = () => {
  const [nav, setnav] = useState(false);

  const NavUrl = ({ url, icon, description ,end}) => {
    return (
      <li className={styles.li_navlink}>
        <NavLink
          to={url}
          end={end}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          {icon}
          <span className={styles.description}>{description}</span>
        </NavLink>
      </li>
    );
  };

  return (
  <div className={styles.navbar_container}>


      <nav className={nav ? undefined : styles.nav_small}>
        {/* LOGO */}
        <div className={styles.logo}>
          <VscDashboard className={styles.logo_icon} />
          <FaTimes
            className={styles.mobile_cancel_icon}
          />
        </div>

        {/* SUBMENU */}
        <ul className={styles.menu_container}>
          {/* FIRST CATEGORY */}
          <span className={styles.categories}>
            {nav ? "Pages" : < IoMdLogIn/>}
          </span>

          <NavUrl
            url="/staff"
            icon={<MdOutlineDashboard />}
            description="Dashboard"
           end
          />
{/*  SECOND CATEGORY */}
          <span
            className={`${styles.categories} 
          ${styles.second_category}`}
          >
            {nav ? "Product Management" : <BsThreeDots />}
          </span>
         <NavUrl url='/staff/productlist' icon={ <MdBrowserUpdated />} description="Product History" />
           <span
            className={`${styles.categories} 
          ${styles.third_category}`}
          >
            {nav ? "Staff Management" : <BsThreeDots />}
          </span>
           <NavUrl url='/staff/stafflist' icon={ <BsFillPersonVcardFill />} description="Staff Data" />
        </ul>

        <ul>
    <span
            className={`${styles.categories} 
          ${styles.third_category}`}
          >
            {nav ? "About Developers" : <BsThreeDots />}
          </span>
          <NavUrl url='/staff/aboutDevelopers' icon={<GiBilledCap  />} description="SRSS" />
        </ul>
        {/* LOGOUT BUTTON */}
        <div
          className={styles.btn_logout}
          onClick={() => {
            setnav(!nav);
          }}
        >
          <MdOutlineLogout />
        </div>
      </nav>
    </div>
  );
};

export default StaffNavbar;
