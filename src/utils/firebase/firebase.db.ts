import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import userStore from "../zustand/userStore";
import { db } from "./firebase.config";

export type RankingUser = {
  id: string;
  name: string;
  nivel: string;
  point: number;
};

const normalizeNivel = (nivel: string) => {
  const value = nivel.toLowerCase();

  if (value.includes("inic")) return "iniciante";
  if (value.includes("inter")) return "intermediario";
  if (value.includes("avan")) return "avancado";

  return value;
};

export async function saveUser(
  userId: string,
  name: string,
  email: string,
  nivel: string,
  language: string,
) {
  await setDoc(
    doc(db, "usuarios", userId),
    {
      name: name,
      email: email,
      nivel: nivel,
      language: language,
    },
    { merge: true },
  );
}

export async function getUserById(userId: string) {
  const docRef = doc(db, "usuarios", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

export async function getUsers(nivel?: string) {
  const usersRef = collection(db, "usuarios");
  const normalizedNivel = nivel ? normalizeNivel(nivel) : "";
  let querySnapshot;

  try {
    querySnapshot = nivel
      ? await getDocs(
          query(
            usersRef,
            where("nivel", "==", normalizedNivel),
            orderBy("point", "desc"),
            limit(10),
          ),
        )
      : await getDocs(query(usersRef, orderBy("point", "desc"), limit(10)));
  } catch (error) {
    querySnapshot = await getDocs(usersRef);
  }

  const users: RankingUser[] = querySnapshot.docs.map((item) => {
    const data = item.data();

    return {
      id: item.id,
      name: typeof data.name === "string" ? data.name : "Sem nome",
      nivel: typeof data.nivel === "string" ? data.nivel : "Nao informado",
      point: typeof data.point === "number" ? data.point : 0,
    };
  });

  return users
    .filter((user) =>
      normalizedNivel ? normalizeNivel(user.nivel) === normalizedNivel : true,
    )
    .sort((a, b) => b.point - a.point)
    .slice(0, 10);
}

export async function userSavePoints(userId: string) {
  const docRef = doc(db, "usuarios", userId);
  const docSnap = await getDoc(docRef);
  const { pointCorrect } = userStore.getState();

  if (docSnap.exists()) {
    if (docSnap.data().point) {
      if (pointCorrect > docSnap.data().point) {
        await setDoc(
          doc(db, "usuarios", userId),
          {
            point: pointCorrect,
          },
          { merge: true },
        );
      }
    } else {
      await setDoc(
        doc(db, "usuarios", userId),
        {
          point: pointCorrect,
        },
        { merge: true },
      );
    }
  }
}
