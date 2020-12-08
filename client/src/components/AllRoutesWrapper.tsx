import React, { useContext } from 'react';
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

const RoutesWrapper: React.FC = () => {

  const { current } = useContext(ResponseContext);

  if (current?.pubDf?.legs){
    const startTime = new Date(current.pubDf.legs[0].startTime);
    const endTime = new Date(current.pubDf.legs[current.pubDf.legs.length-1].endTime);

    const legsArray: JSX.Element[] = [];
    current.pubDf.legs.forEach(legs => {
      let agency = '';
      if (legs.agency?.name) agency = legs.agency?.name;
       const startTime = new Date(legs.startTime);
       legsArray.push(<DateIconLoc key={legs.mode + legs.startTime} time={startTime.toLocaleTimeString('en-US', options).toString()} place={legs.from.name} />);
       legsArray.push(<Leg key={legs.mode + (legs.endTime-1)} time={startTime.toLocaleTimeString('en-US', options).toString()} agency={agency} distance={legs.distance / 1000} mode={legs.mode}/>);
    });

    return (
      <>    
        <StartEnd key='from' time={startTime.toLocaleTimeString('en-US', options).toString()} place={current.pubDf.legs[0].from.name} />
        {legsArray}
        <StartEnd key='to' time={endTime.toLocaleTimeString('en-US', options).toString()} place={current.pubDf.legs[current.pubDf.legs.length-1].from.name} />
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