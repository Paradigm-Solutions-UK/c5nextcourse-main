import { useState } from 'react';
import { useRouter } from 'next/router';


export default function ChangePage({ initialPage = 1, initialPageSize = 30 }) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState(null);

  function changeURL(newPage,newPageSize) {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage, pageSize: newPageSize} // Merge the existing query params with the new page value
    });
  }

  function increment() {
    const newPage = page + 1;
    setPage(newPage);
    changeURL(newPage);
  }

  function decrement() {
    if (page > 1) { // Ensure the page doesn't go below 1
      const newPage = page - 1;
      setPage(newPage);
      changeURL(newPage);
    }
  }

  function morePerPage() {
    
      const newPageSize = pageSize + 30;
      setPageSize(newPageSize);
      changeURL(newPageSize);
    
  }
  
  return (
      <div>
        {errorMsg ? <span>{errorMsg}</span> : null}
        <div className='flex justify-between items-center' style={{ alignItems: 'center', height: '24px' }}>
          <button className='rounded' onClick={decrement} style={{ width: '50px', height: '32px', border: '1px solid red', backgroundColor: 'red', color: 'white' }}>PREV</button>
          <span style={{ flex: 1, height: '32px', border: '1px solid white', backgroundColor: 'white', color: 'black', textAlign: 'center' }}>Page:{page}</span>
          <button className='rounded' onClick={increment} style={{ width: '50px', height: '32px', border: '1px solid green', backgroundColor: 'green', color: 'white' }}>NEXT</button>
          {/* <button className='rounded' onClick={morePerPage} style={{ width: '50px', height: '32px', border: '1px solid Yellow', backgroundColor: 'yellow', color: 'black' }}>MORE</button> */}
        </div>
      </div>
    );
}