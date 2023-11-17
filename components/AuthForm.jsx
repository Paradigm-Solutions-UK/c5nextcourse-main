import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import firebase from './auth/firebase'; // Adjust the import path according to your file structure
import GoogleSignInButton from './auth/GoogleSignInButton'
import {auth} from "./auth/firebase"
import { signInWithEmailAndPassword } from 'firebase/auth';

// isSignIn is a boolean value which is a prop of AuthForm component
// it will tell the form whether it is for sign in or sign up and behave accordingly

export default function AuthForm({ isSignIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // form is a reference to the form element
    const form = useRef(null)

    function signIn(e) {
        // preventDefault will prevent the default behaviour of the form
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <form ref={form} onSubmit={signIn} className="flex flex-col w-full gap-4">
            {/* isSignIn will be used to conditionally render the name */}
            {/* && is logical and. it return true if all the conditions are true */}
            {
                !isSignIn && (
                    <>
                        <label>
                            Name
                        </label>
                        <input type="text" name="name" className="border p-2 rounded-lg text-lg" />
                    </>
                )
            }


            <label>
                Email
            </label>
            <input 
                type="email" 
                className="border p-2 rounded-lg text-lg w-full"
                onChange={(e) => setEmail(e.target.value)} 
            />
            {/* <span className="text-red-500">{errorBag.email}</span> */}

            <label>
                Password
            </label>
            <input 
                type="password" 
                className="border p-2 rounded-lg text-lg w-full" 
                onChange={(e) => setPassword(e.target.value)}
            />

{/* Conditionally render the text based on isSignIn prop */}
            <button className="px-5 py-2 rounded bg-blue-500 text-gray-50" onClick={signIn}>
                {isSignIn ? 'Sign In' : 'Sign Up'}
            </button>
            {/* <GoogleSignInButton/> */}
        </form>
    )
}
