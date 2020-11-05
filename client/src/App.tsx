import React, { useState } from 'react';
import CarRouteAPI from './components/CarRouteAPI/CarRouteAPI';
import { ICarRouteAPI } from './components/CarRouteAPI/CarRouteAPI.d';
import CarRouteInstance from './components/CarRouteAPI/CarRouteAPIAxiosConfig';

const App: React.FC = () => {
  const [pointA, setPointA] = useState<string>('');
  const [pointB, setPointB] = useState<string>('');
  const [result, setResult] = useState<ICarRouteAPI>();

  const getPointAValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointA(e.currentTarget.value);
  };

  const getPointBValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointB(e.currentTarget.value);
  };

 const submitQueryHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Api call
   try {
     const res = await CarRouteInstance(`/driving/${pointA};${pointB}?alternatives=true&geometries=polyline&steps=true&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`);
     if (res.status === 200) {
       setResult(res.data);
       setTimeout(() => {
         console.log(result);
       }, 2000);
     }
   } catch (err) {
     console.log(err);
    }
  };

  return (
    <div>
      <CarRouteAPI
        pointA={pointA}
        pointB={pointB}
        submitQueryHandler={submitQueryHandler}
        getPointAValue={getPointAValue}
        getPointBValue={getPointBValue}
        />
    </div>
  );
};

export default App;
