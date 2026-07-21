import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

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