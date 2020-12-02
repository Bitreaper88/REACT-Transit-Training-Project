import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import * as Constants from '../constants';
import * as Types from './RouteFetch.types';
import { graphQLRequest } from './RouteFetch.publicAPI';
import carAPIcall from './RouteFetch.carAPI';
import { ResponseContext } from './ResponseContext';
import TransportModes, { Selectable } from './TransportModes';
import { TransitMode } from './TransitTypes';
import DateTime from './TimeDate';
import DiretionComponent from './DirectionComponent';

export interface ICoordinates {
  lat: number;
  lon: number;
}

export interface IRouteRequest {
  from?: ICoordinates;
  to?: ICoordinates;
  waypoints?: ICoordinates[];
}

function RouteFetch(): JSX.Element {
  const [req, setReq] = useState<IRouteRequest>();
  const [dateTime, setDateTime] = useState<Date | null>(new Date());
  const [modeOptions, setModeOptions] = useState([
    ...Selectable,
    'WALK',
    'CABLE_CAR',
    'FUNICULAR',
  ] as TransitMode[]);
  const [queryModes, setQueryModes] = useState<{ mode: TransitMode }[]>([]);
  const { setRaw } = useContext(ResponseContext);

  //Me Testing
  const [directions, setDirections] = useState<IRouteRequest>();

  useEffect(() => {
    const modes = modeOptions.map((mode) => {
      return { mode: mode };
    });
    setQueryModes(modes);
  }, [modeOptions]);

  // When new request object is set
  useEffect(() => {
    if (!req || !req.from || !req.to) return;

    // If there are no waypoints in the middle
    if (!req.waypoints || req.waypoints.length === 0) {
      (async () => {
        // Call APIs
        try {
          // Public transit API
          const reqVariables = {
            ...(({ from, to }) => ({ from, to }))(req),
            modes: queryModes,
            date: moment(dateTime).format('YYYY-MM-DD'),
            time: moment(dateTime).format('hh:mm:ss'),
          };

          const publicPromise = axios(Constants.URL_API, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({
              query: graphQLRequest,
              variables: reqVariables,
            }),
          });

          // Car route API
          const carFrom = `${req.from?.lon},${req.from?.lat}`;
          const carTo = `${req.to?.lon},${req.to?.lat}`;
          const carPromise = carAPIcall(
            `/driving/${carFrom};${carTo}?alternatives=true&geometries=polyline&steps=true&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
          );

          // Handle responses
          Promise.all([publicPromise, carPromise])
            .then((resp) => {
              const publicResp = [resp[0].data.data as Types.IData];
              const carResp = [resp[1].data as Types.ICarRouteAPI];

              if (!carResp[0].routes.length) {
                alert(
                  'Could not find a car route from or to your destination.'
                );
                return;
              } else if (publicResp[0].plan.itineraries.length === 0) {
                alert(
                  'Could not find a public route from or to your destination.'
                );
                return;
              }

              // Push to context
              setRaw({
                public: publicResp,
                car: carResp,
              });
            })
            .catch((err) => {
              alert('Error! Could not connect to API.');
              console.log(err);
              return;
            });
        } catch (err) {
          alert('Error connecting to APIs!');
          console.log(err);
          return;
        }
      })();
    }
  }, [req]);
  return (
    <div>
      <DiretionComponent {...{ setReq }} />
      <DateTime dt={{ dateTime, setDateTime }} />
      <TransportModes onChange={(selected) => setModeOptions(selected)} />
      {/* Dev Button */}
      <button
        style={{ fontSize: '24px' }}
        onClick={() =>
          setReq({
            ...req,
            from: {
              lat: 60.45169,
              lon: 22.26686,
            },
            to: {
              lat: 61.49774,
              lon: 23.76129,
            },
          })
        }
      >
        devFetch
      </button>
    </div>
  );
}

export default RouteFetch;
