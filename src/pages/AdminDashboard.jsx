import React from "react";
import { Outlet } from "react-router-dom";
import AdminSizeBar from "../component/dashboard/AdminSizeBar";
import Navbar from "../component/dashboard/Navbar";

const AdminDashboard = () => {
  return (
    <div>
      <AdminSizeBar />
      <div 
      className="
      ml-60
      relative
      ud-dashboard
      ">
        <Navbar />
        {/* <AdminSummuary /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
