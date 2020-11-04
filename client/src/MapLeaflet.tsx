import React from 'react';
import './MapLeaflet.css';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Test from './Test';

function MapLeaflet(): JSX.Element {

    return (
        <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={{ lat: 60.47179, lng: 22.23259 }}
            zoom={13}
            doubleClickZoom={false}
            zoomControl={false}
            attributionControl={false}>

            <TileLayer
                url="https://cdn.digitransit.fi/map/v1/hsl-map-256/{z}/{x}/{y}.png"
                maxZoom={18} minZoom={8}
                tileSize={512}
                zoomOffset={-1}
            />

            <ZoomControl position='bottomright' />

            <Test />
        </MapContainer>
    );
}

export default MapLeaflet;