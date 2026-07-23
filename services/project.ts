import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    getDocs,
    orderBy,
} from "firebase/firestore";

import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export const createProject = async (
    userId: string,
    name: string,
    description: string = ""
) => {
    const docRef = await addDoc(collection(db, "projects"), {
        userId,
        name,
        description,
        template: "blank",
        isStarred: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    return docRef.id;
};

export const getProjects = async (userId: string) => {
    const q = query(
        collection(db, "projects"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};
export const getProjectById = async (projectId: string) => {
    const docRef = doc(db, "projects", projectId);

    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        throw new Error("Project not found");
    }

    return {
        id: docSnap.id,
        ...docSnap.data(),
    };
};