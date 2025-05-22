import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Leads from "./pages/Leads";

import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  const [user, setUser] = useState(null);

  function handleLogout() {
    setUser(null);
  }

  function handleLogin(userData) {
    setUser(userData);
  }

  return (
    <Router>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="flex">
          <Sidebar user={user} onLogout={handleLogout} />
          <div className="flex-grow bg-gray-100 min-h-screen">
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute user={user}>
                    <Dashboard user={user} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <PrivateRoute user={user} allowedRoles={["Admin"]}>
                    <Users />
                  </PrivateRoute>
                }
              />
              <Route
                path="/leads"
                element={
                  <PrivateRoute user={user}>
                    <Leads />
                  </PrivateRoute>
                }
              />
              <Route
                path="*"
                element={<Navigate to="/dashboard" replace />}
              />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

