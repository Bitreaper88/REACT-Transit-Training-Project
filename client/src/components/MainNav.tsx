import React, {useState } from 'react';
import '../../node_modules/material-design-icons/iconfont/material-icons.css';

// Available iocons easyly searched for in https://material.io/resources/icons/?style=baseline

const MainNav: React.FC = () => {


  const sideBaseStyle = 'absolute pt-12 inset-y-0 left-0 bg-gray-200 w-64 h-full shadow transition duration-500 ease-in-out transform ';
  const xTranslation = ' -translate-x-64';

  const [sideBarStyle, setSidebarStyle] = useState(sideBaseStyle);
  const [sideBarStatus, setSidebarStatus] = useState(false);

  const comparsionBaseStyle = 'md:ml-64 transition duration-500 ease-in-out transform ';
  const YTranslation = 'md:-translate-y-64 translate-y-64';

  const [comparisonStyle, setComparisonStyle] = useState(comparsionBaseStyle);
  const [comparisonStatus, setComparisonStatus] = useState(false);


  const carBaseStyle = 'md:ml-56 transition duration-500 ease-in-out transform ';
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

  // function test(){
  //   alert('test alert');
  // }   <button onClick={test} className='bg-red-700 absolute'>test</button>

  return (
    <div className='grid h-screen w-screen'>
      
      <div className='bg-blue-500 rounded-br-lg h-12 md:z-50 z-0 w-64 absolute top-0 left-0 font-bold p-2 text-white'>
        <img className='object-contain h-8' src='../magenta_logo.png'/>
        
      </div>
      <div className={sideBarStyle}>

   
        SideBar
        <div className='absolute pt-10 inset-y-0 left-0 h-full transform translate-x-64 flex items-stretch'>
         <button onClick={() => translateSideBar()}
          className='w-5 h-10 bg-white rounded-r shadow right-0 self-center flex-1
          transition duration-500 ease-in-out material-icons z-10
          transform hover:scale-x-125 focus:outline-none'>
          {sideBarStatus ? 'chevron_right' : 'chevron_left'}
         </button>
        </div>

        <div className='p-2 bg-white text-gray-800 pointer-events-auto'>
          Sidebar components are loaded in here
          
        </div>
      </div>

      <div className='w-full'>
        <div className='md:z-30 h-12 shadow absolute md:bg-blue-500 md:flex md:flex-row-reverse md:justify-between md:pl-64 md:w-screen right-0 md:p-0 md:px-3 p-2'>
          
          <div className='md:mt-1 mt-2'>
            <button className='bg-blue-500 focus:outline-none transition duration-500 ease-in-out
                              rounded w-fit
                              material-icons text-white hover:text-blue-300 transform hover:scale-90 md-36'>
            menu
            </button>
          </div>
 
          <div className='md:mt-1 mt-2'>
            <button onClick={comparisonBtn} className='bg-blue-500 focus:outline-none transition duration-500 ease-in-out
                                                        rounded w-fit
                                                        material-icons text-white hover:text-blue-300 transform hover:scale-90 md-36'>
              compare
            </button>
          </div>
          
          <div className='md:ml-12 md:mt-1 mt-2'>
            <button onClick={carBtn} className='bg-blue-500 focus:outline-none transition duration-500 ease-in-out
                                                rounded w-fit
                                                material-icons text-white hover:text-blue-300 transform hover:scale-90 md-36'>
              directions_car
              <span className='md:mt-1 md:-ml-5 absolute w-6 top-0 -m-2 rounded-full bg-blue-500 inset-x-0
                          material-icons overflow-hidden text-green-400 md-24'>
            check_circle_outline</span>            
            </button>
          </div>
        </div>
      </div>

      {/* full widht aligment container */}
      <div className='absolute md:z-20 z-40 w-full md:mt-12 no pointer-events-none'> {/* pointer-events-none very importatn as this container covers part of the side bar*/}
       {/* drawer */}
       <div className={carStyle}>
          <div className='md:h-58 shadow bg-white w-64 md:ml-4 md:mr-auto md:relative absolute right-0 mr-16 md:rounded-none h-40 rounded-b pointer-events-auto'>
          <CarSetup/>
          </div>
        </div>
      </div>

      {/* full widht aligment container */}
      <div className='md:absolute z-20 md:mt-12 md:bottom-auto w-full fixed bottom-0  pointer-events-none'> {/* pointer-events-none very importatn as this container covers part of the side bar*/}
       {/* drawer */}
       <div className={comparisonStyle}>
          <div className='transform xl:translate-x-0 md:translate-x-24 md:h-58 shadow bg-white md:w-1/2 md:mx-auto md:rounded-none h-40 rounded-b pointer-events-auto'>
            <h1>Transport comparison</h1>
          </div>
        </div>
      </div>


    </div>

  );
};


const CarSetup: React.FC = () => {

  const [fuelEco, setFuelEco]     = useState<string>('0');
  const [tankSize, setTankSize]   = useState<string>('0');
  const [fuelPrice, setfuelPrice] = useState<string>('0');

  return(
          <>fuelEco {fuelEco}
            <div className='p-1 flex items-stretch'>
              <span className='material-icons overflow-hidden text-blue-500 md-48'>directions_car</span>
              <span className='text-lg text-gray-700 font-bold mx-1 self-center flex-1 text-left border-b-2 border-blue-500'>
                Setup your car
              </span>
            </div>
            <form className='w-full mx-1'>
              <div className='transform translate-x-4'>
                <div  className='flex items-center pb-2'>
                    <div className='w-2/5  text-right'>
                      <label className='block font-medium'>Fuel economy</label>
                    </div>
                    <div className='w-1/5 mx-1'>
                      <input onChange={(event) => setFuelEco(event.target.value)}
                      className='bg-gray-200 appearance-none border-b-2 border-blue-500 w-full text-center text-purple-500 font-bold leading-tight focus:outline-none focus:bg-white focus:border-purple-500' placeholder="0.0" step=".1" type='number'/>
                    </div>
                    <div className=''>
                      <label className='block font-medium'>l/100km</label>
                    </div>
                </div>

                <div  className='flex items-center pb-2'> 
                    <div className='w-2/5  text-right'>
                      <label className='block font-medium'>Fuel tank size</label>
                    </div>
                    <div className='w-1/5 mx-1'>
                      <input onChange={(event) => setTankSize(event.target.value)}
                      className='bg-gray-200 appearance-none border-b-2 border-blue-500 w-full text-center text-purple-500 font-bold leading-tight focus:outline-none focus:bg-white focus:border-purple-500' placeholder="0" step="1" type='number'/>
                    </div>
                    <div className=''>
                      <label className='block font-medium'>l</label>
                    </div>
                </div>
                  
                <div  className='flex items-center pb-2'>
                    <div className='w-2/5 text-right'>
                      <label className='block font-medium '>Fuel price</label>
                    </div>
                    <div className='w-1/5 mx-1'>
                      <input onChange={(event) => setfuelPrice(event.target.value)}
                      className='bg-gray-200 appearance-none border-b-2 border-blue-500 w-full text-center text-purple-500 font-bold leading-tight focus:outline-none focus:bg-white focus:border-purple-500' placeholder="0.0" step=".1" type='number'/>
                    </div>
                    <div className=''>
                      <label className='block font-medium'>€/l</label>
                    </div>
                </div>
              </div>
            </form>
          </>
  );
};



export default MainNav;
