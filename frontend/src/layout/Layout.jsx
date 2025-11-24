import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useTheme } from "../contexts/ThemeContext";
import { LayoutDashboard, Upload, Sparkles, LogOut, Zap } from "lucide-react";
import ThemeToggle from "../components/ui/ThemeToggle";

export default function Layout({ children }) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { isDark } = useTheme();

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
    <div className="flex min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary transition-colors duration-300">
      
      {/* WORLD-CLASS SIDEBAR - Desktop (≥1024px, 260px width) */}
      <aside className="hidden lg:flex lg:flex-col w-sidebar 
                        bg-light-card-DEFAULT dark:bg-dark-card-DEFAULT
                        border-r border-light-border-soft dark:border-dark-border-soft
                        transition-colors duration-300">
        
        <div className="p-6 pb-4 border-b border-light-border-soft dark:border-dark-border-soft">
          {/* Logo with gradient */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-brand-gradient bg-clip-text text-transparent">
              CreatorPulse
            </h1>
          </div>
          <p className="text-caption text-light-text-muted dark:text-dark-text-muted mt-1">
            Analytics Dashboard
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 px-3 py-3 rounded-button transition-all duration-200 ${
                    isActive
                      ? "bg-brand-gradient text-white shadow-glow-brand"
                      : "text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-card-hover dark:hover:bg-dark-card-hover hover:text-light-text-primary dark:hover:text-dark-text-primary"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-5 h-5 transition-transform duration-200 ${
                      isActive ? 'scale-110' : 'group-hover:scale-105'
                    }`} />
                    <span className="text-body font-medium">{link.label}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 w-1 h-full bg-white rounded-r-full" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Theme Toggle & Logout */}
        <div className="p-4 pt-0 space-y-2">
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full 
                       bg-status-danger/10 hover:bg-status-danger/20 
                       text-status-danger py-2.5 rounded-button 
                       transition-all duration-200 font-medium text-body 
                       border border-status-danger/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* TABLET SIDEBAR (768px-1023px) - Icon Only */}
      <aside className="hidden md:flex lg:hidden flex-col items-center w-20
                        bg-light-card-DEFAULT dark:bg-dark-card-DEFAULT
                        border-r border-light-border-soft dark:border-dark-border-soft
                        transition-colors duration-300">
        
        {/* Logo Icon Only */}
        <div className="p-4 border-b border-light-border-soft dark:border-dark-border-soft w-full">
          <div className="w-12 h-12 rounded-lg bg-brand-gradient flex items-center justify-center mx-auto">
            <Zap className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Icon Navigation */}
        <nav className="flex-1 px-2 py-6 space-y-2 w-full">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `group flex items-center justify-center w-full h-12 rounded-button transition-all duration-200 ${
                    isActive
                      ? "bg-brand-gradient text-white shadow-glow-brand"
                      : "text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-card-hover dark:hover:bg-dark-card-hover"
                  }`
                }
                title={link.label}
              >
                <Icon className="w-5 h-5" />
              </NavLink>
            );
          })}
        </nav>

        {/* Icon Actions */}
        <div className="p-2 space-y-2 w-full">
          <div className="flex justify-center">
            <ThemeToggle />
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full h-12
                       bg-status-danger/10 hover:bg-status-danger/20 
                       text-status-danger rounded-button 
                       transition-all duration-200
                       border border-status-danger/20"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION BAR (<768px) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 
                      bg-light-card-DEFAULT dark:bg-dark-card-DEFAULT 
                      border-t border-light-border-soft dark:border-dark-border-soft 
                      backdrop-blur-glass shadow-card-light dark:shadow-card-dark
                      transition-colors duration-300">
        <div className="flex items-center justify-around px-2 py-3 max-w-md mx-auto">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-3 py-2 rounded-button min-w-[70px] transition-all duration-200 ${
                    isActive
                      ? "text-brand-from"
                      : "text-light-text-muted dark:text-dark-text-muted"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
                    <span className="text-[10px] font-medium">{link.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-button min-w-[70px] text-status-danger"
          >
            <LogOut className="w-6 h-6" />
            <span className="text-[10px] font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-8">
        {/* Content with responsive padding */}
        <div className="p-4 md:p-section lg:p-8 max-w-content mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
