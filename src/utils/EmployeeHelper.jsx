import axios from "axios";
import { useNavigate } from "react-router-dom";

export const employeeColumns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "100px",
  },
  {
    name: "Employee ID",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "130px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "130px",
  },
  {
    name: "Date of Birth",
    selector: (row) => row.dob,
    width: "130px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    // width: "170px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    $center: true,
  },
];

// fetch departments

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:8080/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.sucess) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.sucess) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

// * fetch employee 


export const getEmployees = async (id) => {
  let employees;
  
  try {
    const response = await axios.get(`http://localhost:8080/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};
export const EmployeeButtons = ({ Id }) => {
  
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
        className="px-3 py-1 bg-teal-500 rounded hover:bg-teal-700 text-white"
      >
        View
      </button>
      <button
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
        className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-700 text-white"
      >
        Edit
      </button>
      <button
        onClick={() => navigate(`/admin-dashboard/employee/salary/${Id}`)}
        className="px-3 py-1 bg-green-500 rounded hover:bg-green-700 text-white"
      >
        Salary
      </button>
      <button
        onClick={() => navigate(`/admin-dashboard/employees/leave/${Id}`)}
        className="px-3 py-1 bg-red-500 rounded hover:bg-red-700 text-white"
      >
        Leaves
      </button>
    </div>
  );
};
