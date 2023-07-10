import React from 'react'
import Head from 'next/head'
import {useState} from 'react'
import Counter from '@/components/Counter'
// import cardColors from '@/data/card_colors';

export default function Variants({ data, colorData, setData }) {
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
    
    

    const filteredData = data.filter((variant) => {
        const colorMatches = colorFilter === 'All' || variant.details[0].color.some((color) => color.name === colorFilter);
        const setMatches = setFilter === 'All' || variant.details[0].set.some((set) => set.setNumber === setFilter);
        // const abilityMatches = abilityFilter === 'All' || variant.details[0].abilities.includes(abilityFilter);
        // const attributeMatches = attributeFilter === 'All' || variant.details[0].attributes.includes(attributeFilter);
      
        return colorMatches && setMatches;
        // return colorMatches && setMatches && abilityMatches && attributeMatches;
        
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
            
            {/* <select id='colorFilter' value={colorFilter} onChange={handleColorFilterChange}>
              <option value='All'>All</option>
              <option value='Red'>Red</option>
              <option value='Green'>Green</option>
              <option value='Blue'>Blue</option>
              <option value='Purple'>Purple</option>
              <option value='Black'>Black</option>
              <option value='Yellow'>Yellow</option>
              <option value='Multi-Colored'>Multi-Colored</option>

            </select> */}
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
  
//   function Counter() {
//     const [count, setCount] = useState(0);
    
//     function increment() {
//       setCount(count + 1);
//     }
    
//     function decrement() {
//       setCount(count - 1);
//     }
    
//     return (
//         <div className='flex justify-between items-center' style={{ alignItems: 'center', height: '24px' }}>
//           <button onClick={decrement} style={{ width: '50px', height: '24px', border: '1px solid red', backgroundColor: 'red', color: 'white' }}>-</button>
//           <span style={{ flex: 1, height: '24px', border: '1px solid white', backgroundColor: 'white', color: 'black', textAlign: 'center' }}>{count}</span>
//           <button onClick={increment} style={{ width: '50px', height: '24px', border: '1px solid green', backgroundColor: 'green', color: 'white' }}>+</button>
//         </div>
//       );
//   }
  

// export default function Variants({ data }) {
//     const [filter, setFilter] = useState('');

//     const handleFilterChange = (e) => {
//         setFilter(e.target.value);
//     };

//     const filteredData = data.filter((variant) => {
//         return variant.details[0].color === filter;
//     });

//     return (
//       <>
//         <Head>
//           <title>Variants List</title>
//           <meta name="description" content="Variants List" />
//         </Head>
//         <div className='grid grid-cols-5 gap-2 p-1' style={{ alignItems: 'start' }}>
//           {data.map((variant) => (
//             <div className='grid grid-flow-row auto-rows-auto gap-1 p-1' key={variant.id} style={{ alignItems: 'start' }}>
//                 <img src={variant.imgSource} alt={variant.details[0].name} />
//                 <Counter />

//             </div>
//           ))}
//         </div>
//       </>
//     );
//   }
  
//   function Counter() {
//     const [count, setCount] = useState(0);
    
//     function increment() {
//       setCount(count + 1);
//     }
    
//     function decrement() {
//       setCount(count - 1);
//     }
    
//     return (
//         <div className='flex justify-between items-start' style={{ display: 'inline-flex', height: '24px' }}>
//         <button onClick={decrement} style={{  alignItems: 'start', width: '50px', height: '24px', border: '1px solid red', backgroundColor: 'red', color: 'white' }}>-</button>
//         <span  style={{alignItems: 'start'}}>{count}</span>
//         <button onClick={increment} style={{ width: '50px', height: '24px', border: '1px solid green', backgroundColor: 'green', color: 'white' }}>+</button>
//       </div>
//     );
//   }
  
  
  
  
  

export async function getServerSideProps(context) {
    const response = await fetch(`${process.env.NEXT_API_URL}/variants`)
    const data = await response.json()

    const colorResponse = await fetch(`${process.env.NEXT_API_URL}/colors`)
    const colorData = await colorResponse.json()

    const setResponse = await fetch(`${process.env.NEXT_API_URL}/sets`)
    const setData = await setResponse.json()

    console.log("data",data)
    return {
        props: {
            data,
            colorData,
            setData
        }
    }
}