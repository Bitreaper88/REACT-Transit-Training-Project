import React from 'react';

function Loader(): JSX.Element {
  return (
    <div className=' fixed flex justify-center items-center' style={{zIndex: 9999}}>
      <div className='inline-block animate-pulse ease duration-50 w-5 h-5  rounded-full bg-blue-800 mx-2'></div>
      <div className='inline-block animate-pulse ease duration-50 w-5 h-5  rounded-full bg-blue-800 mx-2'></div>
      <div className='inline-block animate-pulse ease duration-50 w-5 h-5 rounded-full bg-blue-800 mx-2'></div>
      <div className='inline-block animate-pulse ease duration-50 w-5 h-5 rounded-full bg-blue-800 mx-2'></div>
    </div>
  );
}

export default Loader;
