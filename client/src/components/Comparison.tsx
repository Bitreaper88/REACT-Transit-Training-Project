import React, { useContext, useState } from 'react';
import { ResponseContext } from './ResponseContext';
import '../../node_modules/material-design-icons/iconfont/material-icons.css';

const Comparison: React.FC = () => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fuelEco, setFuelEco]     = useState<string>('0');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tankSize, setTankSize]   = useState<string>('0');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fuelPrice, setfuelPrice] = useState<string>('0');

  const { parsed } = useContext(ResponseContext);


  return (
    <div className='flex pt-3 h-full p-1 font-semibold'>
        <div className='w-1/2'>
          <span className='text-lg text-blue-500 font-bold'>Personal vehicle</span>
          <p>
            Distance:  {parsed?.carDf?.distance} km
          </p>
          <p>
            Time:  {parsed?.carDf?.duration}
          </p>
          <p>
            Fuel cost: €
          </p>
          <p>
            Refills: none
          </p>
          <p>
            Total needed fuel: 10.0 l
          </p>
        </div>
        <div className='bg-blue-500 w-1 my-2 transform scale-x-75'/>
        <div className='w-1/2'>
          <span className='text-lg text-purple-500 font-bold'>Publiic transit</span>
          <p>
            Distance: km
          </p>
          <p>
            Time:{parsed?.pubDf?.duration}
          </p>
          <p>
            Ticket cost: €
          </p>
          <p>
            Transfers: none
          </p>
          <p>
            Walking: 10.0 l
          </p>
        </div>
    </div>
  );
};

export default Comparison;