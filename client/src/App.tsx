import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [pointA, setPointA] = useState<string>('');
  const [pointB, setPointB] = useState<string>('');
  const [result, setResult] = useState({});

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
             <input type="text" value={pointA} onChange={getPointAValue} id="pointA" className="outline-color-2"/>
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

export default App;

// import React, { useState } from 'react';
// import CarRouteAPI from './components/CarRouteAPI';
// import axios from 'axios';

// const App: React.FC = () => {
//   const [pointA, setPointA] = useState<string>('');
//   const [pointB, setPointB] = useState<string>('');

//   const getPointAValue = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPointA(e.currentTarget.value);
//   };

//   const getPointBValue = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPointB(e.currentTarget.value);
//   };

//  const submitQueryHandler = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Api call
//    try {
//      const res = await axios.get(`https://graphhopper.com/api/1/route?point=49.932707,11.588051&point=50.3404,11.64705&vehicle=car&debug=true&key=${process.env.REACT_APP_CAR_ROUTE_API_TOKEN}&type=json`);
//      if (res.status === 200) console.log(res.data);
//    } catch (err) {
//      console.log(err);
//     }
//   };


//   return (
//     <div>
//       <CarRouteAPI
//         submitQueryHandler={submitQueryHandler}
//         pointA={pointA}
//         pointB={pointB}
//         getPointAValue={getPointAValue}
//         getPointBValue={getPointBValue}/>
//     </div>
//   );
// };

// export default App;