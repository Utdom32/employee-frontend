import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

const AddLeave = () => {
  const { user } = useAuth();
  const [leave, setLeave] = useState({
    userId: user._id,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/leave/add",
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        alert("Leave request added successfully.");
        navigate(`/employee-dashboard/leave/${user._id}`);
      }else {
        window.location.reload();
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <p className="text-2xl text-center font-bold mb-4">Request for Leave</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Leave Type
            </label>
            <select
              name="leaveType"
              onChange={handleChange}
              className="border border-gray-300 bg-gray-300 rounded p-2 mt-2 w-full px-3"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="annual">Annual Leave</option>
              <option value="maternity">Maternity Leave</option>
              <option value="paternity">Paternity Leave</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 ">
                From Date
              </label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="border w-full border-gray-200 bg-gray-300 rounded p-2 mt-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                To Date
              </label>
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                className="border w-full border-gray-200 bg-gray-300 rounded p-2 mt-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reason
            </label>
            <textarea
              name="reason"
              rows="4"
              onChange={handleChange}
              className="border border-gray-200 bg-gray-300 rounded p-2 mt-2 w-full"
              placeholder="Enter the reason for your leave"
            ></textarea>
          </div>
        </div>
        <button className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md">
          Add Leave
        </button>
      </form>
    </div>
  );
};

export default AddLeave;
