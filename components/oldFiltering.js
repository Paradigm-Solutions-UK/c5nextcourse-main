import React, { useState } from 'react';

export default function Filtering({
  colorData,
  setData,
  abilityData,
  attributeData,
  typesData,
  categoryData,
  onFilterChange,
}) {
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

  const filteredData = data.filter((variant) => {
    const colorMatches =
      colorFilter === 'All' ||
      variant.details[0].color.some((color) => color.name === colorFilter);
    const setMatches =
      setFilter === 'All' ||
      variant.details[0].set.some((set) => set.setNumber === setFilter);
    const abilityMatches =
      abilityFilter === 'All' ||
      variant.details[0].abilities.some((ability) => ability.name === abilityFilter);
    const attributeMatches =
      attributeFilter === 'All' ||
      variant.details[0].attribute.some((attribute) => attribute.name === attributeFilter);
    const typesMatches =
      typesFilter === 'All' ||
      variant.details[0].types.some((types) => types.name === typesFilter);
    const categoryMatches =
      categoryFilter === 'All' ||
      variant.details[0].category.some((category) => category.name === categoryFilter);
    const nameMatches =
      nameFilter === '' || variant.details[0].name.toLowerCase().includes(nameFilter);
    const effectMatches =
      effectFilter === '' || variant.details[0].effect.toLowerCase().includes(effectFilter);
    const triggerMatches =
      triggerFilter === '' || variant.details[0].trigger.toLowerCase().includes(triggerFilter);
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

    return (
      colorMatches &&
      setMatches &&
      abilityMatches &&
      attributeMatches &&
      typesMatches &&
      categoryMatches &&
      nameMatches &&
      numberMatches &&
      costMatches &&
      counterMatches &&
      powerMatches &&
      effectMatches &&
      triggerMatches
    );
  });

  // Call the onFilterChange function with the updated filters
  const handleFiltersChange = () => {
    onFilterChange({
      colorFilter,
      setFilter,
      abilityFilter,
      attributeFilter,
      typesFilter,
      categoryFilter,
      nameFilter,
      numberFilter,
      costFilter,
      counterFilter,
      powerFilter,
      effectFilter,
      triggerFilter,
    });
  };

  // Call handleFiltersChange whenever any filter value changes
  useState(handleFiltersChange);

  return (
    <>
        <div className="py-2">
            <div class='py-1'>
                <label class='p-3 font-semibold' htmlFor='nameFilter'>Filter by Name:</label>
                <input
                    id="nameFilter"
                    type="text"
                    value={nameFilter}
                    onChange={handleNameFilterChange}
                    placeholder="Enter Name here"
                    className="border border-gray-300 rounded px-2 py-1 p-1"
                />
            </div>

            <div class='py-1'>
                <label class='p-3 font-semibold' htmlFor='setFilter'>Filter by Set:</label>
                <select id='setFilter' value={setFilter} onChange={handleSetFilterChange}>
                    <option value='All'>All</option>
                    {_.sortBy(setData, 'setNumber').map((set) => (
                        <option key={set.id} value={set.setNumber}>{set.setNumber} - {set.setName}</option>
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
                    className="border border-gray-300 rounded px-2 py-1"
                />
            </div>

            <div class='py-1'>
                <label class='p-3 font-semibold' htmlFor='colorFilter'>Filter by Color:</label>
                <select id='colorFilter' value={colorFilter} onChange={handleColorFilterChange}>
                    <option value='All'>All</option>
                    {colorData.map((color) => (
                    <option key={color.id} value={color.name}>{color.name}</option>
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
                    className="border border-gray-300 rounded px-2 py-1"
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
                    className="border border-gray-300 rounded px-2 py-1"
                />
            </div>

            <div class='py-1'>
                <label class='p-3 font-semibold' htmlFor='counterFilter'>Filter by Counter:</label>
                <select id='counterFilter' value={counterFilter} onChange={handleCounterFilterChange}>
                    <option value='All'>All</option>
                    <option value='0'>None</option>
                    <option value='1000'>+1000</option>
                    <option value='2000'>+2000</option>
                    
                </select>
                
            </div>


            <div class='py-1'>
                <label class='p-3 font-semibold' htmlFor='categoryFilter'>Filter by Category:</label>
                <select id='categoryFilter' value={categoryFilter} onChange={handleCategoryFilterChange}>
                    <option value='All'>All</option>
                    {categoryData.map((category) => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div class='py-1'>
                <label class='p-3 font-semibold' htmlFor='typesFilter'>Filter by Types:</label>
                <select id='typesFilter' value={typesFilter} onChange={handleTypesFilterChange}>
                    <option value='All'>All</option>
                    {_.sortBy(typesData, 'name').map((types) => (
                        <option key={types.id} value={types.name}>{types.name}</option>
                    ))}
                </select>
            </div>

            <div class='py-1'>
                <label class='p-3 font-semibold' htmlFor='abilityFilter'>Filter by Ability:</label>
                <select id='abilityFilter' value={abilityFilter} onChange={handleAbilityFilterChange}>
                    <option value='All'>All</option>
                    {abilityData.map((ability) => (
                    <option key={ability.id} value={ability.name}>{ability.name}</option>
                    ))}
                </select>
            </div>

            <div class='py-1'>
                <label class='p-3 font-semibold' htmlFor='attributeFilter'>Filter by Attribute:</label>
                <select id='attributeFilter' value={attributeFilter} onChange={handleAttributeFilterChange}>
                    <option value='All'>All</option>
                    {attributeData.map((attribute) => (
                    <option key={attribute.id} value={attribute.name}>{attribute.name}</option>
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
                    className="border border-gray-300 rounded px-2 py-1 p-1"
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
                    className="border border-gray-300 rounded px-2 py-1 p-1"
                />
            </div>
      </div>
    </>
  );
}
