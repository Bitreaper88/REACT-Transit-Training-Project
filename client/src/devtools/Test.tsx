import React, { useEffect, useRef, useState } from 'react';
import { useMapEvent } from 'react-leaflet';
import L from 'leaflet';

interface ITestProps {
    cursor?: () => void;
}

function Test(props: ITestProps): JSX.Element {
    const [zoomLevel, setZoomLevel] = useState(13);
    const [coords, setCoords] = useState([0, 0]);

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (divRef.current) L.DomEvent.disableClickPropagation(divRef.current);
    }, []);

    const map = useMapEvent('zoom', () => {
        setZoomLevel(map.getZoom());
    });

    useMapEvent('dblclick', (event) => {
        setCoords([event.latlng.lat, event.latlng.lng]);
    });

    function toggleCursor() {
        if (props.cursor) props.cursor();
    }

    return (
        <div ref={divRef}
            style={{
                position: 'absolute',
                zIndex: 1000,
                cursor: 'auto',

                bottom: '0px',
                backgroundColor: 'white',
                fontSize: 'xx-large',
                paddingLeft: '10px',
                paddingRight: '10px',
            }}>
            ZoomLevel:&nbsp;{zoomLevel}
            &nbsp;{`| Coords: ${coords[0].toFixed(5)},${coords[1].toFixed(5)}`}
            {props.cursor && <span>
                &nbsp;|&nbsp;<button onClick={toggleCursor}>Toggle Cursor</button>
            </span>}
        </div>
    );
}

export default Test;