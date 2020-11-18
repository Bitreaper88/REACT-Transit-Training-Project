import React from 'react';
import { Tooltip} from '@material-ui/core';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';

const Train: React.FC = () => { 
return (
  <div className="flex flex-row h-16 my-1">
   
    <div className="w-2/6 text-center flex items-stretch">
      <i className="self-center flex-1 material-icons md-36 overflow-hidden text-blue-500">directions_train</i>
    </div>

    <div className="w-1/6 flex flex-col h-14">
        <div className="self-center bg-blue-500 w-2 h-full transform scale-x-75"></div>
    </div>

    <div className="w-3/6 flex items-stretch">
        <div className="self-center w-full ">
          <Tooltip title="Turkusfjpsdjfpsdjfpsjfposdjfops, Finland" arrow>  
            <div className="truncate">Turkusfjpsdjfpsdjfpsjfposdjfops, Finland</div>
          </Tooltip>
          <div className="font-bold text-xs">Walk 70km</div>
        </div>
      </div>

  </div>
);
};

export default Train;