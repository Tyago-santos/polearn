import { create } from "zustand";

type UserStore = {
  name: string;
  email: string;
  nivel: string;
  language: string;
  userId: string;

  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setLanguage: (language: string) => void;
  setNivel: (nivel: string) => void;
  setUserId: (userId: string) => void;
};

export const userStore = create<UserStore>((set) => ({
  email: "",
  name: "",
  language: "",
  nivel: "",
  userId: "",

  setEmail: (email) => set(() => ({ email })),
  setName: (name) => set(() => ({ name })),
  setLanguage: (language) => set(() => ({ language })),
  setNivel: (nivel) => set(() => ({ nivel })),
  setUserId: (userId) => set(() => ({ userId })),
}));

export default userStore;
