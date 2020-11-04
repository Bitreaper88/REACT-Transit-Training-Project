import React from 'react';
import './MapLeaflet.css';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
    children?: JSX.Element | JSX.Element[];
}

function MapLeaflet(props: MapProps): JSX.Element {

    return (
        <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={{ lat: 60.47179, lng: 22.23259 }}
            zoom={13} maxZoom={18} minZoom={6}
            doubleClickZoom={false}
            zoomControl={false}
            attributionControl={false}>

            <TileLayer
                url="https://cdn.digitransit.fi/map/v1/hsl-map/{z}/{x}/{y}.png"
                tileSize={512}
                zoomOffset={-1} />

            <ZoomControl position='bottomright' />

            {props.children}
        </MapContainer>
    );
}

export default MapLeaflet;