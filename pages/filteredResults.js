import React from 'react'
import Head from 'next/head'
import {useState, useEffect} from 'react'
import _ from 'lodash';
import Counter from '@/components/Counter'
import ChangePage from '@/components/ChangePage'
import NavBar from '@/components/NavBar';
import PopOutMenu from '@/components/PopOutMenu';
import { auth } from '@/components/auth/firebase';
import AuthDetails from '@/components/auth/AuthDetails';
import { onAuthStateChanged } from 'firebase/auth'
import { AuthProvider, useAuth, getAuthUser } from '@/components/auth/AuthContext';
import { parse } from 'cookie';
import { useRouter } from 'next/router';

import firebase from 'firebase/app';
import { PrevButton } from '@/components/PrevButton';
import { NextButton } from '@/components/NextButton';
import { PageDisplay } from '@/components/PageDisplay';


let page = 1;
let pageSize = 30;
let changeUser = 0;




export default function Variants({ data, colorData, setData, abilityData, attributeData, typesData, categoryData, collectionData}) {
   
    return (
        <>
            <AuthProvider>
                <Head>
                    <title>Card Library</title>
                </Head>
                <NavBar/>
                <Content data={data} colorData={colorData} setData={setData} abilityData={abilityData} attributeData={attributeData} typesData={typesData} categoryData={categoryData} collectionData={collectionData}/>
                {/* <div className='static p-1'><ChangePage page={page}/></div> */}
            </AuthProvider>
        </>
    );
}

const Content = ({ data, colorData, setData, abilityData, attributeData, typesData, categoryData, collectionData}) => {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [isPopOutOpen, setIsPopOutOpen] = useState(false);
    const router = useRouter(); // Initialize the router
    
    const { collectionName } = router.query;

    // Use collectionName as needed
    console.log('collectionName:',collectionName);
    
    
    const handleImageClick = (variant) => {
        setSelectedVariant(variant);
        setIsPopOutOpen(!isPopOutOpen);
    };

    const handlePopOutClose = () => {
        setIsPopOutOpen(false);
    };
    
    const {authUser} = useAuth();

    return (
        <>
            <div className='flex py-20 relative'>
                <div className='sm:flex-row md:flex-row lg:flex-col xl:flex-col'>
                    {/* <FilterMyStuff/> */}
                    {/* <div id='cardFilters' class='p-2 relative z-0 overflow-y-auto max-h-screen w-auto'>
                        
                        <div class='w-auto'  id='filterArea' style={{display:'none'}} >
                        
                            <div class='py-1'>
                                <label class='p-3 font-semibold' htmlFor='nameFilter'>Filter by Name:</label>
                                <input
                                    id="nameFilter"
                                    type="text"
                                    value={nameFilter}
                                    onChange={handleNameFilterChange}
                                    placeholder="Enter Name here"
                                    className="border border-gray-300 rounded px-2 py-1 p-1 text-center"
                                />
                            </div>

                            <div class='py-1'>
                                <label class='p-3 font-semibold' htmlFor='setFilter'>Filter by Set:</label>
                                <select className="border border-gray-300 rounded px-2 py-1 p-1 text-center" id='setFilter' value={setFilter} onChange={handleSetFilterChange}>
                                    <option class='text-left' value='All'>All</option>
                                    {_.sortBy(setData, 'setNumber').map((set) => (
                                        <option class='text-left' key={set.id} value={set.setNumber}>{set.setNumber} - {set.setName}</option>
                                    ))}
                                </select>
                            </div>

                            <div class='py-1'>
                                <label class='p-3 font-semibold' htmlFor='numberFilter'>Filter by Number:</label>
                                <input
                                    id="numberFilter"
                                    type="number"
                                    value={numberFilter}
                                    onChange={handleNumberFilterChange}
                                    placeholder="Enter Number here"
                                    className="border border-gray-300 rounded px-2 py-1 text-center"
                                />
                            </div>

                            <div class='py-1'>
                                <label class='p-3 font-semibold' htmlFor='colorFilter'>Filter by Color:</label>
                                <select className="border border-gray-300 rounded px-2 py-1 p-1 text-center" id='colorFilter' value={colorFilter} onChange={handleColorFilterChange}>
                                    <option class='text-left' value='All'>All</option>
                                    {colorData.map((color) => (
                                    <option class='text-left' key={color.id} value={color.name}>{color.name}</option>
                                    ))}
                                </select>
                                
                            </div>

                            <div class='py-1'>
                                <label class='p-3 font-semibold' htmlFor='costFilter'>Filter by Cost/Life:</label>
                                <input
                                    id="costFilter"
                                    type="number"
                                    value={costFilter}
                                    onChange={handleCostFilterChange}
                                    placeholder="Enter Cost / Life here"
                                    className="border border-gray-300 rounded px-2 py-1 text-center"
                                />
                            </div>

                            <div class='py-1'>
                                <label class='p-3 font-semibold' htmlFor='powerFilter'>Filter by Power:</label>
                                <input
                                    id="powerFilter"
                                    type="number"
                                    value={powerFilter}
                                    onChange={handlePowerFilterChange}
                                    placeholder="Enter Power here"
                                    className="border border-gray-300 rounded px-2 py-1 text-center"
                                />
                            </div>
                        
                            <div class='py-1'>
                                <label class='p-3 font-semibold' htmlFor='counterFilter'>Filter by Counter:</label>
                                <select className="border border-gray-300 rounded px-2 py-1 p-1 text-center" id='counterFilter' value={counterFilter} onChange={handleCounterFilterChange}>
                                    <option class='text-left' value='All'>All</option>
                                    <option class='text-left' value='0'>None</option>
                                    <option class='text-left' value='1000'>+1000</option>
                                    <option class='text-left' value='2000'>+2000</option>
                                </select>
                            </div>

                            <div class='py-1'>
                                <label class='p-3 font-semibold' htmlFor='categoryFilter'>Filter by Category:</label>
                                <select className="border border-gray-300 rounded px-2 py-1 p-1 text-center" id='categoryFilter' value={categoryFilter} onChange={handleCategoryFilterChange}>
                                    <option  class='text-left' value='All'>All</option>
                                    {categoryData.map((category) => (
                                    <option class='text-left' key={category.id} value={category.name}>{category.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div class='py-1'>
                                <label class='p-3 font-semibold' htmlFor='typesFilter'>Filter by Types:</label>
                                <select className="border border-gray-300 rounded px-2 py-1 p-1 text-center" id='typesFilter' value={typesFilter} onChange={handleTypesFilterChange}>
                                    <option class='text-left' value='All'>All</option>
                                    {_.sortBy(typesData, 'name').map((types) => (
                                        <option class='text-left' key={types.id} value={types.name}>{types.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div class='py-1'>
                                <label class='p-3 font-semibold' htmlFor='abilityFilter'>Filter by Ability:</label>
                                <select className="border border-gray-300 rounded px-2 py-1 p-1 text-center" id='abilityFilter' value={abilityFilter} onChange={handleAbilityFilterChange}>
                                    <option class='text-left' value='All'>All</option>
                                    {abilityData.map((ability) => (
                                    <option class='text-left' key={ability.id} value={ability.name}>{ability.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div class='py-1'>
                                <label class='p-3 font-semibold' htmlFor='attributeFilter'>Filter by Attribute:</label>
                                <select className="border border-gray-300 rounded px-2 py-1 p-1 text-center" id='attributeFilter' value={attributeFilter} onChange={handleAttributeFilterChange}>
                                    <option class='text-left' value='All'>All</option>
                                    {attributeData.map((attribute) => (
                                    <option class='text-left' key={attribute.id} value={attribute.name}>{attribute.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div class='py-1'>
                                <label class='p-3 font-semibold' htmlFor='effectFilter'>Filter by Effect:</label>
                                <input
                                    id="effectFilter"
                                    type="text"
                                    value={effectFilter}
                                    onChange={handleEffectFilterChange}
                                    placeholder="Enter Effect search term"
                                    className="border border-gray-300 rounded px-2 py-1 p-1 text-center"
                                />
                            </div>

                            <div class='py-1'>
                                <label class='p-3 font-semibold' htmlFor='triggerFilter'>Filter by Trigger:</label>
                                <input
                                    id="triggerFilter"
                                    type="text"
                                    value={triggerFilter}
                                    onChange={handleTriggerFilterChange}
                                    placeholder="Enter Trigger search term"
                                    className="border border-gray-300 rounded px-2 py-1 p-1 text-center"
                                />
                            </div>

                            <button onClick={handleFilter}>Filter</button>
                        </div>
                    </div> */}
                </div>

                <div className='place-content-center'>
                    
                    {/* <div className='p-1'><ChangePage page={page}/></div> */}
                    <div className='pb-2 pr-2 pl-1'><ChangePage/></div>
                    <div className='grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-1 z-0 overflow-y-auto max-h-screen' id='cardDataArea' >
                    
                    
                        {_.sortBy(data, 'id').map((variant) => (
                            
                            <div key={variant.id} className='grid-auto-rows: min-content' style={{ alignItems: 'start' }}>   
                                <div onClick={() => handleImageClick(variant)}>
                                    {/* <img src={variant.imgSource} alt={variant.details[0].name} /> */}
                                    <img src={variant.imgSource} />
                                </div>
                                <div class='p-1'>
                                    
                                    {authUser ? <Counter variantId={variant.id} quantity={variant.variant_quantity}/> : null}
                                    {/* <Counter/> */}
                                
                                </div>
                            </div>
                        ))}

                        
                        
                    </div>
                    {/* <ChangePage page={page}/> */}
                </div>

                {isPopOutOpen && selectedVariant && (
                    <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
                        <AuthProvider>
                            <PopOutMenu variant={selectedVariant} onClose={handlePopOutClose} />
                            
                        </AuthProvider>
                    </div>
                )}

            </div>
        </>
    )
}

const replaceEmptyStr = (str, defaultVal) => {
    console.log(str, 'str')
    console.log(defaultVal, 'defaultVal')
    console.log(typeof str === 'string' && str.trim() === '' ? defaultVal : str, 'res')
    return typeof str === 'string' && str.trim() === '' ? defaultVal : str
}

export async function getServerSideProps(context) {
    // Extract page and filter parameters from the query
    let {
        page,
        color: colorFilter,
        set: setFilter,
        ability: abilityFilter,
        attribute: attributeFilter,
        type: typesFilter,
        category: categoryFilter,
        name: nameFilter,
        number: numberFilter,
        cost: costFilter,
        counter: counterFilter,
        power: powerFilter,
        effect: effectFilter,
        trigger: triggerFilter,
        collectionName
    } = context.query;

    page = page||'1'
    colorFilter = colorFilter||'All'
    setFilter = setFilter||'All'
    abilityFilter = abilityFilter||'All'
    attributeFilter = attributeFilter||'All'
    typesFilter = typesFilter||'All'
    categoryFilter = categoryFilter||'All'
    nameFilter = nameFilter||''
    numberFilter = numberFilter||0
    numberFilter = isNaN(numberFilter) ? 0 : numberFilter
    costFilter = costFilter||0
    costFilter = isNaN(costFilter) ? 0 : costFilter
    counterFilter = counterFilter||0
    counterFilter = isNaN(counterFilter) ? 0 : counterFilter
    powerFilter = powerFilter||0
    powerFilter = isNaN(powerFilter) ? 0 : powerFilter
    effectFilter = effectFilter||''
    triggerFilter = triggerFilter||''
    

    
    console.log('collectionName 2',collectionName)

    // Parse cookies from the incoming request
    const cookies = parse(context.req.headers.cookie || '');
    const uid = cookies.firebaseUID || null; // Set to null if undefined

    // Construct the query parameters
    // number, cost, counter, power are required integers, you passed an empty string
    const queryParams = new URLSearchParams({
        uid,
        page,
        color: colorFilter,
        set: setFilter,
        ability: abilityFilter,
        attribute: attributeFilter,
        type: typesFilter,
        category: categoryFilter,
        name: nameFilter,
        number: numberFilter,
        cost: costFilter,
        counter: counterFilter,
        power: powerFilter,
        effect: effectFilter,
        trigger: triggerFilter,
        collection: collectionName
    }).toString();

    console.log('QPs',queryParams)

    // Fetch data with filters applied
    const response = await fetch(`${process.env.NEXT_API_URL}/variants?${queryParams}`);
    const data = await response.json();

    // THIS holds info about errors you receive
    console.log(data.detail, 'data')
    
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
    
    

    // console.log("data",data)
    return {
        props: {
            data,
            colorData,
            setData,
            abilityData,
            attributeData,
            typesData,
            categoryData,
            page,
            // pageSize,
            authUser: uid,
            collectionName
        }
    }
}