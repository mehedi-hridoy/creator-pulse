import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  setUser: (user) => set({ user }),

  login: async (email, password) => {
    const res = await axios.post(`${API_BASE}/auth/login`, {
      email,
      password,
    });
    set({ user: res.data.user });
  },

  signup: async (username, email, password) => {
    const res = await axios.post(`${API_BASE}/auth/register`, {
      username,
      email,
      password,
    });
    set({ user: res.data.user });
  },

  fetchMe: async () => {
    try {
      set({ loading: true });
      const res = await axios.get(`${API_BASE}/auth/me`);
      set({ user: res.data.user, loading: false });
    } catch (err) {
      set({ user: null, loading: false });
    }
  },

  logout: async () => {
    await axios.post(`${API_BASE}/auth/logout`).catch(() => {});
    set({ user: null });
  },
}));
