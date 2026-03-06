import {
  createUserWithEmailAndPassword,
  type User,
  type Unsubscribe,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "./firebase.config"; // Sua inicialização do Firebase

export async function userLogin(email: string, senha: string): Promise<User> {
  try {
    // Await espera a promessa ser resolvida
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);

    // Login realizado com sucesso
    const user = userCredential.user;
    console.log("Usuário logado:", user.uid);
    return user;
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
    // 2. Chama a função de cadastro com await
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha,
    );

    // 3. Usuário criado com sucesso
    const user = userCredential.user;
    console.log("Usuário cadastrado:", user.email);
    return user;
  } catch (error: unknown) {
    if (!(error instanceof FirebaseError)) {
      throw error;
    }

    // 4. Tratamento de erro (email duplicado, senha fraca, etc.)
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Erro no cadastro:", errorCode, errorMessage);
    throw error; // Repassa o erro para ser tratado na interface
  }
};

export function userLogged(
  onUserChanged?: (user: User | null) => void,
): Unsubscribe {
  return onAuthStateChanged(auth, (user: User | null) => {
    onUserChanged?.(user);

    if (user) {
      // Usuário está logado
      console.log(user.uid);
    } else {
      // Usuário está deslogado
    }
  });
}
