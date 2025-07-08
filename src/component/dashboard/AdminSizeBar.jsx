import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUserCircle } from 'react-icons/fa';
import { IoSettingsOutline } from "react-icons/io5";
import { FcDepartment } from "react-icons/fc";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { MdOutlineAccountTree } from "react-icons/md";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FcSalesPerformance } from "react-icons/fc";
import { MdOutlineInventory } from "react-icons/md";



const AdminSizeBar = () => {
    return (
        <div className='bg-gray-800 text-white fixed left-0 top-0 bottom-0 space-y-5 w-60'>
            <div className='flex items-center h-15 justify-center bg-teal-700'>
                <h3 className='text-2xl text-center '>Fresh Farm KH</h3>
            </div>
            <div >
                <NavLink to="/admin-dashboard" 
                className={({ isActive }) => `${isActive ? " bg-teal-500 " : " "} flex items-center py-2.5 px-4 space-x-4 rounded`}
                end>
                    <FaTachometerAlt className="text-xl" />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/admin-dashboard/product" 
               className={({ isActive }) => `${isActive ? " bg-teal-500 " : " "} flex items-center py-2.5 px-4 space-x-4 rounded`}>
                    <IoSettingsOutline className='text-xl' />
                    <span>Product</span>
                </NavLink>
                <NavLink to="/admin-dashboard/employees" 
                className={({ isActive }) => `${isActive ? " bg-teal-500 " : " "} flex items-center py-2.5 px-4 space-x-4 rounded`}>
                    <FaUserCircle className="text-xl" />
                    <span>Employee</span>
                </NavLink>
                <NavLink to="/admin-dashboard/departments" 
                className={({ isActive }) => `${isActive ? " bg-teal-500 " : " "} flex items-center py-2.5 px-4 space-x-4 rounded`}>

                    <FcDepartment className='text-xl' />
                    <span>Departments</span>
                </NavLink>
                <NavLink to="/admin-dashboard/leave" 
             className={({ isActive }) => `${isActive ? " bg-teal-500 " : " "} flex items-center py-2.5 px-4 space-x-4 rounded`}>
                    <FaTachometerAlt className='text-xl' />
                    <span>Attendance</span>
                </NavLink>
                <NavLink to="/admin-dashboard/employee/salary/add" 
               className={({ isActive }) => `${isActive ? " bg-teal-500 " : " "} flex items-center py-2.5 px-4 space-x-4 rounded`}>
                    <AiOutlineMoneyCollect className='text-xl' />
                    <span>Salary</span>
                </NavLink>
                <NavLink to="/admin-dashboard/accounting"
                className={({ isActive }) => `${isActive ? " bg-teal-500 " : " "} flex items-center py-2.5 px-4 space-x-4 rounded`}>
                    <MdOutlineAccountTree className='text-xl' />
                    <span>Accounting</span>
                </NavLink>
                <NavLink to="/admin-dashboard/purchase" 
                className={({ isActive }) => `${isActive ? " bg-teal-500 " : " "} flex items-center py-2.5 px-4 space-x-4 rounded`}>
                    <BiPurchaseTagAlt className='text-xl' />
                    <span>Purchase</span>
                </NavLink>
                <NavLink to="/admin-dashboard/sales" 
                className={({ isActive }) => `${isActive ? " bg-teal-500 " : " "} flex items-center py-2.5 px-4 space-x-4 rounded`}>
                    <FcSalesPerformance className='text-xl' />
                    <span>Sales</span>
                </NavLink>
                <NavLink to="/admin-dashboard/inventory"
                className={({ isActive }) => `${isActive ? " bg-teal-500 " : " "} flex items-center py-2.5 px-4 space-x-4 rounded`}>
                    <MdOutlineInventory className='text-xl' />
                    <span>Stock Inventory</span>
                </NavLink>
                <NavLink to="/admin-dashboard/settings" 
               className={({ isActive }) => `${isActive ? " bg-teal-500 " : " "} flex items-center py-2.5 px-4 space-x-4 rounded`}>
                    <IoSettingsOutline className='text-xl' />
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    )
}

export default AdminSizeBar
