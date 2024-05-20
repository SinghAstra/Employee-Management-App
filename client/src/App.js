import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import employeeData from "./data/employeeData";
import AddEmployeePage from "./pages/AddEmployeePage";
import Dashboard from "./pages/Dashboard";
import EditEmployeePage from "./pages/EditEmployeePage";
import EmployeeDetails from "./pages/EmployeeDetails";
import EmployeeManagement from "./pages/EmployeeManagement";
import LoginPage from "./pages/LoginPage";

function App() {
  const [employees, setEmployees] = useState(employeeData);

  const updateEmployee = (id, updatedEmployee) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? { ...employee, ...updatedEmployee } : employee
      )
    );
    toast.success("Team updated successfully!");
  };

  const addEmployee = (employee) => {
    setEmployees([{ ...employee, id: employees.length + 1 }, ...employees]);
    toast.success("Employee added successfully!");
  };

  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard employees={employees} />} />
          <Route
            path="/manage"
            element={
              <EmployeeManagement
                employees={employees}
                setEmployees={setEmployees}
              />
            }
          />
          <Route
            path="/details/:id"
            element={<EmployeeDetails employees={employees} />}
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute roles={["admin", "manager"]}>
                <EditEmployeePage
                  employees={employees}
                  onUpdate={updateEmployee}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AddEmployeePage onAdd={addEmployee} />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
