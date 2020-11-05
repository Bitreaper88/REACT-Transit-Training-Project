import React, { useState } from 'react';
import './MapLeaflet.css';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Test from './devtools/Test';

interface IMapProps {
    children?: JSX.Element | JSX.Element[];
}

function MapLeaflet(props: IMapProps): JSX.Element {
    const [mapStyle, setMapStyle] = useState<React.CSSProperties>({
        height: '100%',
        width: '100%',
        cursor: 'grab'
    });

    // Currently used only for testing
    function changeCursor() {
        if (mapStyle.cursor === 'grab') {
            setMapStyle({ ...mapStyle, cursor: 'crosshair' });
        }
        else setMapStyle({ ...mapStyle, cursor: 'grab' });
    }

    return (
        <MapContainer
            style={mapStyle}
            center={{ lat: 60.47179, lng: 22.23259 }}
            zoom={13}
            maxBounds={[[81.2, -74.3], [30.9, 121.2]]}
            doubleClickZoom={false}
            zoomControl={false}
            attributionControl={false}>

            <TileLayer
                url="https://cdn.digitransit.fi/map/v1/hsl-map/{z}/{x}/{y}.png"
                maxZoom={18} minZoom={5}
                tileSize={512}
                zoomOffset={-1}
            />

            <ZoomControl position='bottomright' />

            {/* Custom components */}
            {props.children}

            {/* Devtools */}
            <Test cursor={changeCursor} />
        </MapContainer>
    );
}

export default MapLeaflet;