import React from 'react';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';
// Due to deprication warning, change when Material UI Core V5 is released!

const Start: React.FC = () => { 

  const d = new Date();
  return (
    <div className="flex my-1">

      <div className="w-2/6">
        <h4 className="w-full font-medium">{`${d.getHours()} : ${d.getMinutes()}`}</h4>
      </div>
      
      <div className="w-1/6 flex flex-col">
        <i className="self-center material-icons md-36 overflow-hidden text-red-600">location_on</i>
      </div>

      <div className="w-3/6 ">
        <div className="tooltip">
          {/* Thees two should contain the same variable so that in the event of the
          city name getting cut off it can still be read from the tool tip */}
          <div className="truncate font-semibold">Turkusfjpsdjfpsdjfpsjfposdjfops, Finland</div> 
          <span className="tooltiptext p-1">Turkusfjpsdjfpsdjfpsjfposdjfops, Finland</span>
        </div>
      </div>
      
    </div>
  );
};

export default Start;