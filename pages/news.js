import React from 'react'
import Head from 'next/head'
import NavBar from '@/components/NavBar';
import { AuthProvider } from '@/components/auth/AuthContext';

export default function News() {
    return (
      <>
        <AuthProvider>
            <Head>
                <title>News</title>
            </Head>
            <NavBar/>
                <div className='flex py-20 relative'>
                    {/* <h1> Coming Soon</h1> */}
                    <img className='w-auto h-auto' src='https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg'/>
                </div>
        </AuthProvider>
      </>
    )
  }