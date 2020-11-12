import React, { useState } from 'react';
import { ICarRouteAPI } from './RouteFetch.types';
import { IData } from './RouteFetch.types';
import { ResponseContext } from './ResponseContext';

interface IProviderProps {
    children?: React.ReactNode;
}

function RepsonseProvider(props: IProviderProps): JSX.Element {
    const [publicRoute, setPublicRoute] = useState<IData[]>();
    const [carRoute, setCarRoute] = useState<ICarRouteAPI[]>();

    return (
        <ResponseContext.Provider value={{ publicRoute, setPublicRoute, carRoute, setCarRoute }}>
            {props.children}
        </ResponseContext.Provider>
    );
}

export default RepsonseProvider;