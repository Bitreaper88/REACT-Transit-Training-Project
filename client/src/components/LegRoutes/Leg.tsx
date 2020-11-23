import React from 'react';
import ReactTooltip from 'react-tooltip';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';


const Leg: React.FC = () => { 

  const dots = 5;
  const dotArray = [];
  for (let index = 0; index < dots; index++) {
    dotArray.push( <div key={'legDot'+index} className="self-center rounded-full bg-gray-600 w-2 h-2 mb-1 transform"></div>);
  }

  const TooltipID = 'someLegIDprop';

  return (
    <div className="flex flex-row h-16 my-1">
      <div className="w-2/6 text-center flex items-stretch">
        <i className="self-center flex-1 material-icons md-36 overflow-hidden text-blue-500">directions_walk</i>
      </div> 
      <div className="w-1/6 flex flex-col self-center">
        {dotArray}
      </div>

      <div  data-tip data-for={TooltipID} className="w-3/6 flex items-stretch">
        <div  className="self-center w-full">

          <ReactTooltip id={TooltipID} place="right" type="light" effect="solid">
              <div className="font-semibold">Turku, Finland</div>
          </ReactTooltip>
     
          <div className="truncate">Turku, Finland</div>
          <div className="font-bold text-xs">Walk 70km</div>
  
        </div>
      </div>

    </div>
  );
};

export default Leg;
