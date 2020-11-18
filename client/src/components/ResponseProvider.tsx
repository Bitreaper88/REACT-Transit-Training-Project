import React, { useEffect, useState } from 'react';
import { IItinerary, IRawResponse, ICarRouteAPI } from './RouteFetch.types';
import { ResponseContext } from './ResponseContext';

interface IProviderProps {
    children?: React.ReactNode;
}

export interface IParsedResponse {
    /** Default itinerary for public transit route (same as: raw.public[0].plan.itineraries[0]) */
    pubDf?: IItinerary;
    /** Default route for car (same as: raw.car[0]) */
    carDf?: ICarRouteAPI; 
}

function RepsonseProvider(props: IProviderProps): JSX.Element {
    const [raw, setRaw] = useState<IRawResponse>();
    const [parsed, setParsed] = useState<IParsedResponse>();

    useEffect(() => {
        if (!raw) return;
        
        // If multiple components need the same calculated values from the raw response it can be done here too
        // Just remember to update IParsedResponse too
        const defaultPublicItinerary = raw.public[0].plan.itineraries[0];
        const defaultCarRoute = raw.car[0];

        setParsed({
            pubDf: defaultPublicItinerary,
            carDf: defaultCarRoute
        });
    }, [raw]);

    return (
        <ResponseContext.Provider value={{ raw, setRaw, parsed }}>
            {props.children}
        </ResponseContext.Provider>
    );
}

export default RepsonseProvider;