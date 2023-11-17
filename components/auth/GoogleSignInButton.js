import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import firebase from './firebase'; // Adjust the import path according to your file structure


const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebase);
    
    
    signInWithPopup(auth, provider)
      .then((result) => {
        // You can access the signed-in user's information via result.user
        // console.log('Signed in:', result.user);
        
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };

  return (
    <button onClick={handleGoogleSignIn}>Sign in with Google</button>
  );
};

export default GoogleSignInButton;
