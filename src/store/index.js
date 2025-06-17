import { create } from "zustand";

const useStore = create((set) => ({
    theme: localStorage.getItem("theme") ?? null,
    user: JSON.parse(localStorage.getItem("user")) ?? null,

    setTheme: (value) => set({theme: value}),
    setCredentials: (user) => set({user}),
    signout: () => set({ user: null }),
}));

export default useStore;