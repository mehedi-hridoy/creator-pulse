import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE = import.meta.env.VITE_API_BASE || "https://api.creatorpulse.mehedihridoy.online";

// Initialize token from localStorage if present and set axios header
const initialToken = (typeof window !== 'undefined' && localStorage.getItem('cp_token')) || null;
if (initialToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${initialToken}`;
}

export const useAuthStore = create((set, get) => ({
  user: null,
  token: initialToken,
  loading: false,

  setUser: (user) => set({ user }),

  login: async (email, password) => {
    const res = await axios.post(`${API_BASE}/auth/login`, {
      email,
      password,
    });
    if (res.data?.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      if (typeof window !== 'undefined') localStorage.setItem('cp_token', res.data.token);
    }
    set({ user: res.data.user, token: res.data.token || null });
  },

  signup: async (username, email, password) => {
    const res = await axios.post(`${API_BASE}/auth/register`, {
      username,
      email,
      password,
    });
    if (res.data?.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      if (typeof window !== 'undefined') localStorage.setItem('cp_token', res.data.token);
    }
    set({ user: res.data.user, token: res.data.token || null });
  },

  fetchMe: async () => {
    try {
      set({ loading: true });
      const res = await axios.get(`${API_BASE}/auth/me`);
      if (res.data?.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        if (typeof window !== 'undefined') localStorage.setItem('cp_token', res.data.token);
      }
      set({ user: res.data.user, token: res.data.token || get().token, loading: false });
    } catch (err) {
      set({ user: null, loading: false });
    }
  },

  logout: async () => {
    await axios.post(`${API_BASE}/auth/logout`).catch(() => {});
    delete axios.defaults.headers.common['Authorization'];
    if (typeof window !== 'undefined') localStorage.removeItem('cp_token');
    set({ user: null, token: null });
  },
}));
