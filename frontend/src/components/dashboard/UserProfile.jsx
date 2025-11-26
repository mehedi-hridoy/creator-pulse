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
      const API_BASE = import.meta.env.VITE_API_BASE || "https://api.creatorpulse.mehedihridoy.online";
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
    <div className="rounded-premium bg-[rgba(255,255,255,0.08)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] p-5 shadow-premium">
      <div className="flex items-start gap-4">
        {/* Avatar with gradient border */}
        <div className="flex-shrink-0">
          <div className="relative">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-premium-purple to-premium-blue p-[2px]">
              <div className="w-full h-full rounded-full bg-navy-deep" />
            </div>
            {/* Avatar content */}
            <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-premium-purple to-premium-blue flex items-center justify-center text-white text-lg font-semibold shadow-lg">
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
                className="w-full px-3 py-2 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.15)] rounded-lg text-text-primary text-body focus:ring-2 focus:ring-premium-purple focus:border-transparent outline-none transition placeholder:text-text-muted"
                placeholder="Enter username"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-premium-purple hover:bg-premium-purple/90 text-white text-label font-medium rounded-lg transition-all duration-200 disabled:opacity-50 shadow-sm"
                >
                  <Check className="h-3.5 w-3.5" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.12)] text-text-secondary hover:text-text-primary text-label font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  <X className="h-3.5 w-3.5" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-card-title text-text-primary font-semibold truncate">
                  {user.username}
                </h3>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:bg-[rgba(255,255,255,0.08)] rounded-md transition-all duration-150 text-text-muted hover:text-premium-purple"
                  title="Edit profile"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-1.5 text-label text-text-secondary mb-2">
                <Mail className="h-3.5 w-3.5" />
                <span className="truncate">{user.email}</span>
              </div>
              {user.googleId && (
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-gradient-to-r from-premium-blue/10 to-premium-purple/10 border border-premium-purple/20 text-premium-purple text-[11px] font-medium rounded-md">
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
  );
}
