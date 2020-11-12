import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { graphQLRequest } from './RouteFetch.publicAPI';
import * as Constants from '../constants';
import * as Types from './RouteFetch.types';
import { ResponseContext } from './ResponseContext';
import moment from 'moment';

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
    const { setPublicRoute } = useContext(ResponseContext);

    useEffect(() => {
        if (!req.from || !req.to) {
            return;
        }

        if (!req.waypoints || !req.waypoints.length) {

            // calling graphQLAPI
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
                if (response.data.data.plan.itineraries.length === 0){
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
        }
    }, [req]);

    useEffect(() => {
        setPublicRoute([...publicRespArray]);
    }, [publicRespArray]);

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