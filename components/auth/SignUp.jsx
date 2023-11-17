import React, {useState} from "react";
// import firebase from '@/components/firebase'; // Adjust the import path according to your file structure
import {auth} from "@/components/auth/firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import GoogleSignInButton from "./GoogleSignInButton";


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const signInElement = document.getElementById('SignInButtonDiv');
    // const signUpElement = document.getElementById('SignUpButtonDiv');
  
    // preventDefault will prevent the default behaviour of the form
    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            console.log(userCredential);
            })
            .catch((error) => {
            console.log(error);
            });
            console.log("Yup, working so far")
            // signInElement.style.display = 'none';
            // signUpElement.style.display = 'none';
    }
    

  return (
    <div className='sign-in-container'>
        <form className="flex flex-col w-full gap-4" onSubmit={signUp}>
            <h1 className="text-lg font-bold" >Create an Account</h1>
            <label>
                Email
            </label>
            <input 
                type="email"
                className="border p-2 rounded-lg text-lg w-full"
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label>
                Password
            </label>
            <input 
                type="password"
                className="border p-2 rounded-lg text-lg w-full"
                id='pw1'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button className="px-5 py-2 rounded bg-blue-500 text-gray-50" type="submit">Sign Up</button>
            <GoogleSignInButton/>
        </form>
    </div>
    
  )
}

export default SignUp