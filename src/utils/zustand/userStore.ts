import { create } from "zustand";

type UserStore = {
  name: string;
  email: string;
  nivel: string;
  language: string;
  userId: string;

  pointCorrect: number;
  pointError: number;
  range: number;

  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setLanguage: (language: string) => void;
  setNivel: (nivel: string) => void;
  setUserId: (userId: string) => void;

  setPointCorrect: (pointCorrect: number) => void;
  setPointError: (pointError: number) => void;
  resetPoints: () => void;
  setRange: (range: number) => void;
};

export const userStore = create<UserStore>((set) => ({
  email: "",
  name: "",
  language: "",
  nivel: "",
  userId: "",

  pointCorrect: 0,
  pointError: 0,
  range: 10,

  setEmail: (email) => set(() => ({ email })),
  setName: (name) => set(() => ({ name })),
  setLanguage: (language) => set(() => ({ language })),
  setNivel: (nivel) => set(() => ({ nivel })),
  setUserId: (userId) => set(() => ({ userId })),
  setPointCorrect: (pointCorrect) =>
    set((state) => ({ pointCorrect: state.pointCorrect + pointCorrect })),
  setPointError: (pointError) =>
    set((state) => ({ pointError: state.pointError + pointError })),
  resetPoints: () => set(() => ({ pointCorrect: 0, pointError: 0 })),
  setRange: (range) => set(() => ({ range })),
}));

export default userStore;
