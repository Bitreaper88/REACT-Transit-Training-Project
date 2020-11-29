import React from 'react';
import ReactTooltip from 'react-tooltip';
import { ModeIcon } from '../TransitTypes';
import { ILeg } from '../AllRoutesWrapper';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';


const Leg: React.FC<ILeg> = (props: ILeg) => { 

  const dots = 5;
  const dotsArray = [];



  const {time, agency, mode, distance} = props;
  //AppModes[mode];
  const TooltipID = 'someLegIDprop' + time + mode + distance;

 
    for (let index = 0; index < dots; index++) {
      dotsArray.push( <div key={'legDot'+index} className="self-center rounded-full bg-gray-600 w-2 h-2 mb-1 transform"></div>);
    }

  return (
    <div className="flex flex-row h-16 my-1">
      <div className="w-2/6 text-center flex items-stretch">
        <i className="self-center flex-1 material-icons md-36 overflow-hidden text-blue-500">{ModeIcon['WALK']}</i> 
      </div>

      {mode == 'WALK' ?  
        <div className="w-1/6 flex flex-col self-center">
          {dotsArray}
        </div>
      : <div className="w-1/6 flex flex-col h-14">
          <div className="self-center bg-blue-500 w-2 h-full transform scale-x-75"></div>
        </div>}

      <div  data-tip data-for={TooltipID} className="w-3/6 flex items-stretch">
        <div  className="self-center w-full">

          <ReactTooltip id={TooltipID} place="right" type="light" effect="solid">
              <div className="font-semibold">{agency}</div>
          </ReactTooltip>
     
          <div className="truncate">{agency}</div>
          {mode == 'WALK' ? 
            <div className="font-bold text-xs">Walk {distance.toFixed(2)}km</div>
          :
            <div className="font-bold text-xs">Travel {distance.toFixed(2)}km</div>
          }
  
        </div>
      </div>

    </div>
  );
};

export default Leg;
