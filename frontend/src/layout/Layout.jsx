import { NavLink } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function Layout({ children }) {
  const { logout } = useAuthStore();

  const links = [
    { path: "/", label: "Dashboard" },
    { path: "/upload", label: "Upload" },
    { path: "/insights", label: "AI Insights" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 dark:bg-gray-950 text-white px-6 py-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-10 tracking-wide">CreatorPulse</h1>

        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT BUTTON */}
        <button
          onClick={logout}
          className="mt-10 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition font-medium"
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 text-gray-900 dark:text-gray-100 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
