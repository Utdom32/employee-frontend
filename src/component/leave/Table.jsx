import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { EmployeeButtons } from "../../utils/EmployeeHelper";
import { columns, LeaveButtons } from "../../utils/Leave.Helper";
import DataTable from "react-data-table-component";

const Table = () => {
  const [LeaveList, setLeaveList] = useState([]);
  const [filteredLeaveList, setFilteredLeaveList] = useState([]);
  const fetchLeaveList = async () => {
    try {
      const response = await axios.get(`https://employee-frontend-dti.vercel.app/api/leave`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.leave.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days:
            Math.ceil(
              (new Date(leave.endDate) - new Date(leave.startDate)) /
                (1000 * 60 * 60 * 24)
            ) + 1,
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaveList(data);
        setFilteredLeaveList(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaveList();
  }, []);
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-white text-center mb-4">
          Manage List
        </h1>
      </div>
      <p className="mb-4 text-center text-white">
        Here you can view and manage your leave requests.
      </p>
      <div className="flex justify-between items-center px-4">
        <input
          type="text"
          placeholder="Search Leave"
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredData = LeaveList.filter(
              (leave) =>
                leave.name.toLowerCase().includes(searchTerm) ||
                leave.employeeId.toLowerCase().includes(searchTerm) ||
                leave.leaveType.toLowerCase().includes(searchTerm) ||
                leave.department.toLowerCase().includes(searchTerm)
            );
            setFilteredLeaveList(filteredData);
          }}
          className="border border-gray-200 bg-gray-300 rounded py-2 mb-4 px-5"
        />
        <div className="flex space-x-3">
            <button 
                onClick={() => setFilteredLeaveList(LeaveList)}
                className="px-2 py-1 bg-teal-500 rounded hover:bg-teal-700 text-white">
                All
            </button>
          <button 
          onClick={() => setFilteredLeaveList(LeaveList.filter((leave) => leave.status === "Pending"))}
          className="px-2 py-1 bg-teal-500 rounded hover:bg-teal-700 text-white">
            Pending
          </button>
          <button 
            onClick={() =>
                setFilteredLeaveList(
                LeaveList.filter((leave) => leave.status === "Approved")
                )
            }
          className="px-2 py-1 bg-teal-500 rounded hover:bg-teal-700 text-white">
            Approved
          </button>
          <button 
            onClick={() =>
                setFilteredLeaveList(
                LeaveList.filter((leave) => leave.status === "Rejected")
                )
            }
          className="px-2 py-1 bg-teal-500 rounded hover:bg-teal-700 text-white">
            Rejected
          </button>
        </div>
      </div>
      <DataTable columns={columns} data={filteredLeaveList} pagination />
    </div>
  );
};

export default Table;
