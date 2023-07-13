import {useState} from 'react'

export default function Counter() {
  const [count, setCount] = useState(0);
  
  function increment() {
    setCount(count + 1);
  }
  
  function decrement() {
    setCount(count - 1);
  }
  
  return (
      <div className='flex justify-between items-center' style={{ alignItems: 'center', height: '24px' }}>
        <button class='rounded' onClick={decrement} style={{ width: '50px', height: '24px', border: '1px solid red', backgroundColor: 'red', color: 'white' }}>-</button>
        <span style={{ flex: 1, height: '24px', border: '1px solid white', backgroundColor: 'white', color: 'black', textAlign: 'center' }}>{count}</span>
        <button class='rounded' onClick={increment} style={{ width: '50px', height: '24px', border: '1px solid green', backgroundColor: 'green', color: 'white' }}>+</button>
      </div>
    );
}