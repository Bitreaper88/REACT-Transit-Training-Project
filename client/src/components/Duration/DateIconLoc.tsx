import React from 'react';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';

const DateIconLoc: React.FC = () => { 
  const d = new Date();
  return (
    <div className="flex items-center mt-1">
      <h4 className="mr-3">{`${d.getHours()} : ${d.getMinutes()}`}</h4>
      <div className="rounded-full bg-gray-400 w-3 h-3 ml-2 border-red-200"></div>
      <div className="w-20 ml-4 whitespace-no-wrap pl-1">This way...</div>
    </div>
  );
};

export default DateIconLoc;