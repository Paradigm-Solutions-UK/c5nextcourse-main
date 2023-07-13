import React from 'react';
import Head from 'next/head';
// import Variants from '@/components/Variants';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';

export default function CardList({ data }) {
  return (
    <div>
      <Head>
        <title>Card List</title>
        <meta name="description" content="Card List" />
      </Head>
      <div>
        {/* <div><SideBar/></div> */}
        
        <div><NavBar/></div>
        
      </div>
      
      {/* <Variants data={data} /> */}
    </div>
  );
}

// export async function getServerSideProps(context) {
//   // Gets data for all the variants from the table
//   const response = await fetch(`${process.env.NEXT_API_URL}/variants`);
//   const data = await response.json();

//   console.log('data', data);
//   return {
//     props: {
//       data,
//     },
//   };
// }
