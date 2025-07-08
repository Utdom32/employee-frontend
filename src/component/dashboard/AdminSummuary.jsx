import React from "react";
import SummaryCard from "./SummaryCard";
import { FaBuilding, FaUsers } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
const AdminSummuary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
  const fetchSummary = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/dashboard/summary",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      setSummary(response);
    } catch (error) {
      if (error.response && !error.response.data.success) {
        // alert(error.response.data.error);
      }
    }
  };
  
    fetchSummary();
  }, []);
  if (!summary) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl text-white font-bold">Loading...</h2>
        </div>    
    );
  }
  return (
    <div
      className="
    overflow-y-scroll
    overflow-x-hidden
    pb-24
    fixed items-center justify-center px-6"
    >
      <h3 className="text-2xl text-white font-bold">Dashbaord Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          text={"Total Employee"}
          number={summary.data.summary.totalEmployees}
          color="bg-teal-500"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text={"Total Departments"}
          number={summary.data.summary.totalDepartments}
          color="bg-gray-600"
        />
        <SummaryCard
          icon={<FaUsers />}
          text={"Monthly Salaries"}
          number={`$ ${summary.data.summary.totalSalaries}.00`}
          color="bg-yellow-500"
        />
      </div>
      <div className="mt-12">
        <h4 className="text-xl text-white text-center font-semibold mt-6">
          Recent Activities
        </h4>
        <div>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <SummaryCard
              icon={<FaUsers />}
              text={"New Employee Added"}
              number={1}
              color="bg-green-500"
            />
            <SummaryCard
              icon={<FaBuilding />}
              text={"New Department Created"}
              number={1}
              color="bg-blue-500"
            />
            <SummaryCard
              icon={<FaUsers />}
              text={"Employee Promoted"}
              number={1}
              color="bg-yellow-500"
            />
          </ul>
        </div>
        <div className="mt-12">
          <h4 className="text-xl text-white text-center font-semibold mt-6">
            leave Detail
          </h4>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <SummaryCard
              icon={<FaUsers />}
              text={"Leave Requests"}
              number={summary.data.summary.employeeAppliedForLeave}
              color="bg-red-500"
            />
            <SummaryCard
              icon={<FaBuilding />}
              text={"Approved Leaves"}
              number={summary.data.summary.leaveSummary.approvedLeaves}
              color="bg-green-500"
            />
            <SummaryCard
              icon={<FaUsers />}
              text={"Pending Requests"}
              number={summary.data.summary.leaveSummary.pendingLeaves}
              // summary.data.summary.leaveSummary.pendingLeaves
              color="bg-yellow-500"
            />
            <SummaryCard
              icon={<FaBuilding />}
              text={"Rejected Requests"}
              number={summary.data.summary.leaveSummary.rejectedLeaves}
              
              color="bg-gray-500"
            />
            {/* <SummaryCard icon={<FaBuilding />} text={"Rejected Requests"} number={1} color="bg-gray-500" />
                <SummaryCard icon={<FaBuilding />} text={"Rejected Requests"} number={1} color="bg-gray-500" />
                <SummaryCard icon={<FaBuilding />} text={"Rejected Requests"} number={1} color="bg-gray-500" /> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSummuary;
