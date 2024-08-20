import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

// Fonction pour créer un utilisateur avec email et mot de passe
export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Fonction pour se connecter avec email et mot de passe
export const doSignInWithEmailAndPassword = (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Fonction pour se déconnecter
export const doSignOut = () => {
  return auth.signOut();
};

// Fonction pour réinitialiser le mot de passe
export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

// Fonction pour changer le mot de passe
export const doPasswordChange = async (password: string) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No authenticated user found");
  }
  return updatePassword(user, password);
};

// Fonction pour envoyer un email de vérification
export const doSendEmailVerification = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No authenticated user found");
  }
  return sendEmailVerification(user, {
    url: `${window.location.origin}/home`,
  });
};
