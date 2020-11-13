import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import * as Constants from '../constants';
import * as Types from './RouteFetch.types';
import { graphQLRequest } from './RouteFetch.publicAPI';
import carAPIcall from './RouteFetch.carAPI';
import { ResponseContext } from './ResponseContext';

export interface ICoordinates {
    lat: number;
    lon: number;
}

export interface IRouteRequest {
    from?: ICoordinates;
    to?: ICoordinates;
    waypoints?: ICoordinates[];
    date: string;
    time: string;
}

function RouteFetch(): JSX.Element {
    const [req, setReq] = useState<IRouteRequest>({
        date: moment().format('YYYY-MM-DD'),
        time: moment().format('h:mm:ss')
    });
    const { setRaw } = useContext(ResponseContext);

    // When new request object is set
    useEffect(() => {
        if (!req.from || !req.to) return;

        // If there are no waypoints in the middle
        if (!req.waypoints || req.waypoints.length === 0) {
            (async () => {

                // Call APIs
                try {

                    // Public transit API
                    const reqVariables = (({from, to, date, time}) => ({from, to, date, time}))(req);
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
                                alert('Could not find a car route from or to your destination.');
                                return;
                            }
                            else if (publicResp[0].plan.itineraries.length === 0) {
                                alert('Could not find a public route from or to your destination.');
                                return;
                            }

                            // Push to context
                            setRaw({
                                public: publicResp,
                                car: carResp
                            });
                        })
                        .catch(err => {
                            alert('Error! Could not connect to API.');
                            console.log(err);
                            return;
                        });

                }
                catch (err) {
                    alert('Error connecting to APIs!');
                    console.log(err);
                    return;
                }
            })();
        }
    }, [req]);

    return (
        // Dev Button
        <button onClick={() => setReq({
            ...req,
            from: {
                lat: 60.45169,
                lon: 22.26686
            },
            to: {
                lat: 61.49774,
                lon: 23.76129
            }
        })}>
            devFetch
        </button>
    );
}

export default RouteFetch;