import React, { useEffect, useRef, useState } from 'react';
import { useMapEvent } from 'react-leaflet';
import L from 'leaflet';

function Test(): JSX.Element {
    const [zoomLevel, setZoomLevel] = useState(13);
    const [coords, setCoords] = useState('');

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (divRef.current) L.DomEvent.disableClickPropagation(divRef.current);
    }, []);

    const map = useMapEvent('zoom', () => {
        setZoomLevel(map.getZoom());
    });

    useMapEvent('dblclick', (event) => {
        setCoords(event.latlng.lat.toString() + ' ' + event.latlng.lng.toString());
    });

    return (
        <div ref={divRef}
            style={{
                position: 'absolute',
                zIndex: 1000,
                cursor: 'auto',
                backgroundColor: 'white',
                fontSize: 'xx-large',
                width: '100%'
            }}>
            {zoomLevel}&nbsp;{coords}
        </div>
    );
}

export default Test;