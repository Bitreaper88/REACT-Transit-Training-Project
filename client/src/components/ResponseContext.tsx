import React from 'react';
import { IData } from './RouteFetch.types';
import { ICarRouteAPI } from './RouteFetch.types';

interface IResponseContext {
    publicRoute: IData[] | undefined;
    setPublicRoute: (newResponse: IData[]) => void;
    carRoute: ICarRouteAPI[] | undefined;
    setCarRoute: (newResponse: ICarRouteAPI[]) => void;
}

export const ResponseContext = React.createContext<IResponseContext>(
    {
        publicRoute: undefined,
        carRoute: undefined,
        setPublicRoute: (newResponse: IData[]) => {
            console.log(`Someone didn't set up the context properly!\n${newResponse}`);
        },
        setCarRoute: (newResponse: ICarRouteAPI[]) => {
            console.log(`Someone didn't set up the context properly!\n${newResponse}`);
        }
    }
);