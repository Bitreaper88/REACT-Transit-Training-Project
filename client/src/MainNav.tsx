import React, {useState } from 'react';
import './App.css';
import MapLeaflet from './MapLeaflet';

const MainNav: React.FC = () => {


  const sideBaseStyle = 'absolute pt-8 inset-y-0 left-0 bg-gray-200 w-64 h-full shadow transition duration-500 ease-in-out transform ';
  const xTranslation = ' -translate-x-64';

  const [sideBarStyle, setSidebarStyle] = useState(sideBaseStyle);
  const [sideBarStatus, setSidebarStatus] = useState(false);

  const comparsionBaseStyle = 'md:ml-64 transition duration-500 ease-in-out transform ';
  const YTranslation = 'md:-translate-y-64 translate-y-64';

  const [comparisonStyle, setComparisonStyle] = useState(comparsionBaseStyle);
  const [comparisonStatus, setComparisonStatus] = useState(false);


  const carBaseStyle = 'md:ml-64 transition duration-500 ease-in-out transform ';
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
    <div className='grid h-screen w-screen'>
     
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

      <div className='md:absolute  md:mt-8 md:bottom-auto fixed w-full bottom-0'>
       <div className={comparisonStyle}>
          <div className='transform xl:translate-x-0 md:translate-x-24 md:h-58 shadow bg-white md:w-1/2 md:mx-auto md:rounded-none h-40 rounded-b'>
            <h1>Transport comparison</h1>
          </div>
        </div>
      </div>

      <div className='h-8 z-30 bg-blue-500 shadow w-full'>
        <div className=' md:z-20 absolute grid md:grid-cols-3 gap-4 md:h-8 h-auto md:pl-64 md:w-screen  right-0 md:p-0 p-2 bg-blue-500'>
          <button onClick={carBtn} className='focus:outline-none w-20 md:ml-10 bg-white md:justify-self-start '>car</button>
          <button onClick={comparisonBtn} className='w-20 focus:outline-none md:ml-0 bg-white md:justify-self-center'>
            Comparison
          </button>
          <button className='bg-green-500 md:ml-auto w-20 focus:outline-none'>Menu</button>
        </div>
      </div>


      <div className='md:absolute md:z-20 z-40  md:mt-8 -mt-8 mx-auto'>
       <div className={carStyle}>
          <div className='md:h-58 shadow bg-white w-48 md:ml-4 md:mr-auto  md:rounded-none h-40 rounded-b'>
            <h1>Car</h1>
          </div>
        </div>
      </div>
      
      <div className='bg-pink-600 z-30 h-8 w-64 absolute top-0 left-0'>
        TopbarLogo
       </div>

      
    </div>

  );
};

export default MainNav;
