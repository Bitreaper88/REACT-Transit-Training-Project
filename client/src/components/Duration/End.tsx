import React from 'react';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';

const End: React.FC = () => { 

  const d = new Date();
  return (
    <div className="flex h-12 mt-1">
      <h4 className="mr-3 font-medium">{`${d.getHours()} : ${d.getMinutes()}`}</h4>
      <div className="w-6"><i className="material-icons overflow-hidden text-green-600">location_on</i></div>
      <div className="w-20 ml-4 whitespace-no-wrap">Turku, Finland</div>
    </div>
  );
};

export default End;