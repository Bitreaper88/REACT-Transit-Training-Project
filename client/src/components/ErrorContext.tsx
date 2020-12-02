import React, { createContext, useState } from 'react';

export interface IErrorContext {
    msg: string | undefined;
    showError: (m: string | undefined) => void;
}

/** Context for error messages */
export const ErrorContext = createContext<IErrorContext>(
    {
        msg: undefined,
        showError: (m) => console.log(m)
    }
);

export interface IErrorProvider {
    children?: React.ReactNode;
}

/** Provider for error message context */
function ErrorProvider(props: IErrorProvider): JSX.Element {
    const [msg, setMsg] = useState<string>();

    return (
        <ErrorContext.Provider value={{ msg, showError: setMsg }}>
            {props.children}
        </ErrorContext.Provider>
    );
}

export default ErrorProvider;