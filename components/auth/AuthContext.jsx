import React, { createContext,useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthContext provider component
export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user); // Set the user object if the user is signed in
      } else {
        setAuthUser(null); // Set null if the user is signed out
      }
      setLoading(false); // Set loading to false once the auth state is determined
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // AuthContext value
  const value = {
    authUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
