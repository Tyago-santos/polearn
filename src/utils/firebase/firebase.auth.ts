import {
  createUserWithEmailAndPassword,
  type User,
  type Unsubscribe,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "./firebase.config"; // Sua inicialização do Firebase

export async function userLogin(
  email: string,
  paassword: string,
): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      paassword,
    );

    return userCredential.user;
  } catch (error: unknown) {
    if (!(error instanceof FirebaseError)) {
      throw error;
    }

    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Erro no login:", errorCode, errorMessage);
    throw error; // Repassa o erro para ser tratado na UI
  }
}

export const userRegister = async (
  email: string,
  senha: string,
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha,
    );

    return userCredential.user;
  } catch (error: unknown) {
    if (!(error instanceof FirebaseError)) {
      throw error;
    }

    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Erro no cadastro:", errorCode, errorMessage);
    throw error;
  }
};

export function userLogged(
  onUserChanged?: (user: User | null) => void,
): Unsubscribe {
  return onAuthStateChanged(auth, (user: User | null) => {
    onUserChanged?.(user);
  });
}

export function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export const userLogout = async () => {
  try {
    await signOut(auth);
  } catch (error: unknown) {
    console.error("Error signing out:", error);
  }
};

export async function userFogert(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: unknown) {
    if (!(error instanceof FirebaseError)) {
      throw error;
    }

    console.error("Erro ao enviar e-mail:", error.code);
  }
}
