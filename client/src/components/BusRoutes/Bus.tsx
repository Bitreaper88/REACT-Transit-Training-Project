import React from 'react';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';

const Bus: React.FC = () => { 
  return (
    <div className="flex h-12">
      <i className="material-icons overflow-hidden text-blue-500">directions_bus</i>
      <div className="w-6 ml-12"><div className="w-1 h-12 bg-black"></div></div>
       <div>
        <div className="w-20 whitespace-no-wrap ml-3">Turku, Finland</div>
        <p className="w-20 whitespace-no-wrap ml-3 font-bold text-xs">Travel 70km</p>
      </div>
    </div>
  );
};

export default Bus;
