import React, {useState } from 'react';
import './App.css';

const MainNav: React.FC = () => {


  const sideBaseStyle = 'absolute pt-8 inset-y-0 left-0 bg-gray-200 w-64 h-full shadow transition duration-500 ease-in-out transform ';
  const xTranslation = ' -translate-x-64';

  const [sideBarStyle, setSidebarStyle] = useState(sideBaseStyle);
  const [sideBarStatus, setSidebarStatus] = useState(false);

  const comparsionBaseStyle = 'md:ml-64 pointer-events-none transition duration-500 ease-in-out transform ';
  const YTranslation = 'md:-translate-y-64 translate-y-64';

  const [comparisonStyle, setComparisonStyle] = useState(comparsionBaseStyle);
  const [comparisonStatus, setComparisonStatus] = useState(false);


  const carBaseStyle = 'ml-64 pointer-events-none transition duration-500 ease-in-out transform ';
  const negativeYTranslation = '-translate-y-64';
  

  const [carStyle, setCarStyle] = useState(carBaseStyle);
  const [carStatus, setCarStatus] = useState(false);


  function translateSideBar() {
    if (sideBarStatus) setSidebarStyle(sideBaseStyle);
    else  setSidebarStyle(sideBaseStyle+xTranslation);
    setSidebarStatus(!sideBarStatus);

  }

  function comparisonBtn(){
    if (comparisonStatus) setComparisonStyle(comparsionBaseStyle);
    else  setComparisonStyle(comparsionBaseStyle+YTranslation); 
    setComparisonStatus(!comparisonStatus);
  }

  function carBtn(){
    if (carStatus) setCarStyle(carBaseStyle);
    else  setCarStyle(carBaseStyle+negativeYTranslation); 
    setCarStatus(!carStatus);
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
       <div className={comparisonStyle}>
          <div className='md:h-58 shadow bg-white md:w-1/2 md:mx-auto md:rounded-none h-40 rounded-b'>
            <h1>Transport comparison</h1>
          </div>
        </div>
      </div>

      <div className='absolute mt-8 w-full'>
       <div className={carStyle}>
          <div className='md:h-58 shadow bg-white md:w-1/5 w-1/2 ml-10 mr-auto md:rounded-none h-40 rounded-b'>
            <h1>Car</h1>
          </div>
        </div>
      </div>

      <div className='absolute grid grid-cols-3 gap-4 h-8 pl-64 w-screen bg-blue-500 shadow'>
        <button onClick={carBtn} className='focus:outline-none ml-10 bg-white justify-self-star w-8'>car</button>
        
        <button onClick={comparisonBtn} className='focus:outline-none bg-white justify-self-center'>
          Comparison
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
