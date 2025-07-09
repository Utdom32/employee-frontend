import React from "react";
import { useAuth } from "../../../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
  };

  const Profile = (e) => {
    e.preventDefault();
    if (user.role === "admin") {
      window.location.href = "/admin-dashboard";
    } else if (user.role === "employee") {
      window.location.href = "/employee-dashboard";
    }
  };

  return (
    <div className="
    flex 
    h-15
    items-center px-5 text-white justify-between bg-teal-600 familyName">
      {/* <p className='text-2xl font-medium'>Welcome ! : {user.role}</p> */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
      >
        Logout
      </button>
      <div className="flex items-center space-x-4">
        <img
          src={`https://employee-frontend-dti.vercel.app/${user.profileImage}`}
          className="w-13 h-13 rounded-full"
        />
        <button onClick={Profile}>
          <span className="text-white">{user.name} ,</span>
        </button>
        <span className="text-white">{user.role}</span>
      </div>
    </div>
  );
};

export default Navbar;
