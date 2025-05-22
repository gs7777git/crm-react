import { NavLink } from "react-router-dom";

export default function Sidebar({ user, onLogout }) {
  return (
    <div className="w-64 bg-gray-800 min-h-screen text-white flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-gray-700">
        CRM System
      </div>

      <nav className="flex-grow mt-6 flex flex-col">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            "px-6 py-3 hover:bg-gray-700 " + (isActive ? "bg-gray-700" : "")
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/leads"
          className={({ isActive }) =>
            "px-6 py-3 hover:bg-gray-700 " + (isActive ? "bg-gray-700" : "")
          }
        >
          Leads
        </NavLink>

        {user.role === "Admin" && (
          <NavLink
            to="/users"
            className={({ isActive }) =>
              "px-6 py-3 hover:bg-gray-700 " + (isActive ? "bg-gray-700" : "")
            }
          >
            Users
          </NavLink>
        )}

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            "px-6 py-3 hover:bg-gray-700 " + (isActive ? "bg-gray-700" : "")
          }
        >
          Settings
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            "px-6 py-3 hover:bg-gray-700 " + (isActive ? "bg-gray-700" : "")
          }
        >
          Reports
        </NavLink>
      </nav>

      <button
        onClick={onLogout}
        className="m-6 px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold"
      >
        Logout
      </button>
    </div>
  );
}

