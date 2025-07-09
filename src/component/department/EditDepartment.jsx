import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartments] = useState({ dep_name: "", description: "" });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `https://employee-frontend-dti.vercel.app/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.sucess) {
          setDepartments(response.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.sucess)
          alert(error.response.data.error);
      }
    };
    fetchDepartments();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartments({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://employee-frontend-dti.vercel.app/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.sucess) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.sucess) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div>
      <div className="mt-20">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mt-4 addForm  addfarmImage"
        >
          <h3 className="text-2xl font-bold text-center">Update Department</h3>
          <div>
            <label htmlFor="dep_name" className="text-sm font-medium text-gray-700">
              Department Name
            </label>
            <input
              type="text"
              name="dep_name"
              onChange={handleChange}
              value={department.dep_name}
              placeholder="Enter Department Name"
              required
              className="border border-gray-200 bg-gray-300 rounded py-2 px-3 w-full"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              value={department.description}
              rows="4"
              placeholder="Enter Description"
              className="border border-gray-200 bg-gray-300 rounded py-2 px-3 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          >
            Confirm
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;
