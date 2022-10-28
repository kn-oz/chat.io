import { createContext, useEffect, useState } from "react";
import {onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>{children}</AuthContext.Provider>
  );
}
