import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Test from '../devtools/Test';
import ZoomToNewLayer from './MapLeaflet.ZoomToNewLayer';

// eslint-disable-next-line
const PL = require('google-polyline');

interface IMapProps {
    children?: JSX.Element | JSX.Element[];
}

function MapLeaflet(props: IMapProps): JSX.Element {
    const [mapStyle, setMapStyle] = useState<React.CSSProperties>({
        height: '100%',
        width: '100%',
        padding: '0px',
        position: 'fixed',
        bottom: '0',
        right: '0',
        cursor: 'grab'
    });
    // eslint-disable-next-line
    const [googleLines, setGoogleLines] = useState<string[]>([]);
    const [polylines, setPolylines] = useState<JSX.Element[]>([]);
    const [currentBounds, setCurrentBounds] = useState<L.LatLngBounds>();

    // Decode and generate polyline elements
    useEffect(() => {
        if (googleLines && googleLines.length && typeof googleLines[0] === 'string') {
            const decodedLines = googleLines.map((line) => {
                return PL.decode(line) as L.LatLngTuple[];
            });

            const newPolyline = <Polyline key={decodedLines.length + 10000} positions={decodedLines} />;

            // little sketch, L.latLngBounds()?
            const polylineBounds = L.polyline(decodedLines).getBounds();

            setCurrentBounds(polylineBounds);
            setPolylines([...polylines, newPolyline]);
        }
    }, [googleLines]);

    // Currently used only for testing
    // eslint-disable-next-line
    function changeCursor() {
        if (mapStyle.cursor === 'grab') {
            setMapStyle({ ...mapStyle, cursor: 'crosshair' });
        }
        else setMapStyle({ ...mapStyle, cursor: 'grab' });
    }

    return (
        <MapContainer
            style={mapStyle}
            center={{ lat: 60.44994, lng: 22.26637 }}
            zoom={13}
            doubleClickZoom={false}
            zoomControl={false}>

            <TileLayer
                url='https://cdn.digitransit.fi/map/v1/hsl-map/{z}/{x}/{y}.png'
                attribution='???'
                maxZoom={18} minZoom={8}
                tileSize={512}
                zoomOffset={-1}
            />

            {/* Free for non-commercial use: https://carto.com/basemaps/ */}
            <TileLayer
                url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,
                            &nbsp;&copy; <a href="https://carto.com/attribution">CARTO</a>'
                maxZoom={7} minZoom={5}
            />

            {/* Map elements generated from response data */}
            {polylines}

            {/* Custom components */}
            {props.children}

            {/* Controllers */}
            <ZoomControl position='bottomright' />
            <ZoomToNewLayer bounds={currentBounds} />

            {/* Devtools */}
            <Test cursor={changeCursor} setGoogleLines={setGoogleLines} googleLines={googleLines} />
        </MapContainer>
    );
}

export default MapLeaflet;