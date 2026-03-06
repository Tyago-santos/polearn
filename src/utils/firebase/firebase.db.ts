import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore();

export async function saveUser(userId: string, name: string, email: string) {
  await setDoc(
    doc(db, "usuarios", userId),
    {
      name: name,
      email: email,
    },
    { merge: true },
  );
}

export async function getUserById(userId: string) {
  const docRef = doc(db, "usuarios", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Dados do usuário:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("Usuário não encontrado!");
    return null;
  }
}

export async function getUsers() {
  const q = query(collection(db, "usuarios"), where("isAdmin", "==", true));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}
