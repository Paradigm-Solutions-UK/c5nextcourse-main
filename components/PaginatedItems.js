import React from 'react';

const PaginatedItems = ({ itemList, variantsPerPage, currentPage }) => {
  // Calculate the number of pages based on the number of items (itemList.length)
  const totalPages = Math.ceil(itemList.length / variantsPerPage);

  // Helper function to get items for the current page
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * variantsPerPage;
    const endIndex = startIndex + variantsPerPage;
    return itemList.slice(startIndex, endIndex);
  };

  return (
    <div>
      {/* Display items for the current page */}
      {getCurrentPageItems().map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
        </div>
      ))}

      {/* Add pagination controls here */}
      {/* For simplicity, you can just display "Next" and "Previous" buttons */}

      {/* Example of basic "Next" button */}
      {/* <button onClick={handleNextPage}>Next</button> */}
    </div>
  );
};

export default PaginatedItems;
