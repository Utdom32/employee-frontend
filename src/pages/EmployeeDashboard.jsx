import React from 'react'
import SideBar from '../component/employeeDashboard/SideBar'
import {Outlet} from 'react-router-dom'
import Navbar from '../component/dashboard/Navbar'

const EmployeeDashboard = () => {
  return (
    <div className=''>
      <SideBar />
    <div className="
      ml-60
      relative
      ud-dashboard
      ">
      <Navbar />
      <Outlet />
    </div>
    </div>
  )
}

export default EmployeeDashboard
