import React from 'react';
import Head from 'next/head';
import Variants from '@/components/Variants';

export default function CardList({ data }) {
  return (
    <div>
      <Head>
        <title>Card List</title>
        <meta name="description" content="Card List" />
      </Head>
      <h1>Card List</h1>
      <Variants data={data} />
    </div>
  );
}

export async function getServerSideProps(context) {
  // Gets data for all the variants from the table
  const response = await fetch(`${process.env.NEXT_API_URL}/variants`);
  const data = await response.json();

  console.log('data', data);
  return {
    props: {
      data,
    },
  };
}
