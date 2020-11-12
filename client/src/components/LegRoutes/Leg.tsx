import React from 'react';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';

const Leg: React.FC = () => { 
  return (
    <div className="flex h-12">
      <i className="material-icons overflow-hidden text-blue-500">directions_walk</i>
      <div className="flex flex-col ml-10 w-6 pl-1">
        <i className="material-icons overflow-hidden transform rotate-90">linear_scale</i>
        <i className="material-icons overflow-hidden transform rotate-90">linear_scale</i>
        <i className="material-icons overflow-hidden transform rotate-90 -mt-1">linear_scale</i>
      </div>
      <div>
        <div className="w-20 whitespace-no-wrap ml-3">Turku, Finland</div>
        <p className="w-20 whitespace-no-wrap ml-3 font-bold text-xs">Walk 70km</p>
      </div>
    </div>
  );
};

export default Leg;
