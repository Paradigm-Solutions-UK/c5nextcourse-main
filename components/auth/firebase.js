// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGyx_1uCIf2_uwmoBGVUrRU2HEnIJz7lQ",
  authDomain: "careful-cumulus-393315.firebaseapp.com",
  projectId: "careful-cumulus-393315",
  storageBucket: "careful-cumulus-393315.appspot.com",
  messagingSenderId: "251192240453",
  appId: "1:251192240453:web:da86ed836737167029762c",
  measurementId: "G-TTMERHQ6CG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// export default firebase;

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {app, auth};