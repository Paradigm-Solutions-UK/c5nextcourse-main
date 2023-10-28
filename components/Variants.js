import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import _ from 'lodash';
import Counter from '@/components/Counter';
import NavBar from '@/components/NavBar';
// import { useNavigate } from "react-router-dom";
import PopOutMenu from '@/components/PopOutMenu';
// import cardColors from '@/data/card_colors';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuth } from '@/components/auth/AuthContext';

const PAGE_SIZE = 60; // Set the number of items per page here

export default function Variants({
  data,
  colorData,
  setData,
  abilityData,
  attributeData,
  typesData,
  categoryData,
  currentPage,
  setCurrentPage, // Assuming you have this prop available
}) {
  console.log(data);

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

  
  
  {Array.isArray(colorData) && (
    <select
      className="border border-gray-300 rounded px-2 py-1 p-1 text-center"
      id="colorFilter"
      value={colorFilter}
      onChange={handleColorFilterChange}
    >
      <option class="text-left" value="All">All</option>
      {colorData.map((color) => (
        <option class="text-left" key={color.id} value={color.name}>
          {color.name}
        </option>
      ))}
    </select>
  )}
  
  
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

  // Add a loading state
  const [loading, setLoading] = useState(false);

  // Replace componentDidMount with useEffect for loading state when changing pages
  useEffect(() => {
    setLoading(true);
  }, [currentPage]);

  console.log(variant, 'variant - 2')
  
    return (
      <>
        
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
            
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-1 z-0 overflow-y-auto max-h-screen" id="cardDataArea">
                {loading ? (
                    <div className="text-center p-5">
                      <p>Loading...</p>
                    </div>
                ) : (
                    currentPageData.map((variant) => (
                      <div key={variant.id} className="grid-auto-rows: min-content" style={{ alignItems: "start" }}>
                        <div onClick={() => handleImageClick(variant)}>
                          <img src={variant.imgSource} alt={variant.details[0].name} />
                        </div>
                        <div className="p-1">
                          <Counter variantId={variant.id} />
                        </div>
                      </div>
                  ))
                )}
            </div>

            {isPopOutOpen && selectedVariant && (
              <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center" onClick={handlePopOutClose}>
                <PopOutMenu variant={selectedVariant} onClose={handlePopOutClose} />
              </div>
            )}
        
      </>
    );
  }

  export async function getServerSideProps(context) {
    const { page = 1, pageSize = 60 } = context.query;
    // Get the current user
    const user = firebase.auth().currentUser;

    // Get the user's UID
    const uid = user ? user.uid : null;
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
  
    console.log("authUser: uid", uid)
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
            authUser: uid,
        }
    }
  }

  
  


