import React, {useState, useEffect } from 'react';
import './App.css';

const MainNav: React.FC = () => {


  const sideBaseStyle = 'absolute pt-8 inset-y-0 left-0 bg-gray-200 w-64 h-full shadow transition duration-500 ease-in-out transform ';
  const xTranslation = ' -translate-x-64';

  const [sideBarStyle, setSidebarStyle] = useState(sideBaseStyle);
  const [sideBarStatus, setSidebarStatus] = useState(false);

  const comparsionBaseStyle = 'md:ml-64 bg-black transition duration-500 ease-in-out transform ';
  const negativeYTranslation = 'md:-translate-y-64 translate-y-64';

  const [comparisonStyle, setComparisonStyle] = useState(comparsionBaseStyle);
  const [comparisonStatus, setComparisonStatus] = useState(false);


  function translateSideBar() {
    if (sideBarStatus) setSidebarStyle(sideBaseStyle);
    else  setSidebarStyle(sideBaseStyle+xTranslation);
    setSidebarStatus(!sideBarStatus);

  }

  function comparisonBtn(){
    console.log('comparisonStatus ' + comparisonStatus);
    if (comparisonStatus) setComparisonStyle(comparsionBaseStyle);
    else  setComparisonStyle(comparisonStyle+negativeYTranslation); 
    setComparisonStatus(!comparisonStatus);
  }

  return (
    <>
      <div className={sideBarStyle}>
        SideBar
        <div className='absolute pt-8 inset-y-0 left-0 h-full transform translate-x-64 flex items-stretch'>
         <button onClick={() => translateSideBar()}
          className='w-5 h-10 bg-white shadow right-0 self-center flex-1
          transition duration-500 ease-in-out
          transform hover:-translate-x-1 focus:outline-none'>
          {sideBarStatus ? '>' : '<'}
         </button>
        </div>

        <div className='p-2 bg-white text-gray-800'>
          Sidebar components are loaded in here
        </div>
      </div>

      <div className='md:absolute md:mt-8 md:bottom-auto fixed w-full bottom-0'>
       <div className={comparisonStyle}> {/*  This needs to be made click through */}
          <div className='md:h-58 shadow bg-white md:w-1/2 md:mx-auto h-40'>
            <h1>Transport comparison</h1>
          </div>
        </div>
      </div>

      <div className='absolute grid grid-cols-3 gap-4 h-8 pl-64 w-screen bg-blue-500 shadow'>
        <button className='focus:outline-none ml-10 bg-white justify-self-star w-8'>car</button>
        
        <button onClick={comparisonBtn} className='focus:outline-none bg-white justify-self-center'>Comparison
        </button>
        <button className='bg-green-500 justify-self-end'>Menu</button>
      </div>

      <div className='bg-orange-800 h-8 w-64 absolute top-0 left-0'>
        TopbarLogo
      </div>
    </>
  );
};

export default MainNav;
