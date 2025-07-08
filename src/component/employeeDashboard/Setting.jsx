import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../../context/authContext";

const Setting = () => {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({
      ...setting,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmNewPassword) {
      setError("New password and confirmation do not match.");
    } else {
      try {
        const response = await axios.put(
          "http://localhost:8080/api/setting/change-password",
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          navigate("/employee-dashboard/profile");
          setError("")
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error);
        }
      }
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <p className="text-red-500">{error}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your old password"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your new password"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your new password"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Confirm
        </button>
        <p className="mt-4 text-sm text-gray-500">
          Please ensure your new password is at least 8 characters long and
          contains a mix of letters, numbers, and special characters.
        </p>
      </form>
    </div>
  );
};

export default Setting;
