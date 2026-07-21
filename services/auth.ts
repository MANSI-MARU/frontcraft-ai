import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";


import { auth } from "./firebase";

// Google Provider
const googleProvider = new GoogleAuthProvider();

// ----------------------------
// Sign Up
// ----------------------------
export const signUp = async (
    email: string,
    password: string
) => {
    return await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
};

// ----------------------------
// Login
// ----------------------------
export const login = async (
    email: string,
    password: string
) => {
    return await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
};

// ----------------------------
// Google Login
// ----------------------------
export const googleLogin = async () => {
    return await signInWithPopup(
        auth,
        googleProvider
    );
};

// ----------------------------
// Logout
// ----------------------------
export const logout = async () => {
    return await signOut(auth);
};

// ----------------------------
// Forgot Password
// ----------------------------
export const forgotPassword = async (
    email: string
) => {
    return await sendPasswordResetEmail(
        auth,
        email
    );
};