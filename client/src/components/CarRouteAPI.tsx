/* eslint-disable react/prop-types */
import React from 'react';
type iRouteAPI = {
  pointA: string,
  pointB: string,
  submitQueryHandler: () => Promise<Response>,
  getPointAValue: () => void,
  getPointBValue: () => void
};

const CarRouteAPI: React.FC<iRouteAPI> = props => {
  const { pointA, pointB, submitQueryHandler, getPointAValue, getPointBValue } = props;

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

export default CarRouteAPI;