import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoute from "./utils/PrivateRoute";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummuary from "./component/dashboard/AdminSummuary";
import DepartmentList from "./component/department/DepartmentList";
import AddDepartment from "./component/department/AddDepartment";
import EditDepartment from "./component/department/EditDepartment";
import EmployeeList from "./component/employee/EmployeeList";
import AddEmployee from "./component/employee/AddEmployee";
import EditEmployee from "./component/employee/EditEmployee";
import ViewEmployee from "./component/employee/ViewEmployee";
import AddSalary from "./component/salary/AddSalary";
import EmpSalaryView from "./component/salary/EmpSalaryView";
import Summary from "./component/employeeDashboard/Summary";
import Profile from "./component/employeeDashboard/Profile";
import LeaveList from "./component/leave/LeaveList";
import AddLeave from "./component/leave/AddLeave";
import Setting from "./component/employeeDashboard/Setting";
import Table from "./component/leave/Table";
import DetailEmp from "./component/leave/DetailEmp";
import ProductList from "./component/product/ProductList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoute>
          }
        >
          <Route index element={<AdminSummuary />}></Route>
          <Route
            path="/admin-dashboard/departments"
            element={<DepartmentList />}
          ></Route>
          <Route
            path="/admin-dashboard/create-department"
            element={<AddDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/department/:id"
            element={<EditDepartment />}
          ></Route>

          <Route
            path="/admin-dashboard/employees"
            element={<EmployeeList />}
          ></Route>
          <Route
            path="/admin-dashboard/create-employee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/edit/:id"
            element={<EditEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/:id"
            element={<ViewEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/employee/salary/add"
            element={<AddSalary />}
          ></Route>
          <Route
            path="/admin-dashboard/employee/salary/:id"
            element={<EmpSalaryView />}
          ></Route>
          <Route path="/admin-dashboard/leave" element={<Table />}></Route>
          <Route
            path="/admin-dashboard/leave/:id"
            element={<DetailEmp />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/leave/:id"
            element={<LeaveList />}
          ></Route>
          <Route
            path="/admin-dashboard/setting"
            element={<LeaveList />}
          ></Route>
          <Route
            path="/admin-dashboard/product"
            element={<ProductList />}
          ></Route>
        </Route>
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoute>
              <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoute>
          }
        >
          <Route index element={<Summary />}></Route>
          <Route
            path="/employee-dashboard/profile/:id"
            element={<Profile />}
          ></Route>
          <Route
            path="/employee-dashboard/leave/:id"
            element={<LeaveList />}
          ></Route>
          <Route
            path="/employee-dashboard/add-leave"
            element={<AddLeave />}
          ></Route>
          <Route
            path="/employee-dashboard/salary/:id"
            element={<EmpSalaryView />}
          ></Route>
          <Route
            path="/employee-dashboard/setting"
            element={<Setting />}
          ></Route>
          
        </Route>
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
