import { useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import { User, Mail, Edit2, Check, X } from "lucide-react";
import toast from "react-hot-toast";

export default function UserProfile() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
      const response = await fetch(`${API_BASE}/auth/update-profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setUsername(user?.username || "");
    setIsEditing(false);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) return null;

  return (
    <div className="relative rounded-card overflow-hidden 
                  bg-light-card-DEFAULT dark:bg-dark-card-DEFAULT
                  border border-light-border-soft dark:border-dark-border-soft 
                  shadow-card-light dark:shadow-card-dark
                  hover:shadow-xl dark:hover:shadow-2xl
                  transition-all duration-300">
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-gradient" />
      
      <div className="p-5">
        <div className="flex items-center gap-4">
          {/* Enhanced Avatar */}
          <div className="relative flex-shrink-0">
            {/* Animated outer glow */}
            <div className="absolute -inset-[2px] rounded-full bg-brand-gradient 
                          opacity-60 blur-sm animate-pulse-glow" />
            {/* Solid gradient ring */}
            <div className="absolute -inset-[1.5px] rounded-full bg-brand-gradient" />
            {/* Avatar container */}
            <div className="relative h-14 w-14 rounded-full 
                          bg-light-bg-primary dark:bg-dark-bg-primary 
                          flex items-center justify-center p-[2px]">
              {/* Avatar with gradient background */}
              <div className="h-full w-full rounded-full bg-brand-gradient 
                            flex items-center justify-center text-white text-[17px] font-bold 
                            shadow-lg">
                {getInitials(user.username)}
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 
                           bg-light-card-hover dark:bg-dark-card-hover 
                           border border-light-border-soft dark:border-dark-border-soft 
                           rounded-input 
                           text-light-text-primary dark:text-dark-text-primary 
                           text-[14px] font-medium
                           focus:ring-2 focus:ring-brand-from/30 focus:border-brand-from 
                           outline-none transition-all duration-200
                           placeholder:text-light-text-muted dark:placeholder:text-dark-text-muted"
                  placeholder="Enter username"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 
                             bg-brand-gradient hover:opacity-90 
                             text-white text-[12px] font-semibold rounded-button 
                             transition-all duration-200 disabled:opacity-50 
                             shadow-glow-brand hover:scale-105 active:scale-95"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 
                             bg-light-card-hover dark:bg-dark-card-hover 
                             hover:bg-light-border-soft dark:hover:bg-dark-border-soft 
                             text-light-text-secondary dark:text-dark-text-secondary 
                             hover:text-light-text-primary dark:hover:text-dark-text-primary 
                             text-[12px] font-semibold rounded-button 
                             transition-all duration-200 disabled:opacity-50
                             hover:scale-105 active:scale-95"
                  >
                    <X className="h-3.5 w-3.5" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[15px] font-bold text-light-text-primary dark:text-dark-text-primary 
                               truncate tracking-tight">
                    {user.username}
                  </h3>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1.5 hover:bg-light-card-hover dark:hover:bg-dark-card-hover 
                             rounded-md transition-all duration-200 
                             text-light-text-muted dark:text-dark-text-muted 
                             hover:text-brand-from group"
                    title="Edit profile"
                  >
                    <Edit2 className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-[12px] 
                              text-light-text-secondary dark:text-dark-text-secondary mb-2.5">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="truncate">{user.email}</span>
                </div>
                {user.googleId && (
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 
                                bg-brand-from/10 dark:bg-brand-from/20 
                                border border-brand-from/30 
                                text-brand-from text-[11px] font-semibold rounded-md
                                hover:bg-brand-from/20 dark:hover:bg-brand-from/30
                                transition-colors duration-200">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google Account
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
