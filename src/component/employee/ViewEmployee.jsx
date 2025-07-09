import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './Styles.css'

const ViewEmployee = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://employee-frontend-dti.vercel.app/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
        console.log(response.data);
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.sucess)
          alert(error.response.data.error);
      }
    };
    fetchEmployee();
  }, [id]);
  return (
    <div className="bgImage">
    
    <div className=" max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md EmpView">
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center">Employee Details</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <img src={`http://localhost:8080/${employee.userId?.profileImage}`} className="w-70 h-70 rounded-full" />
      </div>
      <div>

      <div className="flex space-x-3 mb-5">
        <p className="font-bold text-lg">Name : </p>
        <p className="text-lg font-medium">{employee.userId?.name}</p>
      </div>
      <div className="flex space-x-3 mb-5">
        <p className="font-bold text-lg">Email : </p>
        <p className="text-lg font-medium">{employee.userId?.email}</p>
      </div>
      <div className="flex space-x-3 mb-5">
        <p className="font-bold text-lg">Gender : </p>
        <p className="text-lg font-medium">{employee.gender}</p>
      </div>
      <div className="flex space-x-3 mb-5">
        <p className="font-bold text-lg">Employee ID : </p>
        <p className="text-lg font-medium">{employee.employeeId}</p>
      </div>
      <div className="flex space-x-3 mb-5">
        <p className="font-bold text-lg">Date of Birth : </p>
        <p className="text-lg font-medium">{new Date(employee.dob).toLocaleDateString()}</p>
      </div>
      <div className="flex space-x-3 mb-5">
        <p className="font-bold text-lg">Department : </p>
        <p className="text-lg font-medium">{employee.department?.dep_name}</p>
      </div>
      <div className="flex space-x-3 mb-5">
        <p className="font-bold text-lg">Role : </p>
        <p className="text-lg font-medium">{employee.userId?.role}</p>
      </div>
      <div className="flex space-x-3 mb-5">
        <p className="font-bold text-lg">Designation : </p>
        <p className="text-lg font-medium">{employee.designation}</p>
      </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default ViewEmployee;
