import React, { createContext, useState } from 'react';

export interface IErrorContext {
    msg: string | undefined;
    showError: (m: string | undefined) => void;
}

export const ErrorContext = createContext<IErrorContext>(
    {
        msg: undefined,
        showError: (m) => console.log(m)
    }
);

export interface IErrorProvider {
    children?: React.ReactNode;
}

function ErrorProvider(props: IErrorProvider): JSX.Element {
    const [msg, setMsg] = useState<string>();

    return (
        <ErrorContext.Provider value={{ msg, showError: setMsg }}>
            {props.children}
        </ErrorContext.Provider>
    );
}

export default ErrorProvider;