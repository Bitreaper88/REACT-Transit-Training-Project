// Once the there is a clearer path, points could be props...
import React, { useState } from 'react';
import axios from 'axios';
import { ICarRouteAPI } from './CarRouteAPI.d';

const CarRouteAPI: React.FC = () => {
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
     const res = await axios({
       url: `https://api.mapbox.com/directions/v5/mapbox/driving/${pointA};${pointB}?alternatives=true&geometries=polyline&steps=true&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`,
       method: 'GET',
       headers: {
         'Access-Control-Allow-Origin': '*',
         'Content-type': 'application/json; charset=utf-8'
       }
     });
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
      <form onSubmit={submitQueryHandler} style={{display: 'flex'}}>
        <div>
          <label htmlFor="pointA">PointA
             <input type="text" value={pointA} onChange={getPointAValue} id="pointA"/>
          </label>
        </div>
        <div>
          <label htmlFor="pointB">
            <input type="text" value={pointB} onChange={getPointBValue} id="pointB"/>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CarRouteAPI;
