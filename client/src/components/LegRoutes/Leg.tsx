import React from 'react';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';

const Leg: React.FC = () => { 
  return (
    <div className="flex h-12">
      <i className="material-icons overflow-hidden text-blue-500">directions_walk</i>
      <div className="flex flex-col ml-8 pl-1 w-1 h-12">
        <div className="rounded-full bg-black w-1 h-1"></div>
        <div className="rounded-full bg-black w-1 h-1"></div>
        <div className="rounded-full bg-black w-1 h-1"></div>
        <div className="rounded-full bg-black w-1 h-1"></div>
        <div className="rounded-full bg-black w-1 h-1"></div>
        <div className="rounded-full bg-black w-1 h-1"></div>
        <div className="rounded-full bg-black w-1 h-1"></div>
        <div className="rounded-full bg-black w-1 h-1"></div>
        <div className="rounded-full bg-black w-1 h-1"></div>
        <div className="rounded-full bg-black w-1 h-1"></div>
        <div className="rounded-full bg-black w-1 h-1"></div>
        <div className="rounded-full bg-black w-1 h-1"></div>
      </div>
      <div className="ml-4">
        <div className="w-20 whitespace-no-wrap">Turku, Finland</div>
        <p className="w-20 whitespace-no-wrap font-bold text-xs">Walk 70km</p>
      </div>
    </div>
  );
};

export default Leg;
