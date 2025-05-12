import { auth } from "./firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function cadastrarUsuário(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao sair:", error.message);
  }
}

export { login, cadastrarUsuário, logout };
