import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { EmployeeButtons, employeeColumns } from "../../utils/EmployeeHelper";
import axios from "axios";
import './Styles.css'

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://employee-frontend-dti.vercel.app/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log(response.data);
        if (response.data.success) {
          const data = response.data.employees.map((employee, index) => ({
            _id: employee._id,
            sno: index + 1,
            profileImage: (
              <img
                src={`https://employee-frontend-dti.vercel.app/${employee.userId?.profileImage}`}
                className="w-10 h-10 rounded-full"
              />
            ),
            employeeId: employee.employeeId,
            name: employee.userId?.name,
            dob: new Date(employee.dob).toLocaleDateString(),
            department: employee.department.dep_name,
            action: <EmployeeButtons Id={employee._id} />,
          }));

          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const filteredData = employees.filter((employee) =>
      employee.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(filteredData);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-6 ud-dashboard">
          <div className="text-center">
            <h3 className="text-2xl text-white font-bold">
              Management Employee
            </h3>
          </div>
          <div className="flex items-center justify-between px-4">
            <input
              type="text"
              onChange={handleFilter}
              placeholder="Search Employee"
              className=" border border-gray-200 bg-gray-300 rounded py-2 mb-4 px-3 "
            />
            <Link
              to="/admin-dashboard/create-employee"
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 mb-4"
            >
              Create An Employee
            </Link>
          </div>
          <div className="rounded shadow bg-white p-10">
            <DataTable columns={employeeColumns} data={filteredEmployees} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeList;
