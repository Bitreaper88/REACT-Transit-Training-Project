import React, { useEffect, useState } from 'react';
import { IItinerary, IRawResponse, IRoutes } from './RouteFetch.types';
import { ResponseContext } from './ResponseContext';

interface IProviderProps {
    children?: React.ReactNode;
}

export interface IParsedResponse {
    /** Array of all the public transit itineraries (1-3 itineraries) */
    pubItins: IItinerary[];
    /** Default route for car (same as: raw.car[0].routes[0]) */
    carRoute: IRoutes;
}

export interface ICurrent {
    /** Currently selected itinerary for public transit route (same as raw.public[0].plan.itineraries[currentPubItin]) */
    pubDf: IItinerary;
    /** Default route for car (same as: raw.car[0].routes[0]) */
    carDf: IRoutes;
}

function RepsonseProvider(props: IProviderProps): JSX.Element {
    const [raw, setRaw] = useState<IRawResponse>();
    const [parsed, setParsed] = useState<IParsedResponse>();
    const [current, setCurrent] = useState<ICurrent>();
    const [currentPubItin, setCurrentPubItin] = useState<number>(0);

    useEffect(() => {
        if (!raw) return;

        // Parsed should only contain values that are calculated once per API response!
        const pubItineraries = raw.public[0].plan.itineraries;
        const defaultCarRoute = raw.car[0].routes[0];

        setParsed({
            pubItins: pubItineraries,
            carRoute: defaultCarRoute,
        });
        setCurrentPubItin(0);
    }, [raw]);

    useEffect(() => {
        if (!parsed) return;

        // Currently selected routes, updates any time a new itinerary is selected.
        const currentPublicItinerary = parsed.pubItins[currentPubItin];
        const currentCarRoute = parsed.carRoute;

        setCurrent({
            pubDf: currentPublicItinerary,
            carDf: currentCarRoute
        });
    }, [currentPubItin, parsed]);

    return (
        <ResponseContext.Provider value={{ raw, setRaw, parsed, currentPubItin, setCurrentPubItin, current }}>
            {props.children}
        </ResponseContext.Provider>
    );
}

export default RepsonseProvider;