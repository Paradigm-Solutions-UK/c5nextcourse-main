import React from 'react';
import Head from 'next/head';
import Counter from '@/components/Counter';
import Filtering from '@/components/Filtering';

export default function Variants({ data }) {
  return (
    <>
      <Head>
        <title>Variants List</title>
        <meta name="description" content="Variants List" />
      </Head>
      <Filtering data={data} />
      <div className="grid grid-cols-5 gap-2 p-1" style={{ alignItems: 'start' }}>
        {/* Render filtered data */}
        {data.map((variant) => (
          <div
            className="grid-auto-rows: min-content"
            key={variant.id}
            style={{ alignItems: 'start' }}
          >
            <img src={variant.imgSource} alt={variant.details[0].name} />
            <div>
              <Counter />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
