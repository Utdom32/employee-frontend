import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

const EmpSalaryView = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const { id } = useParams();
  const {user} = useAuth();
  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/salary/${id}/${user.role}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setSalaries(response.data.salary);
          setFilteredSalaries(response.data.salary);
        } else {
          throw new Error(response.data.error || "Failed to fetch salaries");
        }
      } catch (error) {
       if (error.response && !error.response.data.success) {
       return console.error(error.response.data.error);
        }
      }
    };
    fetchSalaries();
  }, [id]);

  const handleFilter = (query) => {
    const filtered = salaries.filter((salary) =>
      salary.employeeId?.employeeId
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredSalaries(filtered);
  };

  return (
    <div className="overflow-x-auto p-5">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold">Employee Salaries History</h2>
        <div className="flex justify-end my-3">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleFilter(e.target.value)}
            placeholder="Search by Employee ID"
          />
        </div>
      </div>
      {filteredSalaries.length === 0 ? (
        <p className="text-center">No records found.</p>
      ) : (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Allowences
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                deductions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Paid date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSalaries.map((salary, index) => (
              <tr
                key={salary._id}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{salary.employeeId?.employeeId}</td>
                <td className="px-6 py-4">{salary.basicSalary}</td>
                <td className="px-6 py-4">{salary.allowances}</td>
                <td className="px-6 py-4">{salary.deductions}</td>
                <td className="px-6 py-4">{salary.netSalary}</td>
                <td className="px-6 py-4">
                  {new Date(salary.payDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmpSalaryView;
