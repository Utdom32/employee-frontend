import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt } from 'react-icons/fa';
import { IoSettingsOutline } from "react-icons/io5";
import { FcDepartment } from "react-icons/fc";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { useAuth } from '../../../context/authContext';



const SizeBar = () => {
    const {user} = useAuth();
    return (
        <div className='bg-gray-800 text-white fixed left-0 top-0 bottom-0 space-y-5 w-60'>
            <div className='flex items-center h-15 justify-center bg-teal-700'>
                <h3 className='text-2xl text-center '>Fresh Farm KH</h3>
            </div>
            <div >
                <NavLink to="/employee-dashboard" 
                className={({ isActive }) => `${isActive ? " bg-teal-500 " : " "} flex items-center py-2.5 px-4 space-x-4 rounded`}
                end>
                    <FaTachometerAlt className="text-xl" />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to={`/employee-dashboard/profile/${user._id}`} 
                className={({ isActive }) => `${isActive ? " bg-teal-500 " : " "} flex items-center py-2.5 px-4 space-x-4 rounded`}>

                    <FcDepartment className='text-xl' />
                    <span>My Profile</span>
                </NavLink>
                <NavLink to={`/employee-dashboard/leave/${user._id}`} 
             className={({ isActive }) => `${isActive ? " bg-teal-500 " : " "} flex items-center py-2.5 px-4 space-x-4 rounded`}>
                    <FaTachometerAlt className='text-xl' />
                    <span>Attendance</span>
                </NavLink>
                <NavLink to={`/employee-dashboard/salary/${user._id}`}
               className={({ isActive }) => `${isActive ? " bg-teal-500 " : " "} flex items-center py-2.5 px-4 space-x-4 rounded`}>
                    <AiOutlineMoneyCollect className='text-xl' />
                    <span>Salary</span>
                </NavLink>
                <NavLink to="/employee-dashboard/setting" 
               className={({ isActive }) => `${isActive ? " bg-teal-500 " : " "} flex items-center py-2.5 px-4 space-x-4 rounded`}>
                    <IoSettingsOutline className='text-xl' />
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    )
}

export default SizeBar
