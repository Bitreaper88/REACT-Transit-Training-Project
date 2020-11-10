import React from 'react';
import { IItinerary } from './itenaryData';
import { ICarRouteAPI } from './CarRouteAPI/CarRouteAPI.d';

interface IResponseContext {
    publicRoute: IItinerary[] | undefined;
    setPublicRoute: (newResponse: IItinerary[]) => void;
    carRoute: ICarRouteAPI | undefined;
    setCarRoute: (newResponse: ICarRouteAPI) => void;
    cTest: string;
    setCTest: (newText: string) => void;
}

export const ResponseContext = React.createContext<IResponseContext>(
    {
        publicRoute: undefined,
        carRoute: undefined,
        setPublicRoute: (newResponse: IItinerary[]) => {
            console.log(`Someone didn't set up the context properly!\n${newResponse}`);
        },
        setCarRoute: (newResponse: ICarRouteAPI) => {
            console.log(`Someone didn't set up the context properly!\n${newResponse}`);
        },
        cTest: 'foo',
        setCTest: (newText: string) => { console.log(`You fucked up.\n${newText}`); }
    }
);