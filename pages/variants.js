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

import firebase from 'firebase/app';
import { PrevButton } from '@/components/PrevButton';
import { NextButton } from '@/components/NextButton';
import { PageDisplay } from '@/components/PageDisplay';


let page = 1;

// import { useNavigate } from "react-router-dom";

// import cardColors from '@/data/card_colors';



export default function Variants({ data, colorData, setData, abilityData, attributeData, typesData, categoryData}) {
   
    return (
        <>
            <AuthProvider>
                <Head>
                    <title>Card Library</title>
                </Head>
                <NavBar/>
                <Content data={data} colorData={colorData} setData={setData} abilityData={abilityData} attributeData={attributeData} typesData={typesData} categoryData={categoryData}/>
                {/* <div className='static p-1'><ChangePage page={page}/></div> */}
            </AuthProvider>
        </>
    );
}

const Content = ({ data, colorData, setData, abilityData, attributeData, typesData, categoryData}) => {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [isPopOutOpen, setIsPopOutOpen] = useState(false);
    
    
    const [colorFilter, setColorFilter] = useState('All');
    const [setFilter, setSetFilter] = useState('All');
    const [abilityFilter, setAbilityFilter] = useState('All');
    const [attributeFilter, setAttributeFilter] = useState('All');
    const [typesFilter, setTypesFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [nameFilter, setNameFilter] = useState('');
    const [numberFilter, setNumberFilter] = useState('');
    const [costFilter, setCostFilter] = useState('');
    const [counterFilter, setCounterFilter] = useState('');
    const [powerFilter, setPowerFilter] = useState('');
    const [effectFilter, setEffectFilter] = useState('');
    const [triggerFilter, setTriggerFilter] = useState('');

    
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
    
    const handleTypesFilterChange = (e) => {
        setTypesFilter(e.target.value);
    };

    const handleCategoryFilterChange = (e) => {
        setCategoryFilter(e.target.value);
    };

    const handleNameFilterChange = (e) => {
        setNameFilter(e.target.value.toLowerCase());
    };
    
    const handleEffectFilterChange = (e) => {
        setEffectFilter(e.target.value.toLowerCase());
    };
    
    const handleTriggerFilterChange = (e) => {
        setTriggerFilter(e.target.value.toLowerCase());
    };

    const handleNumberFilterChange = (e) => {
        setNumberFilter(e.target.value !== '' ? parseInt(e.target.value, 10) : '');
    };

    const handleCostFilterChange = (e) => {
        setCostFilter(e.target.value !== '' ? parseInt(e.target.value, 10) : '');
    };

    const handleCounterFilterChange = (e) => {
        setCounterFilter(e.target.value !== '' ? parseInt(e.target.value, 10) : '');
    };

    const handlePowerFilterChange = (e) => {
        setPowerFilter(e.target.value !== '' ? parseInt(e.target.value, 10) : '');
    };
    
    
    // // const checkLoggedIn = () => {

    //     // Use useEffect to listen for changes in the authentication state
    //     useEffect(() => {
    //         console.log('1 authUser coming up as - ',authUser)
    //         const unsubscribe = onAuthStateChanged(auth, (user) => {
    //             if (user) {
    //                 setAuthUser(user); // Set the user object if the user is signed in
    //                 console.log('2 authUser coming up as - ',authUser)
    //             } else {
    //             setAuthUser(null); // Set null if the user is signed out
    //         }
    //         });
    //         console.log('3 authUser coming up as - ',authUser)
    //         // Clean up the listener when the component unmounts
    //         return () => unsubscribe();
    //     }, []);
    //     console.log('4 authUser coming up as - ',authUser)
    // // }

    const filteredData = data.filter((variant) => {
        const colorMatches = colorFilter === 'All' || variant.details[0].color.some((color) => color.name === colorFilter);
        const setMatches = setFilter === 'All' || variant.details[0].set.some((set) => set.setNumber === setFilter);
        const abilityMatches = abilityFilter === 'All' || variant.details[0].abilities.some((ability) => ability.name === abilityFilter);
        const attributeMatches = attributeFilter === 'All' || variant.details[0].attribute.some((attribute) => attribute.name === attributeFilter);
        const typesMatches = typesFilter === 'All' || variant.details[0].types.some((types) => types.name === typesFilter);
        const categoryMatches = categoryFilter === 'All' || variant.details[0].category.some((category) => category.name === categoryFilter);
        const nameMatches = nameFilter === '' || variant.details[0].name.toLowerCase().includes(nameFilter);
        const effectMatches = effectFilter === '' || variant.details[0].effect.toLowerCase().includes(effectFilter);
        const triggerMatches = triggerFilter === '' || variant.details[0].trigger.toLowerCase().includes(triggerFilter);
        const numberMatches =
            numberFilter === '' ||
            (typeof numberFilter === 'number' && variant.details[0].number === numberFilter);
        const costMatches =
            costFilter === '' ||
            (typeof costFilter === 'number' && variant.details[0].cost_life === costFilter);
        const powerMatches =
            powerFilter === '' ||
            (typeof powerFilter === 'number' && variant.details[0].power === powerFilter);
            
        const counterMatches = counterFilter === '' || variant.details[0].counter === counterFilter;
      
        return colorMatches && setMatches && abilityMatches && attributeMatches && typesMatches && categoryMatches && nameMatches && numberMatches && costMatches && counterMatches && powerMatches && effectMatches && triggerMatches;
        
      });

    // console.log(filteredData);
    
    // const isAnyoneSignedIn = () => {
    //     const {authUser} = useAuth()
    //     return
    // }

    const handleImageClick = (variant) => {
        setSelectedVariant(variant);
        setIsPopOutOpen(!isPopOutOpen);
    };

    const handlePopOutClose = () => {
        setIsPopOutOpen(false);
    };
      
    // console.log(auth.currentUser)
    

    // if (loading) {
    //     // Show loading spinner or placeholder while checking the auth state
    //     return <div>Loading...</div>;
    //   }
    
    //   if (!authUser) {
    //     // User is not authenticated, show login/register UI
    //     return <div>Please login or register.</div>;
    //   }
    const {authUser} = useAuth();
    //console.log(authUser)

    // const r = useAuth()
    // console.log('auth check',r)
    return (
        <>
            
            
            <div className='flex py-20 relative'>
                <div className='sm:flex-row md:flex-row lg:flex-col xl:flex-col'>
                    {/* <FilterMyStuff/> */}
                    <div id='cardFilters' class='p-2 relative z-0 overflow-y-auto max-h-screen w-auto'>
                        
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
                        </div>
                    </div>
                </div>

                <div className='place-content-center'>
                    
                    {/* <div className='p-1'><ChangePage page={page}/></div> */}
                    <div className='pb-1'><ChangePage/></div>
                    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-1 z-0 overflow-y-auto max-h-screen' id='cardDataArea' >
                    
                    
                        {_.sortBy(filteredData, 'id').map((variant) => (
                            
                            <div key={variant.id} className='grid-auto-rows: min-content' style={{ alignItems: 'start' }}>   
                                <div onClick={() => handleImageClick(variant)}>
                                    <img src={variant.imgSource} alt={variant.details[0].name} />
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

export async function getServerSideProps(context) {
    // Retrieve filtering parameters from the query string
    // const { colorFilter, setFilter, abilityFilter, attributeFilter, typesFilter, categoryFilter, nameFilter, numberFilter, costFilter, counterFilter, powerFilter, effectFilter, triggerFilter } = context.query;

    const page = parseInt(context.query.page || '1', 10); // Extract page from query

    // Parse cookies from the incoming request
    const cookies = parse(context.req.headers.cookie || '');

    // Extract UID from cookie
    const uid = cookies.firebaseUID || null; // Set to null if undefined
    
    console.log("uid-",uid);

    
    // Gets data for all the variants from the table
    const response = await fetch(`${process.env.NEXT_API_URL}/variants?uid=${uid}&page=${page}`)
    // console.log(`${process.env.NEXT_API_URL}/variants`,' - check env var')
    const data = await response.json()
    // console.log(data, 'data')
    // const data = []
    
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
            authUser: uid,
        }
    }
}

