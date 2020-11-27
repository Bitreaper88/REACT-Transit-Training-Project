import React, { useContext } from 'react';
import { ResponseContext } from './ResponseContext';
import { ICarSetup } from './CarSetup';
import '../../node_modules/material-design-icons/iconfont/material-icons.css';

const Comparison: React.FC<ICarSetup> = (props) => {
  const { parsed } = useContext(ResponseContext);
  // eslint-disable-next-line
  const {fuelEco, tank, fuelPrice} = props;

  let fuelCost = 0;
  let carDistance = 0;
  let carDuration = 0;
  let totalFuel =  0;
  let reFills =  '';

  if (parsed?.carDf?.distance && parsed?.carDf?.duration){
    carDistance = parsed.carDf.distance / 1000;
    fuelCost = carDistance * fuelEco[0] * fuelPrice[0] /100;
    carDuration = parsed.carDf.duration /60;
    totalFuel = carDistance * fuelEco[0] /100;
    
    if (tank[0] > totalFuel){
      reFills = 'none';
    }
    else {
      const refillCount = Math.ceil( totalFuel % tank[0] );
      reFills = refillCount.toString();
    }

  }

  let pubDuration = 0;
  let pubDistance = 0;
  let walkingDistance  = 0;
  let transfers = 0;

  if (parsed?.pubDf?.legs && parsed?.pubDf?.duration){
    pubDuration = parsed.pubDf.duration / 60; // This is in minutes now?
    parsed.pubDf.legs.forEach(legs => pubDistance = pubDistance + legs.distance);
    pubDistance = pubDistance / 1000;
    walkingDistance = parsed.pubDf.walkDistance / 1000;
    transfers = parsed.pubDf.legs.length - 2;
  }

  return (
    <div className='flex pt-3 h-full p-1 font-semibold'>
        <div className='w-1/2'>
          <span className='text-lg text-blue-500 font-bold'>Personal vehicle</span>
          <p>
            Distance: {carDistance.toFixed(2)} km
          </p>
          <p>
            Time: {carDuration.toFixed(2)}
          </p>
          <p>
            Fuel cost: {fuelCost.toFixed(2)} €
          </p>
          <p>
            Refills: {reFills}
          </p>
          <p>
            Total needed fuel: {totalFuel.toFixed(2)} l
          </p>
        </div>
        <div className='bg-blue-500 w-1 my-2 transform scale-x-75'/>
        <div className='w-1/2'>
          <span className='text-lg text-purple-500 font-bold'>Public transit</span>
          <p>
            Distance: {pubDistance.toFixed(2)} km
          </p>
          <p>
            Time: {pubDuration.toFixed(2)}
          </p>
          <p>
            Ticket cost: we don´t have €
          </p>
          <p>
            Transfers: {transfers}
          </p>
          <p>
            Walking: {walkingDistance.toFixed(2)} km
          </p>
        </div>
    </div>
  );
};

export default Comparison;