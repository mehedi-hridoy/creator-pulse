import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { LayoutDashboard, Upload, Sparkles, Lightbulb, LogOut } from "lucide-react";
import ThemeToggle from "../components/ui/ThemeToggle";

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
    { path: "/recommendations", label: "Recommendations", icon: Lightbulb },
  ];

  return (
    <div className="flex min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      
      {/* \ud83d\udcbb PREMIUM SIDEBAR - Desktop (Linear/Stripe inspired) */}
      <aside className="hidden md:flex md:flex-col w-72 glass-card-lg rounded-none border-r border-border px-7 py-8">
        {/* Logo & Theme Toggle */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-[22px] font-bold gradient-text">
              CreatorPulse
            </h1>
            <ThemeToggle />
          </div>
          <p className="text-[11px] text-muted-foreground font-medium tracking-wide">Analytics Platform</p>
        </div>

        {/* \ud83e\udded Navigation with gradient active states */}
        <nav className="flex-1 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3.5 px-4 py-3.5 rounded-[14px] transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-glow-indigo"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-sm' : ''}`} />
                    <span className="text-[14px] font-semibold">{link.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* \ud83d\udeaa Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2.5 w-full bg-[#EF4444]/10 hover:bg-[#EF4444]/20 text-[#EF4444] py-3.5 rounded-[14px] transition-all duration-200 font-semibold text-[14px] border border-[#EF4444]/20 hover:border-[#EF4444]/30"
        >
          <LogOut className="w-4.5 h-4.5" />
          Logout
        </button>
      </aside>

      {/* \ud83d\udcf1 FLOATING BOTTOM TAB BAR - Mobile */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50 glass-card-lg rounded-[20px] border border-border px-3 py-3 shadow-glass-lg">
        <div className="flex items-center justify-around">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1.5 px-3 py-2 rounded-[12px] transition-all duration-200 min-w-[70px] ${
                    isActive
                      ? "bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white"
                      : "text-muted-foreground"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-semibold">{link.label}</span>
              </NavLink>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1.5 px-3 py-2 rounded-[12px] text-[#EF4444] min-w-[70px]"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Logout</span>
          </button>
        </div>
      </div>

      {/* \u2728 MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto pb-28 md:pb-10">
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
      
      {/* \ud83c\udf19 Mobile Theme Toggle - Floating Top Right */}
      <div className="md:hidden fixed top-5 right-5 z-40">
        <ThemeToggle />
      </div>
    </div>
  );
}
