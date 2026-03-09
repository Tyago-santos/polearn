import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import userStore from "../zustand/userStore";
import { db } from "./firebase.config";

export type RankingUser = {
  id: string;
  name: string;
  nivel: string;
  point: number;
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

export async function getUsers() {
  const querySnapshot = await getDocs(collection(db, "usuarios"));

  const users: RankingUser[] = querySnapshot.docs.map((item) => {
    const data = item.data();

    return {
      id: item.id,
      name: typeof data.name === "string" ? data.name : "Sem nome",
      nivel: typeof data.nivel === "string" ? data.nivel : "Nao informado",
      point: typeof data.point === "number" ? data.point : 0,
    };
  });

  return users.sort((a, b) => b.point - a.point);
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
