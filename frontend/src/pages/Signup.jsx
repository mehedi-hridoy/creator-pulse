import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import AuthContainer from "../components/auth/AuthContainer";
import GoogleButton from "../components/auth/GoogleButton";
import { useAuthStore } from "../stores/authStore";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, user } = useAuthStore();
  const [username, setUsername] = useState("");
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
      await signup(username, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000";
    window.location.href = `${apiBase}/auth/google`;
  };

  return (
    <AuthContainer>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left / Visual Panel */}
        <div className="relative hidden overflow-hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/40 via-brand-purple/40 to-brand-pink/40 opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.4),transparent_60%)]" />
          <div className="flex h-full flex-col justify-between px-10 py-12">
            <div>
              <h2 className="font-heading text-3xl font-semibold tracking-tight">Join the platform</h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
                Create an account to access unified <span className="text-white">AI analytics</span> that reveal which content drives revenue & growth.
              </p>
            </div>
            <div className="space-y-4 text-xs">
              <Feature text="Multi-platform ingestion" />
              <Feature text="Smart normalization layer" />
              <Feature text="Predictive insight engine" />
              <Feature text="Sponsorship performance signals" />
            </div>
          </div>
        </div>

        {/* Right / Form Panel */}
        <div className="relative border-l border-white/10 bg-black/60 p-8 md:p-10">
          <div className="mx-auto max-w-sm">
            <h1 className="font-heading text-2xl font-semibold">Create your account</h1>
            <p className="mt-2 text-sm text-white/60">
              Already have an account? <Link to="/login" className="text-brand-primary hover:text-white">Log in</Link>
            </p>
            <div className="mt-6 space-y-4">
              <GoogleButton onClick={handleGoogleSignup} label="Sign up with Google" />
              <Divider label="or continue with email" />
              <form onSubmit={onSubmit} className="space-y-4">
                <Field label="Username">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={3}
                    className="auth-input"
                  />
                </Field>
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
                    minLength={6}
                    className="auth-input"
                  />
                </Field>
                {error && <p className="text-xs text-red-400">{error}</p>}
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-brand-primary to-brand-purple px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/30 transition disabled:opacity-60"
                >
                  {loading ? "Creating account..." : "Create account"}
                </motion.button>
              </form>
            </div>
            <p className="mt-6 text-center text-xs text-white/50">
              By signing up you agree to our <a href="#" className="underline decoration-white/30 hover:text-white">Terms</a> & <a href="#" className="underline decoration-white/30 hover:text-white">Privacy</a>.
            </p>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-2 text-white/80">
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-[10px] font-bold text-white/70">✓</span>
      <span className="text-[13px] tracking-tight">{text}</span>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block text-xs font-medium text-white/60">
      {label}
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Divider({ label }) {
  return (
    <div className="flex items-center gap-3 text-[11px] text-white/40">
      <div className="h-px flex-1 bg-white/10" />
      <span>{label}</span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}
