import {useState, useEffect, useRef} from 'react'
import { useAuth } from '@/components/auth/AuthContext';

export default function Counter({ variantId, quantity }) {
  const [count, setCount] = useState(quantity||0)
  const [apiLoading, setApiLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const { authUser } = useAuth() || {}
  // console.log(variantId, variantId)
  // console.log(quantity, 'quantity')

  const submitChange = (newCount) => {
    const { accessToken, uid } = authUser
    // actually create api
    // maybe set state for loading
    // block counter if loading / cancel current request
    if (!apiLoading) {
      setErrorMsg(null)

      setApiLoading(true)
      // console.log(`${process.env.NEXT_API_URL}/api/updateVariantQuantity`, 'ddd')
      console.log(`http://127.0.0.1:8000/api/updateVariantQuantity`, 'ddd')
      
      // fetch(`http://127.0.0.1:8000/api/updateVariantQuantity`, {
      fetch(`http://127.0.0.1:8000/updateVariantQuantity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          userID: uid,
          variant_id: variantId,
          variant_quantity: newCount,
        }),
      }).then(response => {
        if (!response.ok) {
          setErrorMsg('Failed to update variant quantity.')
        } else {
          console.log(response, 'update count resp')
        }
          
        setApiLoading(false)
        setCount(newCount)
        // Optional: You can handle the response here if needed.
      }).catch(error => {
        setApiLoading(false)
        setErrorMsg(error.message)
        console.error(error);
      });
    }
  }
  
  function increment() {
    submitChange(count + 1);
  }
  
  function decrement() {
    submitChange(count - 1);
  }

  // const prevCountRef = useRef(null)
  // useEffect(() => {
  //   // console.log(authUser,'authUser')

  //   prevCountRef.current = count
  // }, [count])
  
  return (
      <div>
        {errorMsg ? <span>{errorMsg}</span> : null}
        <div className='flex justify-between items-center' style={{ alignItems: 'center', height: '24px' }}>
          <button className='rounded' onClick={decrement} style={{ width: '50px', height: '24px', border: '1px solid red', backgroundColor: 'red', color: 'white' }} disabled={apiLoading}>-</button>
          <span style={{ flex: 1, height: '24px', border: '1px solid white', backgroundColor: 'white', color: 'black', textAlign: 'center' }}>{count}</span>
          <button className='rounded' onClick={increment} style={{ width: '50px', height: '24px', border: '1px solid green', backgroundColor: 'green', color: 'white' }} disabled={apiLoading}>+</button>
        </div>
      </div>
    );
}

// import { useState } from 'react';

// export default function Counter({ variantId }) {
//   const [count, setCount] = useState(0);

//   function increment() {
//     setCount(count + 1);
//     updateVariantQuantity(count + 1);
//   }

//   function decrement() {
//     if (count > 0) {
//       setCount(count - 1);
//       updateVariantQuantity(count - 1);
//     }
//   }

//   async function updateVariantQuantity(quantity) {
//     try {
//       const response = await fetch('/api/updateVariantQuantity', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           variantId,
//           quantity,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update variant quantity.');
//       }

//       // Optional: You can handle the response here if needed.
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <div className='flex justify-between items-center' style={{ alignItems: 'center', height: '24px' }}>
//       <button class='rounded' onClick={decrement} style={{ width: '50px', height: '24px', border: '1px solid red', backgroundColor: 'red', color: 'white' }}>-</button>
//       <span style={{ flex: 1, height: '24px', border: '1px solid white', backgroundColor: 'white', color: 'black', textAlign: 'center' }}>{count}</span>
//       <button class='rounded' onClick={increment} style={{ width: '50px', height: '24px', border: '1px solid green', backgroundColor: 'green', color: 'white' }}>+</button>
//     </div>
//   );
// }
