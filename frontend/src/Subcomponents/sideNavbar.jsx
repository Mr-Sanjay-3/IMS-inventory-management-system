import styles from "../scss/sideNavbar.module.scss";

//ICONS FROM REACT-ICONS PACKAGE
import {
  MdOutlineDashboard,
  MdOutlineAnalytics,
  MdOutlinedFlag,
  MdPeopleOutline,
  MdOutlineMessage,
  MdOutlineLogout,
  MdOutlineFlag,
  MdBrowserUpdated ,
  MdDeleteSweep ,
  MdDisabledVisible
} from "react-icons/md";
import { BsDatabaseFillAdd } from "react-icons/bs";
import {TiUserDelete } from "react-icons/ti"
import { IoMdLogIn, IoIosPersonAdd  } from "react-icons/io";
import { FaReact, FaTimes } from "react-icons/fa";
import { BsDatabaseAdd, BsThreeDots } from "react-icons/bs";
import { VscDashboard } from "react-icons/vsc";

import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
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
            url="/admin"
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
          <NavUrl url='/admin/product' icon={<BsDatabaseFillAdd />} description="Product Manage" />
    <NavUrl url='/admin/category' icon={ <MdBrowserUpdated />} description="Product History" />
        <NavUrl url= '/u' icon={<MdDeleteSweep />} description="Delete Product" />
          {/* <NavUrl url="/other1" icon={<IoMdLogIn />} description="Add Product" /> */}

          {/* <NavUrl url="/other1" icon={<FaReact />} description="" /> */}
           {/* SECOND CATEGORY */}
           <span
            className={`${styles.categories} 
          ${styles.third_category}`}
          >
            {nav ? "Staff Management" : <BsThreeDots />}
          </span>
          <NavUrl url='/admin/addstaff' icon={<IoIosPersonAdd  />} description="Add Staff" />
    <NavUrl url='/admin/liststaff' icon={ <MdDisabledVisible />} description="Disable Staff" />
        <NavUrl url= '/u' icon={<TiUserDelete  />} description="Delete Staff" />
          {/* <NavUrl url="/other1" icon={<IoMdLogIn />} description="Add Product" /> */}

          {/* <NavUrl url="/other1" icon={<FaReact />} description="" /> */}
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
        {/* ADD BACKGROUND FOR MOBILE */}
      </nav>
    </div>
  );
};

export default Navbar;