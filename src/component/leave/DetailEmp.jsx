import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DetailEmp = () => {
    const navigate = useNavigate();
  const [leave, setLeave] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `https://employee-frontend-dti.vercel.app/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success)
          alert(error.response.data.error);
      }
    };
    fetchLeave();
  }, [id]);
    const ChangeStatus = async (id, status) => {
        try {
        const response = await axios.put(
            `http://localhost:8080/api/leave/${id}`,
            { status },
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            }
        );
        if (response.data.success) {
            alert(response.data.message);
            // Optionally, you can navigate back to the leave list or refresh the page
            navigate("/admin-dashboard/leave");
            // Or you can reload the page to see the changes
            // window.location.reload();
        }
        } catch (error) {
        if (error.response && !error.response.data.success)
            alert(error.response.data.error);
        }
    };
  return (
    <>
      {leave ? (
        <div>
          <div className=" max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center">
                Attendance Details
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={`http://localhost:8080/${leave.employeeId.userId.profileImage}`}
                  className="w-70 h-70 rounded-full"
                />
              </div>
              <div>
                <div className="flex space-x-3 mb-2">
                  <p className="font-bold text-lg">Name : </p>
                  <p className="text-lg font-medium">
                    {leave.employeeId.userId?.name}
                  </p>
                </div>
                <div className="flex space-x-3 mb-2">
                  <p className="font-bold text-lg">Employee ID : </p>
                  <p className="text-lg font-medium">
                    {leave.employeeId.employeeId}
                  </p>
                </div>
                <div className="flex space-x-3 mb-2">
                  <p className="font-bold text-lg">Leave Type :</p>
                  <p className="text-lg font-medium">{leave.leaveType}</p>
                </div>
                <div className="flex space-x-3 mb-2">
                  <p className="font-bold text-lg">Reason : </p>
                  <p className="text-lg font-medium">{leave.reason}</p>
                </div>
                <div className="flex space-x-3 mb-2">
                  <p className="font-bold text-lg">Department : </p>
                  <p className="text-lg font-medium">
                    {leave.employeeId.department?.dep_name}
                  </p>
                </div>
                <div className="flex space-x-3 mb-2">
                  <p className="font-bold text-lg">Start Date : </p>
                  <p className="text-lg font-medium">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex space-x-3 mb-2">
                  <p className="font-bold text-lg">End Date : </p>
                  <p className="text-lg font-medium">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-3 mb-2">
                  <p className="font-bold text-lg">
                    {leave.status === "Pending" ? "Action" : "Status"}
                  </p>
                  {leave.status === "Pending" ? (
                    <div className="flex space-x-2">
                      <button 
                      onClick={() => ChangeStatus(leave._id, "Approved")}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
                        Approve
                      </button>
                      <button 
                        onClick={() => ChangeStatus(leave._id, "Rejected")}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
                        Reject
                      </button>
                    </div>
                  ) : (
                    <p className="text-lg font-medium">{leave.status}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default DetailEmp;
