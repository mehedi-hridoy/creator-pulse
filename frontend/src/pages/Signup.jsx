import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { signup, login } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [loading, setLoading] =
    useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(email, password);
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-brand-bg text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-brand-bg" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-black/70 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        <h1 className="font-heading text-2xl font-semibold">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-gray-300">
          Start tracking your creator analytics in one place.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-6 space-y-4"
        >
          <div>
            <label className="text-xs text-gray-400">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-brand-accent"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>
          <div>
            <label className="text-xs text-gray-400">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-brand-accent"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-brand-primary py-2 text-sm font-medium text-white shadow-soft-glow transition hover:bg-brand-purple disabled:opacity-60"
          >
            {loading
              ? "Creating account..."
              : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-brand-accent hover:text-white"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
