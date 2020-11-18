import React from 'react';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';

const DateIconLoc: React.FC = () => { 
  const d = new Date();
  return (
    <div className="flex items-center">
      <h4 className="">{`${d.getHours()} : ${d.getMinutes()}`}</h4>
      <div className="rounded-full bg-gray-400 w-3 h-3 border-red-200 mr-2 ml-2"></div>
      <div className="w-20whitespace-no-wrap">This way is...</div>
    </div>
  );
};

export default DateIconLoc;