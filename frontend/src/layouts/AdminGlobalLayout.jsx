import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../Subcomponents/sideNavbar";
import '../scss/globalLayout.scss'
const GlobalLayout = () => {
  return (
    <>
    <div className="global-layout">
      <SideNavbar />
      <div className="global-content">
        <Outlet />
      </div>
    </div>
    </>
    
  );
};

export default GlobalLayout;
