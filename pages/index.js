import React from 'react'
import Head from 'next/head'
import {useState} from 'react'
import _ from 'lodash';
import Counter from '@/components/Counter'
import NavBar from '@/components/NavBar';
import Variants from '@/components/Variants';
import PopOutMenu from '@/components/PopOutMenu';
import SignIn from '@/components/auth/SignIn';

// const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  return (
    <>
      <Head>
        <title>Card Library</title>
      </Head>

      {/* <NavBar/> */}
      <SignIn/>
      <div className='flex py-20 relative'>
        <Variants/>
      </div>
      
    </>
  )
}

export async function getServerSideProps(context) {
  const { page = 1, pageSize = 120 } = context.query;

  // Calculate the offset to fetch data based on the current page and page size
  const offset = (page - 1) * pageSize;

  // Fetch data for the current page and page size from the table
  const response = await fetch(`${process.env.NEXT_API_URL}/variants?offset=${offset}&pageSize=${pageSize}`);
  const data = await response.json();
  
  //Retrieves data from the various populating tables to fill in the drop down lists for filtering
  const colorResponse = await fetch(`${process.env.NEXT_API_URL}/colors`)
  const colorData = await colorResponse.json()

  const setResponse = await fetch(`${process.env.NEXT_API_URL}/sets`)
  const setData = await setResponse.json()

  const abilityResponse = await fetch(`${process.env.NEXT_API_URL}/abilities`)
  const abilityData = await abilityResponse.json()

  const attributeResponse = await fetch(`${process.env.NEXT_API_URL}/attributes`)
  const attributeData = await attributeResponse.json()

  const typesResponse = await fetch(`${process.env.NEXT_API_URL}/types`)
  const typesData = await typesResponse.json()

  const categoryResponse = await fetch(`${process.env.NEXT_API_URL}/categories`)
  const categoryData = await categoryResponse.json()

  console.log("data",data)
  return {
      props: {
          data,
          colorData,
          setData,
          abilityData,
          attributeData,
          typesData,
          categoryData,
          currentPage: parseInt(page),
          totalPages: Math.ceil(data.totalCount / pageSize),
      }
  }
}
