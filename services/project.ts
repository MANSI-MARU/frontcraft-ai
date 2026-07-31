import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    getDocs,
    orderBy,
    updateDoc,
    doc,
    getDoc,
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
export const saveProjectWorkspace = async (
    projectId: string,
    workspace: {
        generatedFiles: Record<string, string>;
        history: unknown[];
        activeFile: string;
        openTabs: string[];
        device: string;
    }
) => {
    const projectRef = doc(db, "projects", projectId);

    await updateDoc(projectRef, {
        generatedFiles: workspace.generatedFiles,
        history: workspace.history,
        activeFile: workspace.activeFile,
        openTabs: workspace.openTabs,
        device: workspace.device,
        updatedAt: serverTimestamp(),
    });
};