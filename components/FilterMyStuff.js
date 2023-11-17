import React, { useState } from 'react';

function FilterMyStuff() {
  const [myFilter, setMyFilter] = useState(0);

  function adjustFilterArea() {
    const cardFiltersElement = document.getElementById('cardFilters');
    const filterAreaElement = document.getElementById('filterArea');
    const isFilterAreaVisible = myFilter === 1;

    if (isFilterAreaVisible) {
      filterAreaElement.style.display = 'none';
      cardFiltersElement.classList.remove('w-full');
      cardFiltersElement.classList.add('w-auto');
      
      setMyFilter(0);
    } else {
      filterAreaElement.style.display = 'block';
      cardFiltersElement.classList.remove('w-auto');
      cardFiltersElement.classList.add('w-full');
      setMyFilter(1);
    }
  }

  return (
    <div className="flex justify-between items-center" style={{ alignItems: 'center', height: '24px' }}>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:text-xs md:text-sm px-4 py-2 sm:px-2 sm:py-1 md:px-4 md:py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={adjustFilterArea}
      >
        Filter
      </button>
    </div>
  );
}

export default FilterMyStuff;
