import React from 'react';
import Leg from './LegRoutes/Leg';
import Train from './TrainRoutes/Train';
import Start from './Duration/Start';
import End from './Duration/End';
import Car from './CarRoutes/Car';
import DateIconLoc from './Duration/DateIconLoc';
import Bus from './BusRoutes/Bus';
import '../../node_modules/material-design-icons/iconfont/material-icons.css';

const RoutesWrapper: React.FC = () => {

  return (
    <div className="overflow-auto h-64">
      <Start />
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
      <End />
    </div>
  );
};

export default RoutesWrapper;