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
    const [publicRespArray, setPublicRespArray] = useState<Types.IData[]>([]);
    const [carRespArray, setCarRespArray] = useState<Types.ICarRouteAPI[]>([]);
    const { setPublicRoute, setCarRoute } = useContext(ResponseContext);

    useEffect(() => {
        if (!req.from || !req.to) return;

        if (!req.waypoints || !req.waypoints.length) {
            (async () => {

                // calling public transit API
                axios(Constants.URL_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        query: graphQLRequest,
                        variables: req
                    })
                }).then((response) => {
                    if (response.status !== 200) {
                        alert('Error fetching public transit route!');
                        return;
                    }
                    if (response.data.data.plan.itineraries.length === 0) {
                        alert('Could not find a public route from or to your destination.');
                        return;
                    }

                    const result: Types.IData = response.data.data;
                    setPublicRespArray([result]);
                }).catch((err) => {
                    alert('Error connecting to public transit API!');
                    console.log(err);
                    return;
                });

                // calling car route API
                const carFrom = `${req.from?.lon},${req.from?.lat}`;
                const carTo = `${req.to?.lon},${req.to?.lat}`;
                const carResp = await carAPIcall(`/driving/${carFrom};${carTo}?alternatives=true&geometries=polyline&steps=true&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`);
                const carRespData = carResp.data as Types.ICarRouteAPI;
                
                if (!carRespData.routes.length) {
                    alert('Could not find a car route from or to your destination.');
                    return;
                }

                setCarRespArray([carRespData]);
            })();
        }
    }, [req]);

    useEffect(() => {
        setPublicRoute([...publicRespArray]);
    }, [publicRespArray]);

    useEffect(() => {
        setCarRoute([...carRespArray]);
    }, [carRespArray]);

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