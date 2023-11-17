import React, { createContext,useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthContext provider component
export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState('');
  
  //useEffect without cookies
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setAuthUser(user); // Set the user object if the user is signed in
  //     } else {
  //       setAuthUser(null); // Set null if the user is signed out
  //     }
  //   });

  //   // Clean up the listener when the component unmounts
  //   return () => unsubscribe();
  // }, []);
  
  //useEffect with cookies
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        // Set a cookie with the user's UID
        Cookies.set('firebaseUID', user.uid, { expires: 7 }); // expires in 7 days
      } else {
        setAuthUser(null);
        // Remove the cookie when the user signs out
        Cookies.remove('firebaseUID');
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

export function getAuthUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user); // Resolve the promise with the user object if signed in
      } else {
        resolve(null); // Resolve with null if signed out
      }
      unsubscribe(); // Cleanup the listener
    });
  });
}
