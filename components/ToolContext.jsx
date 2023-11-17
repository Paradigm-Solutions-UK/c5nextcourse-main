import React, {createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

const ToolContext = createContext()

export function useTool() {
    console.log('ToolContext = ',ToolContext)
    return useContext(ToolContext)
    
}

export default function ToolProvider( {children} ) {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setAuthUser(user); // Set the user object if the user is signed in
          } else {
            setAuthUser(null); // Set null if the user is signed out
          }
        });
    
        // Clean up the listener when the hook is unmounted
        return () => unsubscribe();
      }, []);

      console.log('authUser = ',authUser,' aetAuthUser = ',setAuthUser)

    return (
        <ToolContext.Provider value={{authUser, setAuthUser}}>
            {children}
        </ToolContext.Provider>
    );
}