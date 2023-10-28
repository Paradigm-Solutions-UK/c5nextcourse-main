export function NextButton({ onIncrement }) {
    return (
      <button 
        className='rounded' 
        onClick={onIncrement} 
        style={{ width: '50px', height: '24px', border: '1px solid green', backgroundColor: 'green', color: 'white' }}
      >
        NEXT
      </button>
    );
  }
  