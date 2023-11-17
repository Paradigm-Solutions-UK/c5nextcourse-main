import {useState, useEffect, useRef} from 'react'
import { useAuth } from '@/components/auth/AuthContext';

export default function CounterPreRelease({ variantId, quantity, prQuantity, judgeQuantity, winnerQuantity }) {
  const [count, setCount] = useState(prQuantity||0)
  const [apiLoading, setApiLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const { authUser } = useAuth() || {}
  // console.log(variantId, variantId)
  // console.log(quantity, 'quantity')
  // console.log('PRQuantity-',prQuantity)

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
          variant_quantity:quantity,
          preRelease_quantity: newCount,
          judge_quantity: judgeQuantity,
          winner_quantity: winnerQuantity,
        }),
      }).then(response => {
        if (!response.ok) {
          setErrorMsg('Failed to update variant quantity.')
        } else {
          console.log(response, 'update count resp')
        }
          
        setApiLoading(false)
        setCount(newCount)
        console.log(response, 'update count resp')
        console.log('update count resp',uid)
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


  
  return (
      <div>
        {errorMsg ? <span>{errorMsg}</span> : null}
        <div className='flex justify-between items-center' style={{ alignItems: 'center', height: '24px' }}>
          <button className='rounded' onClick={decrement} style={{ width: '50px', height: '24px', border: '1px solid red', backgroundColor: 'red', color: 'white' }} disabled={apiLoading}>-</button>
          <span style={{ flex: 1, minWidth: '50px', height: '24px', border: '1px solid white', backgroundColor: 'white', color: 'black', textAlign: 'center' }}>{count}</span>
          <button className='rounded' onClick={increment} style={{ width: '50px', height: '24px', border: '1px solid green', backgroundColor: 'green', color: 'white' }} disabled={apiLoading}>+</button>
        </div>
      </div>
    );
}
