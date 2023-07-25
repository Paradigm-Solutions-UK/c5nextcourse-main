import React, { useState, useEffect } from 'react';
import Counter from '@/components/Counter'


export default function PopOutMenu({ variant }) {
  

  const [isOpen, setIsOpen] = useState(true);
  const [showImage, setShowImage] = useState(window.innerWidth >= 640); // Initially set showImage based on screen width


  console.log('Variant:', variant);
  console.log('Is Open:', isOpen);
  useEffect(() => {
    const handleResize = () => {
      setShowImage(window.innerWidth >= 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Render the data related to the selected variant
  return (
    <>
      {isOpen && (
        <div className="p-4 rounded-lg flex lg:w-3/5 lg:h-60vh xl:w-3/5 xl:h-60vh overflow-auto bg-sky-500/100" >
          <div className={` text-white w-full pr-4' : ''}`}>
            <h2 className="p-2">
                <b>Name:</b> {variant.details[0].name}
            </h2>
            <h2 className="p-2">
                <b>Card Number:</b> {variant.details[0].set[0].setNumber}-{variant.details[0].number.toString().padStart(3, '0')}
                <b className='pl-6'>Set:</b> {variant.details[0].set[0].setName}
            </h2>
            <h2 className="p-2">
                <b>{variant.details[0].category[0].name === 'Leader' ? 'Life' : 'Cost'}:</b>{' '}
                    {variant.details[0].cost_life}
                {/* Check to see if card is a Leader or Character and if it is then show the Power data, otherwise do not */}
                {variant.details[0].category[0].name === 'Leader' ||
                    variant.details[0].category[0].name === 'Character' ? (
                        <span>
                            <b className="pl-6">Power:</b> {variant.details[0].power}
                        </span>
                    ) : null}
                
              
            </h2>
            <h2 className="p-2">
                <b>Color:</b> {variant.details[0].color.map((color) => color.name).join(', ')}
                {/* Check to see if card has an effect, if it doesn't then don't show the effect field */}
                {/* Check to see if card has an attribute, if it doesn't then don't show the effect field */}
                {variant.details[0].abilities.length !== 0 && (
                    <span>
                        <b className='pl-6'>Abiliites:</b> {variant.details[0].abilities.map((abilities) => abilities.name).join(', ')}
                    </span>
                )}
            </h2>
            <h2 className="p-2">
                <b>Types:</b> {variant.details[0].types.map((type) => type.name).join(', ')}
            </h2>
            <h2 className="p-2">
              <b>Block:</b> {variant.details[0].block}
              {/* Check to see if card has an attribute, if it doesn't then don't show the effect field */}
              {variant.details[0].attribute.length !== 0 && (
                  <span className='pl-6'>
                      <b>Attribute:</b> {variant.details[0].attribute[0].name}
                  </span>
              )}
              
            </h2>
            
            {/* Check to see if card has an effect, if it doesn't then don't show the effect field */}
            {variant.details[0].effect !== '' && (
              <p className="p-2 whitespace-pre-wrap">
                <b>Effect:</b> {variant.details[0].effect}
              </p>
            )}
            {/* Check to see if card has an effect, if it doesn't then don't show the effect field */}
            {variant.details[0].trigger !== '' && (
                <p className="p-2 whitespace-pre-wrap">
                    <b>Trigger Effect:</b> {variant.details[0].trigger}
                </p>
            )}

            {/* Add other info here eg counters for the cards*/}
            <div class='p-1 w-1/4'>
                <h2 classname='pr-6'>In Collection</h2>
                <Counter />
            </div>
          </div>
          {showImage && (
            <div className="w-2/5">
              <img src={variant.imgSource} alt={variant.details[0].name} className="max-w-scale-down object-fill" />
            </div>
          )}
        </div>
      )}
    </>
  );
}


// import React, { useState } from 'react';

// export default function PopOutMenu({ variant }) {
//   const [isOpen, setIsOpen] = useState(true);

//   // Render the data related to the selected variant
//   return (
//     <>
//       {isOpen && (
//         <div className="bg-white p-4 rounded-lg flex lg:w-3/5 lg:h-60vh xl:w-3/5 xl:h-60vh overflow-auto">
//           <div className="w-3/5 pr-4">
//             <h2 className="p-2">
//               <b>Name:</b> {variant.details[0].name}
//             </h2>
//             <h2 className="p-2">
//               <b>Card Number:</b> {variant.details[0].set[0].setNumber}-{variant.details[0].number}
//             </h2>
//             <h2 className="p-2">
//               <b>Set:</b> {variant.details[0].set[0].setName}
//             </h2>
//             <h2 className="p-2">
//               <b>Attribute:</b> {variant.details[0].attribute[0].name}
//             </h2>
//             <h2 className="p-2">
//               <b>Color:</b> {variant.details[0].color.map((color) => color.name).join(', ')}
//             </h2>
//             <h2 className="p-2">
//               <b>Types:</b> {variant.details[0].types.map((type) => type.name).join(', ')}
//             </h2>
//             <h2 className="p-2">
//               <b>{variant.details[0].category[0].name === 'Leader' ? 'Life' : 'Cost'}:</b>{' '}
//               {variant.details[0].cost_life}
//             </h2>
//             {/* Check to see if card is a Leader or Character and if it is then show the Power data, otherwise do not */}
//             {variant.details[0].category[0].name === 'Leader' ||
//             variant.details[0].category[0].name === 'Character' ? (
//               <h2 className="p-2">
//                 <b>Power:</b> {variant.details[0].power}
//               </h2>
//             ) : null}

//             {/* Check to see if card has an effect, if it doesn't then don't show the effect field */}
//             {variant.details[0].effect !== '' && (
//               <p className="p-2 whitespace-pre-wrap">
//                 <b>Effect:</b> {variant.details[0].effect}
//               </p>
//             )}
//             {/* Add other info here */}
//           </div>
//           <div className="w-2/5">
//             <img src={variant.imgSource} alt={variant.details[0].name} className="max-w-scale-down object-fill" />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
