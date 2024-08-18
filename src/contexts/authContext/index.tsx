import React, { ReactNode } from "react";
import { useEffect, useState, useContext } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

interface AuthContextType {
  isEmailUser: boolean;
  currentUser: FirebaseUser | null;
  userLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setImageURL: React.Dispatch<React.SetStateAction<string | null>>;
  imageURL: string | null;
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  userId: string | null;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [isEmailUser, setIsEmailUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  function initializeUser(user: FirebaseUser | null) {
    if (user) {
      setCurrentUser({ ...user });

      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      setUserLoggedIn(true);

      setUsername(user.displayName || "Pseudo");
    } else {
      setCurrentUser(null);
      setUsername(null);
      setUserLoggedIn(false);
      setImageURL(null);
    }

    setLoading(false);
  }

  const value = {
    isEmailUser,
    currentUser,
    userLoggedIn,
    setUserLoggedIn,
    loading,
    setImageURL,
    imageURL,
    username,
    setUsername,
    userId: currentUser ? currentUser.uid : null,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
