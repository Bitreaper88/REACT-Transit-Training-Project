import React from 'react';
import { IRawResponse } from './RouteFetch.types';
import { ICurrent, IParsedResponse } from './ResponseProvider';

interface IResponseContext {
    /** Raw response data, should only be used internally in the context to calculate parsed values */
    raw?: IRawResponse;
    /** To set API response into the context */
    setRaw: (newResponse: IRawResponse) => void;
    /** Parsed values that are calculated only once whenever new raw data is received */
    parsed?: IParsedResponse;
    /** Currently selected itineraries, recalculated every time a new itinerary is selected */
    current?: ICurrent;
    /** Currently selected public itinerary (array index of parsed.pubItins) */
    currentPubItin: number;
    /** Change currently selected itinerary (MUST be a valid array index of parsed.pubItins) */
    setCurrentPubItin: (i: number) => void;
}

export const ResponseContext = React.createContext<IResponseContext>(
    {
        parsed: undefined,
        raw: undefined,
        setRaw: (newResponse: IRawResponse) => {
            console.log(`Someone didn't set up the context properly!\n${newResponse}`);
        },
        currentPubItin: 0,
        setCurrentPubItin: (i: number) => {
            console.log(`Someone didn't set up the context properly!\n${i}`);
        }
    }
);