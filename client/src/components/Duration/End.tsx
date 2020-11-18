import React from 'react';
import { Tooltip} from '@material-ui/core';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';

const End: React.FC = () => { 

  const d = new Date();
  return (
    <div className="flex my-1">

      <div className="w-2/6">
        <h4 className="w-full font-medium">{`${d.getHours()} : ${d.getMinutes()}`}</h4>
      </div>
      
      <div className="w-1/6 flex flex-col">
        <i className="self-center material-icons md-36 overflow-hidden text-green-600">location_on</i>  
      </div>

      <div className="w-3/6">
        <Tooltip title="Turku, Finland" arrow>  
            <div className="truncate font-semibold">Turku, Finland</div>
        </Tooltip>
      </div>

    </div>
  );
};

export default End;


