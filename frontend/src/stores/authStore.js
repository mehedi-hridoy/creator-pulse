import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: true,

      // Called on app load / refresh
      checkAuth: async () => {
        try {
          const res = await axios.get("http://localhost:5000/auth/me");
          set({ user: res.data.userId, loading: false });
        } catch (err) {
          set({ user: null, loading: false });
        }
      },

      login: async (email, password) => {
        await axios.post("http://localhost:5000/auth/login", {
          email,
          password,
        });
        set({ user: email }); // or res.data.userId
      },

      signup: async (email, password) => {
        await axios.post("http://localhost:5000/auth/register", {
          email,
          password,
        });
      },

      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: "auth-storage", // persist auth state
    }
  )
);
