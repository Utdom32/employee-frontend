import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [employeeDetails, setEmployeeDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getEmployeeDetails = async () => {
      try {
        const response = await axios.get(
          `https://employee-frontend-dti.vercel.app/api/employee/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployeeDetails(response.data.employee);
        }
      } catch (error) {
        console.error(error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    getEmployeeDetails();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-center">Employee Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={`http://localhost:8080/${employeeDetails.userId?.profileImage}`}
          alt="Employee Profile"
          className="w-70 h-70 rounded-full"
        />
        <div>
          <div className="flex space-x-3 mb-5">
            <p className="font-bold text-lg">Name:</p>
            <p className="text-lg font-medium">{employeeDetails.userId?.name}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="font-bold text-lg">Gender:</p>
            <p className="text-lg font-medium">{employeeDetails.gender}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="font-bold text-lg">Employee ID:</p>
            <p className="text-lg font-medium">{employeeDetails.employeeId}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="font-bold text-lg">Date of Birth:</p>
            <p className="text-lg font-medium">{new Date(employeeDetails.dob).toLocaleDateString()}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="font-bold text-lg">Department:</p>
            <p className="text-lg font-medium">{employeeDetails.department?.dep_name}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="font-bold text-lg">Role:</p>
            <p className="text-lg font-medium">{employeeDetails.userId?.role}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="font-bold text-lg">Designation:</p>
            <p className="text-lg font-medium">{employeeDetails.designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

