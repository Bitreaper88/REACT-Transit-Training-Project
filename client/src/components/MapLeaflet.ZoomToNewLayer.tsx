import React from 'react';
import { MapConsumer } from 'react-leaflet';
import L from 'leaflet';

interface IZoomBounds {
    bounds: L.LatLngBounds | undefined;
}

function ZoomToNewLayer(props: IZoomBounds): JSX.Element {

    return (
        <MapConsumer>
            {map => {
                if (props.bounds) map.fitBounds(props.bounds);
                return null;
            }}
        </MapConsumer>
    );
}

export default ZoomToNewLayer;