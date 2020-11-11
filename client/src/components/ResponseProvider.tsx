import React, { useState } from 'react';
import { ICarRouteAPI } from './CarRouteAPI/CarRouteAPI.d';
import { IItinerary } from './itenaryData';
import { ResponseContext } from './ResponseContext';

interface IProviderProps {
    children?: React.ReactNode;
}

function RepsonseProvider(props: IProviderProps): JSX.Element {
    const [publicRoute, setPublicRoute] = useState<IItinerary[]>();
    const [carRoute, setCarRoute] = useState<ICarRouteAPI>();

    return (
        <ResponseContext.Provider value={{ publicRoute, setPublicRoute, carRoute, setCarRoute }}>
            {props.children}
        </ResponseContext.Provider>
    );
}

export default RepsonseProvider;