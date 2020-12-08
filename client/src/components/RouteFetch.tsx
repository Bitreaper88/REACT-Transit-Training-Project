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
import { ErrorContext } from './ErrorContext';
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
  const [req, setReq] = useState<IRouteRequest>();                            // Update to trigger API calls
  const [dateTime, setDateTime] = useState<Date | null>(new Date());          // Selected date and time
  const [modeOptions, setModeOptions] = useState(
    [...Selectable, 'WALK', 'CABLE_CAR', 'FUNICULAR'] as TransitMode[]);
  const [queryModes, setQueryModes] = useState<{ mode: TransitMode }[]>([]);
  const { setRaw } = useContext(ResponseContext);
  const { showError } = useContext(ErrorContext);

  const [askUser, setAskUser] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Format list of modes in preparation of API call
  useEffect(() => {
    const modes = modeOptions.map(mode => {
      return { mode: mode };
    });
    setQueryModes(modes);
    if (req) setAskUser(true);
  }, [modeOptions]);

  // When new request object is set
  useEffect(() => {
    setAskUser(false);

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
            time: moment(dateTime).format('hh:mm:ss')
          };

          const publicPromise = axios(Constants.URL_API, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({
              query: graphQLRequest,
              variables: reqVariables
            })
          });

          // Car route API
          const carFrom = `${req.from?.lon},${req.from?.lat}`;
          const carTo = `${req.to?.lon},${req.to?.lat}`;
          const carPromise = carAPIcall(`/driving/${carFrom};${carTo}?alternatives=true&geometries=polyline&steps=true&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`);

          // Handle responses
          Promise.all([publicPromise, carPromise])
            .then(resp => {
              const publicResp = [resp[0].data.data as Types.IData];
              const carResp = [resp[1].data as Types.ICarRouteAPI];

              if (!carResp[0].routes.length) {
                showError('Could not find a car route to your destination.');
                return;
              }
              else if (publicResp[0].plan.itineraries.length === 0) {
                showError('Could not find a public transit route with selected methods to your destination.');
                return;
              }

              // Push to context
              setRaw({
                public: publicResp,
                car: carResp
              });
            })
            .catch(err => {
              showError('Error! Could not connect to API. The service may be down. Please try again later.');
              console.log(err);
              return;
            });

        }
        catch (err) {
          showError('Error connecting to APIs! The service may be down. Please try again later.');
          console.log(err);
          return;
        }
      })();
    }
  }, [req, forceUpdate]);

  return (
    <div>
      <DiretionComponent {...{ setReq }} />
      <DateTime dt={{ dateTime, setDateTime }} />
      <TransportModes onChange={(selected) => setModeOptions(selected)} />

      {/* WIP: Needs to be styled correctly */}
      {askUser &&
          <div className='absolute z-10 bg-white left-6 p-2'>
            <button className='text-lg text-white p-1 rounded-sm bg-indigo-500' onClick={() => {
              setForceUpdate(forceUpdate + 1);
            }}>REFRESH ROUTE</button>
          </div>}

    </div>
  );
}

export default RouteFetch;
