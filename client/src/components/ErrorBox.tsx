import React from 'react';

interface IError {
    msg: string | undefined;
    clear: (m: string | undefined) => void;
}

function ErrorBox(props: IError): JSX.Element | null {

    return (
        props.msg ?
            <div className='fixed top-0 left-0 w-64 p-2 bg-yellow-400 text-base text-center align-middle pointer-events-auto'
                style={{ zIndex: 9999 }}>
                <div>{props.msg}</div>
                <button className='text-sm hover:underline text-red-700 p-3'
                    onClick={() => props.clear(undefined)}>
                    close message
                </button>
            </div> : null
    );
}

export default ErrorBox;