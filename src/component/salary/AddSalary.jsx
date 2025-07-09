import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";

const AddSalary = () => {
  const initialEmployeeState = {
    employeeId: "",
    name: "",
    basicSalary: 0,
    role: "",
    allowances: 0,
    deductions: 0,
    payDate: "",
  };

  const [employee, setEmployee] = useState(initialEmployeeState);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [salaries, setSalaries] = useState([]); // New state for salaries
  const navigate = useNavigate();

  // Fetch Departments
  useEffect(() => {
    const getDepartment = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartment();
  }, []);

  // Fetch existing salaries when component mounts
//   useEffect(() => {
//     const fetchSalaries = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/api/salary/all",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         if (response.data.success) {
//           setSalaries(response.data.salaries);
//         }
//       } catch (error) {
//         console.error("Error fetching salaries:", error);
//       }
//     };
//     fetchSalaries();
//   }, []);

  const handleChange = (e) => {
    setEmployee((prevData) => ({ 
      ...prevData, 
      [e.target.name]: e.target.value
    }));
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://employee-frontend-dti.vercel.app/api/salary/add",
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        // Update salaries state with the new salary
        setSalaries(prev => [...prev, response.data.salary]);
        navigate("/admin-dashboard/employees");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.error);
      }
    }
  };

  const handleDepartmentChange = async (event) => {
    const selectedDepartment = event.target.value;
    
    if (!selectedDepartment) {
      setEmployees([]);
      setEmployee(initialEmployeeState);
      return;
    }

    const employeeList = await getEmployees(selectedDepartment);
    setEmployees(employeeList);
    setEmployee(initialEmployeeState);
  };

  const handleEmployeeSelect = (e) => {
    const selectedEmployeeId = e.target.value;
    const selectedEmployee = employees.find(emp => emp._id === selectedEmployeeId);
    
    if (selectedEmployee) {
      // Check if employee already has a salary record
      const existingSalary = salaries.find(s => s.employeeId === selectedEmployee._id);
      
      setEmployee(() => ({
        ...initialEmployeeState,
        employeeId: selectedEmployee._id,
        name: selectedEmployee.userId.name,
        basicSalary: existingSalary?.basicSalary || selectedEmployee.salary || 0,
        role: selectedEmployee.userId.role || "",
        allowances: existingSalary?.allowances || 0,
        deductions: existingSalary?.deductions || 0,
      }));
    } else {
      setEmployee(initialEmployeeState);
    }
  };

  return (
    <>
      {departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-6">Employee Salary</h2>
          <form onSubmit={handleFormSubmission}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  onChange={handleDepartmentChange}
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
                <label className="block text-sm font-medium text-gray-700">
                  Employee
                </label>
                <select
                  name="employeeId"
                  value={employee.employeeId}
                  onChange={handleEmployeeSelect}
                  required
                  disabled={employees.length === 0}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name} ({emp.employeeId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                {/* <input
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                /> */}
                <div>
                    {employee.name}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Basic Salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  value={employee.basicSalary}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allowances
                </label>
                <input
                  type="number"
                  name="allowances"
                  value={employee.allowances}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                  value={employee.deductions}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                {/* <select
                  name="role"
                  value={employee.role}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select> */}
                <div>
                    {employee.role}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pay Date
                </label>
                <input
                  type="date"
                  name="payDate"
                  value={employee.payDate}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
            >
              {salaries.some(s => s.employeeId === employee.employeeId) ? "Update" : "Add"} Salary
            </button>
          </form>

          {/* Optional: Display existing salaries */}
          {salaries.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Existing Salaries</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allowances</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {salaries.map((salary) => (
                      <tr key={salary._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{salary.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{salary.basicSalary}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{salary.allowances}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{salary.deductions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default AddSalary;