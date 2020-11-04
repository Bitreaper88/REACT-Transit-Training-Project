import React, { useEffect, useState } from 'react';
import { useMapEvent } from 'react-leaflet';

function Test(): JSX.Element {
    const [zoomLevel, setZoomLevel] = useState(13);
    const [coords, setCoords] = useState('');

    useEffect(() => {
        
    })

    const map = useMapEvent('zoom', () => {
        setZoomLevel(map.getZoom());
    });

    useMapEvent('dblclick', (event) => {
        setCoords(event.latlng.lat.toString() + ' ' + event.latlng.lng.toString());
    });

    return (
        <div style={{
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