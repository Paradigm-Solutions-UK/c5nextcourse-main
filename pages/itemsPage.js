import React from 'react';
import dynamic from 'next/dynamic'; // Import dynamic to perform a dynamic import
const PaginatedItems = dynamic(() => import('@/components/PaginatedItems'), { ssr: false });

const ItemsPage = () => {
  return (
    <div className="container">
      <h1>My App</h1>
      <PaginatedItems data={10} />
    </div>
  );
};

export default ItemsPage;


export async function getServerSideProps(context) {
    // Gets data for all the variants from the table
    const response = await fetch(`${process.env.NEXT_API_URL}/variants`)
    const data = await response.json()
    
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
            categoryData
        }
    }
}
