import React from 'react'
import Head from 'next/head'

export default function Toppings({data}){
    return(
        <>
            <Head>
                <title>Toppings List</title>
                <meta name="description" content="Toppings List" />
            </Head>
            <div className='flex flex-col gap-4 p-5'>
                {data.map(topping => (
                    <div>
                        <h1 className="text-2xl font-semibold">{topping.name}</h1>
                        <p className='text-base text-gray-500'>{topping.description}</p>
                        <p className='text-base text-gray-500'>{topping.extraPrice}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const response = await fetch(`${process.env.NEXT_API_URL}/toppings`)
    const data = await response.json()
    console.log("data",data)
    return {
        props: {
            data
        }
    }
}