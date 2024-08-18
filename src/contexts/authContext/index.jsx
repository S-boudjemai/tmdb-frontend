import React from "react";
import { useEffect, useState, useContext } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageURL, setImageURL] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  function initializeUser(user) {
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
