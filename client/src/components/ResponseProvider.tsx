import React, { useEffect, useState } from 'react';
import { IItinerary, IRawResponse, IRoutes } from './RouteFetch.types';
import { ResponseContext } from './ResponseContext';

interface IProviderProps {
    children?: React.ReactNode;
}

export interface IParsedResponse {
    /** Currently selected itinerary for public transit route (default '0': raw.public[0].plan.itineraries[0]) */
    pubDf?: IItinerary;
    /** Default route for car (same as: raw.car[0].routes[0]) */
    carDf?: IRoutes;
}

function RepsonseProvider(props: IProviderProps): JSX.Element {
    const [raw, setRaw] = useState<IRawResponse>();
    const [parsed, setParsed] = useState<IParsedResponse>();
    const [itinerary, setItinerary] = useState<number>(0);

    useEffect(() => {
        if (!raw) return;

        // If multiple components need the same calculated values from the raw response it can be done here too
        // Just remember to update IParsedResponse too
        const currentPublicItinerary = raw.public[0].plan.itineraries[itinerary];
        const defaultCarRoute = raw.car[0].routes[0];

        setParsed({
            pubDf: currentPublicItinerary,
            carDf: defaultCarRoute,
        });
    }, [raw]);

    useEffect(() => {
        if (!raw) return;

        const currentPublicItinerary = raw.public[0].plan.itineraries[itinerary];

        setParsed({
            ...parsed,
            pubDf: currentPublicItinerary
        });
    }, [itinerary]);

    return (
        <ResponseContext.Provider value={{ raw, setRaw, parsed, itinerary, setItinerary }}>
            {props.children}
        </ResponseContext.Provider>
    );
}

export default RepsonseProvider;