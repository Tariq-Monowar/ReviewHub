import { createContext, useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDh3RGf-QDSC-I_7YOqv3kHIQ6b-LirNzc",
  authDomain: "reviewhub-90c61.firebaseapp.com",
  projectId: "reviewhub-90c61",
  storageBucket: "reviewhub-90c61.appspot.com",
  messagingSenderId: "1079752723711",
  appId: "1:1079752723711:web:2149307f4bb4447f4010ca",
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [forUpdateData, setForUpdateData] = useState("");

  const createData = async (userName, content, avatar) => {
    try {
      const imageRef = ref(storage, `uploade/images/${Date.now()}`);
      const uploadResult = await uploadBytes(imageRef, avatar);

      const docRef = await addDoc(collection(firestore, "blog"), {
        userName,
        content,
        avatar: uploadResult.ref.fullPath,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error creating new listing:", error.message);
    }
  };

  const getData = () => {
    return getDocs(collection(firestore, "blog"));
  };
  const getImage = async (path) => {
    return await getDownloadURL(ref(storage, path));
  };

  const deleteData = async (id, avatarPath) => {
    try {
      await deleteDoc(doc(firestore, "blog", id));
      console.log("Document successfully deleted!");

      const imageRef = ref(storage, avatarPath);
      await deleteObject(imageRef);
      console.log("Image successfully deleted!");
    } catch (error) {
      console.error("Error deleting data:", error.message);
    }
  };

  const updateData = async (id, userName, content, avatar, avatarPath) => {
    console.log(avatarPath);
    try {
      if (avatarPath && avatarPath !== avatar) {
        const imageRef = ref(storage, `uploade/images/${Date.now()}`);
        const uploadResult = await uploadBytes(imageRef, avatarPath);

        await setDoc(doc(firestore, "blog", id), {
          userName,
          content,
          avatar: uploadResult.ref.fullPath,
        });

        const oldImageRef = ref(storage, avatar);
        await deleteObject(oldImageRef);
        console.log("Image successfully deleted! if");
      } else {
        await setDoc(doc(firestore, "blog", id), {
          userName,
          content,
          avatar: avatar,
        });
      }
      console.log("Document successfully updated! else");
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        createData,
        getData,
        getImage,
        deleteData,
        updateData,
        forUpdateData,
        setForUpdateData,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
