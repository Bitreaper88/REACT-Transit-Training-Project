import React, { useEffect, useState } from 'react';
import Location from './Location';
import { ICoordinates, IRouteRequest } from './RouteFetch';

interface IDirectionProps {
  setReq: React.Dispatch<React.SetStateAction<IRouteRequest | undefined>>;
}

const DirectionCoordinates: React.FC<IDirectionProps> = (
  props: IDirectionProps
) => {
  const [origin, setOrigin] = useState<ICoordinates>();
  const [destination, setDestination] = useState<ICoordinates>();

  useEffect(() => {
    if (!origin || !destination) return;
    props.setReq({ from: origin, to: destination });
    console.log(origin);
    console.log(destination);
  }, [origin, destination]);

  return (
    <div>
      <Location
        key='origin'
        fieldName='Origin'
        coordinates={{ position: origin, setPosition: setOrigin }}
      />
      <Location
        key='destination'
        fieldName='Destination'
        coordinates={{ position: destination, setPosition: setDestination }}
      />
    </div>
  );
};

export default DirectionCoordinates;
