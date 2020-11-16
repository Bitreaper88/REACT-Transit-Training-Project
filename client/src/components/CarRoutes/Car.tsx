import React from 'react';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';

const Car: React.FC = () => { 
  return (
    <div className="flex h-12">
      <i className="material-icons overflow-hidden text-blue-500">directions_car</i>
      <div className="w-1 h-12 ml-8 pl-1"><div className="bg-black w-1 h-12"></div></div>
       <div className="ml-4">
        <div className="w-20 whitespace-no-wrap">Espoo, Finland</div>
        <p className="w-20 whitespace-no-wrap font-bold text-xs">Travel 70km</p>
      </div>
    </div>
  );
};

export default Car;