import  RoutesWrapper from './AllRoutesWrapper';
import React, { useEffect, useRef, useState } from 'react';
import '../../node_modules/material-design-icons/iconfont/material-icons.css';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';
import RouteFetch from './RouteFetch';
import L from 'leaflet';

//import { Overrides } from '@material-ui/core/styles/overrides';
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};
 /* eslint-disable */
declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {}
}

/** import our UI elements */
import CarSetup from './CarSetup';

const blue_100 = '#ebf8ff';
const blue_200 = '#bee3f8';
const blue_300 = '#90cdf4';
const blue_400 = '#63b3ed';
const blue_500 = '#4299e1';
const blue_600 = '#3182ce';
const blue_700 = '#2b6cb0';
const blue_800 = '#2c5282';
const blue_900 = '#2a4365';

const materialTheme = createMuiTheme({

  palette: {
    primary: {
      light:blue_500, //757ce8
      main: blue_700, //3f50b5
      dark: blue_900, //002884
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    //This wont work as it messe up the callender header
    //htmlFontSize: 12,
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: blue_500, // blue-500
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
          // backgroundColor: blue_200,
          // color: 'white',
      },
    },
    MuiPickersDay: {
      day: {
        color: blue_700,
      },
      daySelected: {
        backgroundColor: blue_500,
      },
      dayDisabled: {
        color: blue_200,
      },
      current: {
        color: blue_900,
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color:  '#000',
      },
    },
  },
});

// Available iocons easyly searched for in https://material.io/resources/icons/?style=baseline
const MainNav: React.FC = () => {

  // Prevents the map from hogging all the clicks
  const uiRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (uiRef.current){
      L.DomEvent.disableClickPropagation(uiRef.current);
    }
  }, []);

  const sideBaseStyle = 'absolute pt-12 inset-y-0 left-0 bg-gray-200 w-64 h-full shadow transition duration-500 ease-in-out cursor-auto pointer-events-auto transform ';
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
  const [selectedDate, handleDateChange] = React.useState<Date | null>(new Date());
  
  return (
    <div className='grid h-screen w-screen absolute z-1000 pointer-events-none'
        ref={uiRef}>
      
      <div className='bg-blue-500 rounded-br-lg h-12 md:z-50 z-10 w-64 absolute top-0 left-0 font-bold p-2 text-white cursor-auto pointer-events-auto'>
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={materialTheme}>
            <DateTimePicker
              label='Time of departure'
              value={selectedDate}
              onChange={newDate => handleDateChange(newDate)}
              ampm={false}
              disablePast={true}
              fullWidth={true}
              //format='string'       
              />
            </ThemeProvider>
        </MuiPickersUtilsProvider>
          <RoutesWrapper/>
        <RouteFetch />
          
        </div>
      </div>

      <div className='w-full'>
        <div className='md:z-30 h-12 shadow absolute md:bg-blue-500 md:flex md:flex-row-reverse md:justify-between 
                              md:pl-64 md:w-screen right-0 md:p-0 md:px-3 p-2 cursor-auto pointer-events-auto'>        
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
      <div className='absolute md:z-20 z-40 w-full md:mt-12 no pointer-events-none cursor-auto'> {/* pointer-events-none very importatn as this container covers part of the side bar*/}
       {/* drawer */}
       <div className={carStyle}>
          <div className='md:h-58 shadow bg-white w-64 md:ml-4 md:mr-auto md:relative absolute right-0 mr-16 md:rounded-none h-40 rounded-b pointer-events-auto'>
          <CarSetup/>
          </div>
        </div>
      </div>

      {/* full widht aligment container */}
      <div className='md:absolute z-20 md:mt-12 md:bottom-auto w-full fixed bottom-0  pointer-events-none cursor-auto'> {/* pointer-events-none very importatn as this container covers part of the side bar*/}
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

export default MainNav;
