import React from 'react';
import Leg from './LegRoutes/Leg';
import Train from './TrainRoutes/Train';
import Start from './Locations/Start';
import End from './Locations/End';
import Car from './CarRoutes/Car';
import DateIconLoc from './Locations/DateIconLoc';

const RoutesWrapper: React.FC = () => {

  const bodyStl: React.CSSProperties = {
    height: '25rem',
    backgroundColor: '#ccc',
    padding: '.5rem',
    overflow: 'scroll'
  };

  return (
    <div style={bodyStl}>
      <h2>This is the main wrapper</h2>
      <Start />
      <Leg />
      <Train />
      <DateIconLoc />
      <Car />
      <End />
    </div>
  );
};

export default RoutesWrapper;