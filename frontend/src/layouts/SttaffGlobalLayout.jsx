import React from "react";
import { Outlet } from "react-router-dom";

import '../scss/globalLayout.scss'
import StaffNavbar from "../Subcomponents/StaffNavbar";
const StaffGlobalLayout = () => {
  return (
    <>
    <div className="global-layout">
      <StaffNavbar />
      <div className="global-content">
        <Outlet />
      </div>
    </div>
    </>
    
  );
};

export default StaffGlobalLayout;
