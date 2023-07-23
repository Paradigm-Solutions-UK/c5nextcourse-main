import AuthForm from '@/components/AuthForm'
import Head from 'next/head'

// signup page

export default function SignUp() {
    return (
        <>
        <Head>
            <title>Sign Up</title>
        </Head>
        <div className="w-full h-96 grid place-items-center">
            {/* authform component. We pass a prop isSignIn to help it understand whether it is sign in or sign up form */}
            <AuthForm isSignIn={false} />
        </div>
        </>
    )
}
