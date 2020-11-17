import React from 'react';
import { IRawResponse } from './RouteFetch.types';
import { IParsedResponse } from './ResponseProvider';

interface IResponseContext {
    raw?: IRawResponse;
    setRaw: (newResponse: IRawResponse) => void;
    parsed?: IParsedResponse;
}

export const ResponseContext = React.createContext<IResponseContext>(
    {
        parsed: undefined,
        raw: undefined,
        setRaw: (newResponse: IRawResponse) => {
            console.log(`Someone didn't set up the context properly!\n${newResponse}`);
        }
    }
);