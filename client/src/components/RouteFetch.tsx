import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getGraphQLRequest } from './RouteFetch.publicAPI';
import * as Constants from '../constants';
import * as Types from './RouteFetch.types';
import { ResponseContext } from './ResponseContext';

export interface ICoordinates {
    lat: number;
    lng: number;
}
export interface IRouteRequest {
    startPos?: ICoordinates;
    endPos?: ICoordinates;
    waypoints?: ICoordinates[];
}

function RouteFetch(): JSX.Element {
    const [req, setReq] = useState<IRouteRequest>();
    const [publicRespArray, setPublicRespArray] = useState<Types.IData[]>([]);
    const { setPublicRoute } = useContext(ResponseContext);

    useEffect(() => {
        console.log(req);

        if (!req || !req.startPos || !req.endPos) {
            return;
        }

        if (!req.waypoints || !req.waypoints.length) {

            // Public transit API call
            const publicQuery = getGraphQLRequest();
            const variables = {
                from: {
                    lat: req.startPos.lat,
                    lon: req.startPos.lng
                },
                to: {
                    lat: req.endPos.lat,
                    lon: req.endPos.lng
                }
            };

            console.log(publicQuery);

            // calling graphQLAPI
            axios(Constants.URL_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        query: publicQuery,
                        variables: variables
                    })
                })
                // .then((response: { data: { data: Types.IData } }) => {
                .then((response) => {
                    console.log(response);
                    if (response.status !== 200) {
                        alert('Error fetching public transit route!');
                        return;
                    }

                    const result: Types.IData = response.data.data;
                    console.log('bar');
                    setPublicRespArray([result]);
                })
                .catch(() => alert('Error connecting to public transit API!'));
        }
    }, [req]);

    useEffect(() => {
        console.log(publicRespArray);
        //setPublicRoute([...publicRespArray]);
    }, [publicRespArray]);

    return (
        <button onClick={() => setReq({
            startPos: {
                lat: 60.45169,
                lng: 22.26686
            },
            endPos: {
                lat: 61.49774,
                lng: 23.76129
            }
        })}>
            devFetch
        </button>
    );
}

export default RouteFetch;