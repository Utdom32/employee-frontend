import { useNavigate, Link } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    sortable: true,
    width: "90px",
  },
  {
    name: "Employee ID",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "120px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "140px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "200px",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "120px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    cell: (row) => (
      <span
        className={`px-2 py-1 rounded ${
          row.status === "Pending"
            ? "bg-yellow-200 text-yellow-800"
            : row.status === "Approved"
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    name: "Action",
    cell: (row) => row.action,
    
  },
];

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/admin-dashboard/leave/${id}`);
  };
  return (
    <div>
      <button
        onClick={() => handleView(Id)}
        className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600"
      >
        View
      </button>
    </div>
  );
};
