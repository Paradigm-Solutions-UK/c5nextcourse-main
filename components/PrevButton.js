export function PrevButton({ page, onDecrement }) {
    return (
      <button 
        className='rounded' 
        onClick={onDecrement} 
        style={{ width: '50px', height: '24px', border: '1px solid red', backgroundColor: 'red', color: 'white' }}
        disabled={page <= 1} // To prevent going below page 1
      >
        PREV
      </button>
    );
  }
  