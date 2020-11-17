import React, { useEffect, useState } from 'react';
import { IItinerary, IRawResponse } from './RouteFetch.types';
import { ResponseContext } from './ResponseContext';

interface IProviderProps {
    children?: React.ReactNode;
}

export interface IParsedResponse {
    /** Default itinerary for public transit route (same as: raw.public[0].plan.itineraries[0]) */
    pubDf?: IItinerary;
}

function RepsonseProvider(props: IProviderProps): JSX.Element {
    const [raw, setRaw] = useState<IRawResponse>();
    const [parsed, setParsed] = useState<IParsedResponse>();

    useEffect(() => {
        if (!raw) return;
        
        // If multiple components need the same calculated values from the raw response it can be done here too
        // Just remember to update IParsedResponse too
        const defaultPublicItinerary = raw.public[0].plan.itineraries[0];

        setParsed({
            pubDf: defaultPublicItinerary
        });
    }, [raw]);

    return (
        <ResponseContext.Provider value={{ raw, setRaw, parsed }}>
            {props.children}
        </ResponseContext.Provider>
    );
}

export default RepsonseProvider;