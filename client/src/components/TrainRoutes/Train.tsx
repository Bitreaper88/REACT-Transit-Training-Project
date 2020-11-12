import React from 'react';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';

const Train: React.FC = () => { 
  return (
    <div className="flex h-12">
      <i className="material-icons overflow-hidden text-blue-500">directions_train</i>
      <div className="w-6 ml-12"><div className="w-1 h-12 bg-black"></div></div>
       <div>
        <div className="w-20 whitespace-no-wrap ml-3">Espoo, Finland</div>
        <p className="w-20 whitespace-no-wrap ml-3 font-bold text-xs">Walk 70km</p>
      </div>
    </div>
  );
};

export default Train;
