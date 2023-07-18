import { useState, useRef } from 'react'
import { useRouter } from 'next/router'

// isSignIn is a boolean value which is a prop of AuthForm component
// it will tell the form whether it is for sign in or sign up and behave accordingly

export default function AuthForm({ isSignIn }) {
    // form is a reference to the form element
    const form = useRef(null)

    // router is a reference to the router object we use to navigate between pages
    // useRouter is a hook provided by nextjs to get the router object
    const router = useRouter()

    // errorBag is our reactive state of type object which will hold the error messages
    const [errorBag, setErrorBag] = useState({
        name: "",
        email: "",
        password: ""
    })

    // resetsErrorBag is a function which will reset the errorBag state
    function resetsErrorBag(){
        setErrorBag({
            name: "",
            email: "",
            password: ""
        })
    }

    // signIn is a function which will be called when the form is submitted
    // it will send the data to the server and handle the response

    function signIn(e) {
        // preventDefault will prevent the default behaviour of the form
        e.preventDefault()
        // formData is a reference to the form's data
        // FormData is a built in class in javascript which will help us to get the form's data
        const formData = new FormData(form.current)

        // Object.fromEntries is a built in function in javascript which will convert the form's data
        // data is an object which will hold the form's data
        const data = Object.fromEntries(formData)

        // baseUrl is the url of our api server
        // NEXT_PUBLIC_API_URL is an environment variable which is set in .env file
        // .env file is a file which is used to store environment variables
        // NEXT_PUBLIC_API_URL is a public environment variable which can be accessed in the client side
        const baseUrl = process.env.NEXT_PUBLIC_API_URL

        // suffix is the suffix of the url which will be different for sign in and sign up
        // if isSignIn is true then suffix will be '/attendance/signin' else it will be '/attendance/signup'
        let suffix = isSignIn ? '/attendance/signin' : '/attendance/signup'
        
        
        // final url will be the combination of baseUrl and suffix
        const endPoint = baseUrl + suffix
        
        // resets the errorBag state so that we can show the new errors if there are any
        resetsErrorBag()
        
        // fetch is a built in function in javascript which will help us to send requests to the server
        // fetch will return a promise which will resolve to the response from the server
        // we will use .then() to handle the response
        // we will use .catch() to handle the error
        // we need to send data in the body of the request so we will use the body property of fetch
        // it has to be a string so we will use JSON.stringify() to convert the data to string
        fetch(endPoint, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            // if there is an error in the response then we will set the errorBag state
            // ? is a optional chaining operator which will check if the data object has a property named detail
            const detail = data?.detail
            // if there is an error then we will set the errorBag state
            if(detail)
            {
                // detail is an array of objects
              console.log("entered in error section", detail)
            //   detail[0] is the first object in the array
               let firstError = detail[0]
            //    firstError.loc[1] is the name of the field which has the error
            //   firstError.msg is the error message
            //  we will set the errorBag state with the name of the field and the error message
               let loc = firstError.loc[1]
               setErrorBag(prev => ({...prev, [loc]: firstError.msg}))
               return

            //    consoling helps to understand the error and see what we get from the server
            }

            // if there is no error then we will redirect the user to the verification page
            // generally in real app you will store the user data in local storage or cookies
            // http cookie is safer than local storage
            router.replace('/verification')
          
        }).catch(err => {
            // if there is an error in the request then we will log it in the console
            console.log("error happened ", err)
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
            <input type="email" name="email" className="border p-2 rounded-lg text-lg w-full" />
            <span className="text-red-500">{errorBag.email}</span>

            <label>
                Password
            </label>
            <input type="password" name="password" className="border p-2 rounded-lg text-lg w-full" />

{/* Conditionally render the text based on isSignIn prop */}
            <button className="px-5 py-2 rounded bg-blue-500 text-gray-50" onClick={signIn}>
                {isSignIn ? 'Sign In' : 'Sign Up'}
            </button>
        </form>
    )
}
