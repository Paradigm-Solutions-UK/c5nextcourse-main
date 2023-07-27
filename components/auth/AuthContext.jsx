import React, { createContext,useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthContext provider component
export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState('');
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user); // Set the user object if the user is signed in
      } else {
        setAuthUser(null); // Set null if the user is signed out
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // AuthContext value
  const value = {
    authUser,
    setAuthUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
