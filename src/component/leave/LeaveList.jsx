import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/authContext";

const LeaveList = () => {
  const { user } = useAuth();
  const [LeaveList, setLeaveList] = useState([]);
  const { id } = useParams();
  let sno = 1;
  const fetchLeaveList = async () => {
    try {
      const response = await axios.get(
        `https://employee-frontend-dti.vercel.app/api/leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        setLeaveList(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.error("Error fetching leave list:", error.response.data.error);
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
          Leave History
        </h1>
      </div>
      <p className="mb-4 text-center text-white">
        Here you can view and manage your leave requests.
      </p>
      <div className="flex justify-between items-center px-4">
        <input
          type="text"
          placeholder="Search Leave"
          className="border border-gray-200 bg-gray-300 rounded py-2 mb-4 px-3"
        />
        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-300"
          >
            Add Leave
          </Link>
        )}
      </div>
      <div className="rounded shadow bg-white p-10 mx-4">
        <table className=" divide-y divide-gray-200 table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Leave Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                From Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                To date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Decription
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {LeaveList.map((leave) => (
              <tr key={leave._id} className="hover:bg-gray-100 cursor-pointer">
                <td className="px-6 py-4">{sno++}</td>
                <td className="px-6 py-4">
                  {leave.leaveType.charAt(0).toUpperCase() +
                    leave.leaveType.slice(1)}{" "}
                  leave
                </td>
                <td className="px-6 py-4 ">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 ">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 ">{leave.reason}</td>
                <td className="px-6 py-4 ">
                  {new Date(leave.appliedDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 ">
                  {leave.status.toLowerCase() === "pending" ? (
                    <span className="text-yellow-500 font-semibold">
                      Pending
                    </span>
                  ) : leave.status.toLowerCase() === "approved" ? (
                    <span className="text-green-500 font-semibold">
                      Approved
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">Rejected</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveList;
