import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {

  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartment, setFilterDepartment] = useState([])
  const onDeleteDepartment = async () => {
    fetchDepartments();
  };
const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          "https://employee-frontend-dti.vercel.app/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.sucess) {
          let sno = 1;
          const data = await response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            description: dep.description,
            action: (
              <DepartmentButtons
                _id={dep._id}
                onDeleteDepartment={onDeleteDepartment}
              />
            ),
          }));
          setDepartments(data);
          setFilterDepartment(data)
        }
      } catch (error) {
        
        if (error.response && !error.response.data.sucess)
          alert(error.response.data.error);
      } finally {
        setDepLoading(false);
      }
    };
  useEffect(() => {
    
    fetchDepartments();
  }, []);
  const filterDepartment = async (e) => {
    const records = departments.filter((dep)=> dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilterDepartment(records)
  }
  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5 ud-dashboard">
          <div className="text-center">
            <h3 className="text-2xl text-white font-bold">Management Departments</h3>
          </div>
          <div className="flex items-center justify-between px-4">
            <input
              type="text"
              onChange={filterDepartment}
              placeholder="Search Departments"
              className=" border border-gray-200 bg-gray-300 rounded py-2 mb-4 px-3 "
            />
            <Link
              to="/admin-dashboard/create-department"
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 mb-4"
            >
              Create Department
            </Link>
          </div>
          <div className="
          rounded
          shadow
          bg-white
          p-10
          ">
            <DataTable columns={columns} data={filteredDepartment}  />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
