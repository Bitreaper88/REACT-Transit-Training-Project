import React, { useContext } from 'react';
import Leg from './LegRoutes/Leg';
import Train from './TrainRoutes/Train';
import StartEnd from './Duration/StartEnd';
import End from './Duration/End';
import Car from './CarRoutes/Car';
import DateIconLoc from './Duration/DateIconLoc';
import Bus from './BusRoutes/Bus';
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
  mode: string,
}


const options = {
 // weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  hour: 'numeric', minute: 'numeric',
  hour12: false,
};

const RoutesWrapper: React.FC = () => {

  const { current } = useContext(ResponseContext);

  if (current?.pubDf?.legs){
    const startTime = new Date(current.pubDf.legs[0].startTime);
    const endTime = new Date(current.pubDf.legs[current.pubDf.legs.length-1].endTime);

    const legsArray: JSX.Element[] = [];
    current.pubDf.legs.forEach(legs => {
      let agency = '';
      if (legs.agency?.name) agency = legs.agency?.name;
       /* legsArray.push( <div key={'legDot'+index} className="self-center rounded-full bg-gray-600 w-2 h-2 mb-1 transform"></div>); */
       const startTime = new Date(legs.startTime);
       legsArray.push(<DateIconLoc time={startTime.toLocaleTimeString('en-US', options).toString()} place={legs.from.name} />);
       legsArray.push(<Leg time={'time place hold'} agency={agency} distance={legs.distance / 1000} mode={legs.mode}/>);
    });

    return (
      <>    
    
      
      <StartEnd time={startTime.toLocaleTimeString('en-US', options).toString()} place={current.pubDf.legs[0].from.name} />
      {legsArray}
    
      {/* <div className="mt-5">
        <Start />
        <div className="">
            <DateIconLoc />
            <Leg />
            <DateIconLoc />
            <Train />
            <DateIconLoc />
            <Car />
            <DateIconLoc />
            <Leg />
            <DateIconLoc />
            <Bus />
        </div>
        <End />
      </div> */}

    <StartEnd time={endTime.toLocaleTimeString('en-US', options).toString()} place={current.pubDf.legs[current.pubDf.legs.length-1].from.name} />
  
      </>
    );
  }else {
    return (
    <>
    </>
    );
  }

};

export default RoutesWrapper;


//<Comparison  fuelEco={[fuelEco, setFuelEco]} tank={[tankSize, setTankSize]} fuelPrice={[fuelPrice, setfuelPrice]}/> 