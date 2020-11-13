import React, { useEffect, useState } from 'react';
import { IRawResponse } from './RouteFetch.types';
import { ResponseContext } from './ResponseContext';

interface IProviderProps {
    children?: React.ReactNode;
}

export interface IParsedResponse {
    shutUpLint?: boolean;
}

function RepsonseProvider(props: IProviderProps): JSX.Element {
    const [raw, setRaw] = useState<IRawResponse>();
    const [parsed, setParsed] = useState<IParsedResponse>();

    // If multiple components need the same calculated values from the raw response it can be done here too
    // Just remember to update IParsedResponse too
    useEffect(() => {
        setParsed({

        });
    }, [raw]);

    return (
        <ResponseContext.Provider value={{ raw, setRaw, parsed }}>
            {props.children}
        </ResponseContext.Provider>
    );
}

export default RepsonseProvider;