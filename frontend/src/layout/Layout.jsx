import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { LayoutDashboard, Upload, Sparkles, LogOut } from "lucide-react";

export default function Layout({ children }) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const links = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/upload", label: "Upload", icon: Upload },
    { path: "/insights", label: "AI Insights", icon: Sparkles },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-navy-deep via-[#0e1119] to-[#0f1220]">
      
      {/* PREMIUM SIDEBAR - Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-sidebar-gradient text-white px-6 py-8 border-r border-[rgba(255,255,255,0.05)]">
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-[22px] font-semibold tracking-tight bg-gradient-to-r from-premium-purple to-premium-blue bg-clip-text text-transparent">
            CreatorPulse
          </h1>
          <p className="text-label text-text-muted mt-1">Analytics Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-[rgba(123,97,255,0.15)] text-text-primary border-l-[3px] border-premium-purple shadow-purple-glow"
                      : "text-text-secondary hover:bg-[rgba(255,255,255,0.05)] hover:text-text-primary border-l-[3px] border-transparent"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon 
                      className={`w-5 h-5 transition-all duration-200 ${
                        isActive 
                          ? 'text-premium-purple drop-shadow-[0_0_8px_rgba(123,97,255,0.5)]' 
                          : 'group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]'
                      }`} 
                    />
                    <span className="text-body font-medium">{link.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full bg-[rgba(255,77,79,0.13)] hover:bg-[rgba(255,77,79,0.2)] text-status-danger py-2.5 rounded-lg transition-all duration-200 font-medium text-body border border-[rgba(255,77,79,0.2)]"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      {/* MOBILE BOTTOM TAB BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-sidebar-gradient border-t border-[rgba(255,255,255,0.08)] px-4 py-3 backdrop-blur-lg">
        <div className="flex items-center justify-around">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-premium-purple"
                      : "text-text-muted"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon 
                      className={`w-5 h-5 ${
                        isActive ? 'drop-shadow-[0_0_8px_rgba(123,97,255,0.6)]' : ''
                      }`} 
                    />
                    <span className="text-[10px] font-medium">{link.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-status-danger"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-section md:p-8 text-text-primary overflow-y-auto pb-24 md:pb-8">
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
