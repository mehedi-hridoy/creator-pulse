import { useState, useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContainer from "../components/auth/AuthContainer";
import GoogleButton from "../components/auth/GoogleButton";
import { motion } from "framer-motion";
import ThemeToggle from "../components/ui/ThemeToggle";

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      toast.success("✨ Welcome back! Login successful.");
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          "Login failed. Please try again."
      );
      toast.error(err?.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000";
    window.location.href = `${apiBase}/auth/google`;
  };

  return (
    <AuthContainer>
      {/* Floating Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left / Visual Panel */}
        <div className="relative hidden overflow-hidden md:block">
          <div className="absolute inset-0 bg-brand-gradient opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(108,99,255,0.4),transparent_60%)]" />
          <div className="flex h-full flex-col justify-between px-10 py-12">
            <div>
              <h2 className="font-heading text-3xl font-semibold tracking-tight 
                           text-light-text-primary dark:text-dark-text-primary">
                Welcome back
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed 
                          text-light-text-secondary dark:text-dark-text-secondary">
                Log in to unlock AI-powered insights on which content drives{" "}
                <span className="text-brand-from font-medium">sales, sponsorships & memberships</span>.
              </p>
            </div>
            <div className="space-y-4 text-xs">
              <Feature text="Unified analytics dashboard" />
              <Feature text="Predictive revenue signals" />
              <Feature text="Membership conversion tracking" />
              <Feature text="Export ready insight reports" />
            </div>
          </div>
        </div>

        {/* Right / Form Panel */}
        <div className="relative border-l border-light-border-soft dark:border-dark-border-soft 
                      bg-light-card-DEFAULT dark:bg-dark-card-DEFAULT 
                      p-8 md:p-10 transition-colors duration-300">
          <div className="mx-auto max-w-sm">
            <h1 className="font-heading text-2xl font-semibold 
                         text-light-text-primary dark:text-dark-text-primary">
              Login to your account
            </h1>
            <p className="mt-2 text-sm text-light-text-muted dark:text-dark-text-muted">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-brand-from hover:text-brand-to transition-colors">
                Sign up
              </Link>
            </p>
            <div className="mt-6 space-y-4">
              <GoogleButton onClick={handleGoogleLogin} label="Sign in with Google" />
              <Divider label="or continue with email" />
              <form onSubmit={onSubmit} className="space-y-4">
                <Field label="Email">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="auth-input"
                  />
                </Field>
                <Field label="Password">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="auth-input"
                  />
                </Field>
                {error && <p className="text-xs text-status-danger">{error}</p>}
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-button bg-brand-gradient px-5 py-3 
                           text-sm font-semibold text-white shadow-glow-brand 
                           transition-all duration-200 disabled:opacity-60 
                           hover:opacity-90"
                >
                  {loading ? "Logging in..." : "Log in"}
                </motion.button>
              </form>
            </div>
            <p className="mt-6 text-center text-xs text-light-text-muted dark:text-dark-text-muted">
              By logging in you agree to our{" "}
              <a href="#" className="underline decoration-light-border-soft dark:decoration-dark-border-soft 
                                   hover:text-light-text-primary dark:hover:text-dark-text-primary">
                Terms
              </a>{" "}
              &{" "}
              <a href="#" className="underline decoration-light-border-soft dark:decoration-dark-border-soft 
                                   hover:text-light-text-primary dark:hover:text-dark-text-primary">
                Privacy
              </a>.
            </p>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary">
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-md 
                     bg-brand-from/20 text-[10px] font-bold text-brand-from">
        ✓
      </span>
      <span className="text-[13px] tracking-tight">{text}</span>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block text-xs font-medium text-light-text-muted dark:text-dark-text-muted">
      {label}
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Divider({ label }) {
  return (
    <div className="flex items-center gap-3 text-[11px] 
                  text-light-text-muted dark:text-dark-text-muted">
      <div className="h-px flex-1 bg-light-border-soft dark:bg-dark-border-soft" />
      <span>{label}</span>
      <div className="h-px flex-1 bg-light-border-soft dark:bg-dark-border-soft" />
    </div>
  );
}

