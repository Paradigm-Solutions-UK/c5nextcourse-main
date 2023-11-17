import React from 'react'
import Head from 'next/head'
import SideBar from '@/components/SideBar'

export default function Pizzas({data}){
    return(
        <>
            <Head>
                <title>Pizzas List</title>
                <meta name="description" content="Pizzas List" />
            </Head>
            <div className='flex flex-col gap-4 p-5'>
                <SideBar/>
                {/* {data.map(pizza => (
                    <div className='p-2 border-rounded'>
                        <h1 className="text-2xl font-semibold">{pizza.name}</h1>
                        <p className='text-base text-gray-500'>{pizza.description}</p>
                    </div>
                ))} */}
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const response = await fetch(`${process.env.NEXT_API_URL}/pizzas`)
    const data = await response.json()
    console.log("data",data)
    return {
        props: {
            data
        }
    }
}