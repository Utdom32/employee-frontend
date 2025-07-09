import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchDepartments } from "../../utils/EmployeeHelper";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    salary: 0,
    role: "",
    designation: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    
  });
  
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
      const getDepartment = async () => {
        const departments = await fetchDepartments();
        setDepartments(departments);
      };
      getDepartment();
    }, []);
  useEffect(() => {
    const fetchDepartments = async () => {
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
          // setEmployee(response.data.employee);
          const employee = response.data.employee;
          setEmployee((prev)=> ({...prev, 
            name: employee.userId?.name,
            department: employee.department?.dep_name,
            salary: employee.salary,
            role: employee.userId?.role,
            designation: employee.designation,
            dob: employee.dob,
            gender: employee.gender,
            maritalStatus: employee.maritalStatus
          }))
        }
        console.log(response.data);
      } catch (error) {
        if (error.response && !error.response.data.success)
          alert(error.response.data.error);
      }
    };
    fetchDepartments();
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.put(
        `http://localhost:8080/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
      console.log(response.data.employee);
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <>{departments && employee ? (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rouned-md shadow-md">
      <h2> Update Employee Imformation</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium test-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={employee.name || ""}
              onChange={handleChange}
              placeholder="Insert Name"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div> 
          
          <div>
            <label className="block text-sm font-medium test-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={
                employee.dob
                  ? new Date(employee.dob).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              placeholder="DOB"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium test-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={employee.gender || ""}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium test-gray-700">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              value={employee.maritalStatus || ""}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium test-gray-700">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={employee.designation || ""}
              onChange={handleChange}
              placeholder="Designation"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium test-gray-700">
              Department
            </label>
            <select
              name="department"
              onChange={handleChange}
              value={employee.department}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium test-gray-700">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={employee.salary || ""}
              onChange={handleChange}
              placeholder="Salary"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium test-gray-700">
              Role
            </label>
            <select
              name="role"
              value={employee.role || ""}
              required
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
      
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
        >
          confirm
        </button>
      </form>
    </div>
    ): <div>Loading...</div>}</>
  );
};

export default EditEmployee;
