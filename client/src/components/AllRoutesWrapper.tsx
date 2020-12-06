import React, { useContext, useEffect, useState } from 'react';
import Leg from './LegRoutes/Leg';
import StartEnd from './Duration/StartEnd';
import DateIconLoc from './Duration/DateIconLoc';
import { TransitMode} from './TransitTypes';
import { ResponseContext } from './ResponseContext';
import '../../node_modules/material-design-icons/iconfont/material-icons.css';

export interface IItinerary {
  time:  string,
  place: string,
}

export interface ILeg {
  time:  string,
  agency: string,
  distance: number,
  mode: TransitMode,
}

const options = {
 // weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  hour: 'numeric', minute: 'numeric',
  hour12: false,
};

const RoutesSelector: React.FC = () => {

  const { parsed } = useContext(ResponseContext);
  const routes: JSX.Element[] = [];

  parsed?.pubItins.forEach((itin, index) =>{
    routes.push(<RoutesWrapper key={index+'Routes'} index={index} />);
  });

  return (
    <>
      {routes}      
    </>
  );

};

interface IRoutesWrapper {
  index: number
 // legs: ILeg[]
}

const RoutesWrapper: React.FC<IRoutesWrapper>  = (props: IRoutesWrapper ) => {
   // Currently selected routes, updates any time a new itinerary is selected.
  
  const { currentPubItin, parsed, setCurrentPubItin} = useContext(ResponseContext);
 
  if (!parsed) return (<></>);
  const currentLegs = parsed.pubItins[props.index].legs;
  let showRouteDef = true;
  let showRouteCSSDef = 'h-0 ';
  let selectedDef = ' bg-blue-500 ';
  if (props.index <= 0){
    showRouteDef = false;
    showRouteCSSDef = 'h-auto';
    selectedDef = ' bg-purple-500 ';
  }
  const [showRoute, setShowRoute] = useState(showRouteDef);
  const [showRouteCSS, setShowRouteCSS] = useState(showRouteCSSDef);

  
  const [selected, setSelected] = useState(selectedDef);

  function routeToggle() {    
    if(showRoute) setShowRouteCSS(' h-auto ');
    else setShowRouteCSS(' h-0 ');

    setShowRoute(!showRoute);
    setCurrentPubItin(props.index);
  }

  useEffect(() => {
    if (currentPubItin === props.index) setSelected(' bg-purple-500 ');
    else  setSelected(' bg-blue-500 '); 
  });


  if (currentLegs){
    const startTime = new Date(currentLegs[0].startTime);
    const endTime = new Date(currentLegs[currentLegs.length-1].endTime);

    const legsArray: JSX.Element[] = [];
    currentLegs.forEach(legs => {
      let agency = '';
      if (legs.agency?.name) agency = legs.agency?.name;
       const startTime = new Date(legs.startTime);
       legsArray.push(<DateIconLoc key={legs.startTime} time={startTime.toLocaleTimeString('en-US', options).toString()} place={legs.from.name} />);
       legsArray.push(<Leg key={legs.endTime-1} time={startTime.toLocaleTimeString('en-US', options).toString()} agency={agency} distance={legs.distance / 1000} mode={legs.mode}/>);
    });
  

    return (
      <div className='border-b-2 border-gray-800 mb-2'>
        <div onClick={routeToggle} className= {selected + 'flex w-full mt-1 transition duration-500 ease-in-out h-6 hover:bg-purple-700'}>
        {selected === ' bg-purple-500 ' ?  
          <div className='m-auto text-white font-bold transition duration-500 ease-in-out'>Selected</div>
        : <></>} 
        </div> 
        
        <div className={showRouteCSS + 'overflow-hidden transition duration-500 ease-in-out'}> 
         
          <StartEnd key='from' time={startTime.toLocaleTimeString('en-US', options).toString()} place={currentLegs[0].from.name} />
          {legsArray}
          <StartEnd key='to' time={endTime.toLocaleTimeString('en-US', options).toString()} place={currentLegs[currentLegs.length-1].from.name} />
        </div>
      </div>
    );
  }else {
    return (
    <>
    </>
    );
  }

};

export default RoutesSelector;