import React from 'react'
import Head from 'next/head'
import {useState} from 'react'
import Counter from '@/components/Counter'
// import cardColors from '@/data/card_colors';

export default function Variants({ data, colorData, setData, abilityData, attributeData}) {
    console.log(data)
    
    const [colorFilter, setColorFilter] = useState('All');
    const [setFilter, setSetFilter] = useState('All');
    const [abilityFilter, setAbilityFilter] = useState('All');
    const [attributeFilter, setAttributeFilter] = useState('All');
    
    const handleColorFilterChange = (e) => {
      setColorFilter(e.target.value);
    };
    
    const handleSetFilterChange = (e) => {
      setSetFilter(e.target.value);
    };

    const handleAbilityFilterChange = (e) => {
        setAbilityFilter(e.target.value);
      };

    const handleAttributeFilterChange = (e) => {
    setAttributeFilter(e.target.value);
    };
    
    

    const filteredData = data.filter((variant) => {
        const colorMatches = colorFilter === 'All' || variant.details[0].color.some((color) => color.name === colorFilter);
        const setMatches = setFilter === 'All' || variant.details[0].set.some((set) => set.setNumber === setFilter);
        const abilityMatches = abilityFilter === 'All' || variant.details[0].abilities.some((ability) => ability.name === abilityFilter);
        const attributeMatches = attributeFilter === 'All' || variant.details[0].attribute.some((attribute) => attribute.name === attributeFilter);
        // const attributeMatches =
        //     attributeFilter === 'All' ||
        //     (variant.details[0].attributes &&
        //         variant.details[0].attribute.some((attribute) => attribute.name === attributeFilter));

      
        return colorMatches && setMatches && abilityMatches && attributeMatches;
        
      });
      
  
    return (
      <>
        <Head>
          <title>Variants List</title>
          <meta name="description" content="Variants List" />
        </Head>
        <div>
            <label htmlFor='colorFilter'>Filter by Color:</label>
            <select id='colorFilter' value={colorFilter} onChange={handleColorFilterChange}>
                <option value='All'>All</option>
                {colorData.map((color) => (
                <option key={color.id} value={color.name}>{color.name}</option>
                ))}
            </select>
            
        </div>

        <div>
            <label htmlFor='setFilter'>Filter by Set:</label>
            <select id='setFilter' value={setFilter} onChange={handleSetFilterChange}>
                <option value='All'>All</option>
                {setData.map((set) => (
                <option key={set.id} value={set.setNumber}>{set.setNumber} - {set.setName}</option>
                ))}
            </select>
        </div>

        <div>
            <label htmlFor='abilityFilter'>Filter by Ability:</label>
            <select id='abilityFilter' value={abilityFilter} onChange={handleAbilityFilterChange}>
                <option value='All'>All</option>
                {abilityData.map((ability) => (
                <option key={ability.id} value={ability.name}>{ability.name}</option>
                ))}
            </select>
        </div>

        <div>
            <label htmlFor='attributeFilter'>Filter by Attribute:</label>
            <select id='attributeFilter' value={attributeFilter} onChange={handleAttributeFilterChange}>
                <option value='All'>All</option>
                {attributeData.map((attribute) => (
                <option key={attribute.id} value={attribute.name}>{attribute.name}</option>
                ))}
            </select>
        </div>

        <div className='grid grid-cols-5 gap-2 p-1' style={{ alignItems: 'start' }}>
          
          {filteredData.map((variant) => (
            <div className='grid-auto-rows: min-content' key={variant.id} style={{ alignItems: 'start' }}>
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
  


export async function getServerSideProps(context) {
    const response = await fetch(`${process.env.NEXT_API_URL}/variants`)
    const data = await response.json()

    const colorResponse = await fetch(`${process.env.NEXT_API_URL}/colors`)
    const colorData = await colorResponse.json()

    const setResponse = await fetch(`${process.env.NEXT_API_URL}/sets`)
    const setData = await setResponse.json()

    const abilityResponse = await fetch(`${process.env.NEXT_API_URL}/abilities`)
    const abilityData = await abilityResponse.json()

    const attributeResponse = await fetch(`${process.env.NEXT_API_URL}/attributes`)
    const attributeData = await attributeResponse.json()

    console.log("data",data)
    return {
        props: {
            data,
            colorData,
            setData,
            abilityData,
            attributeData
        }
    }
}