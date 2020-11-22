import React, { useEffect, useState } from 'react';
import { Marker, MarkerProps } from 'react-leaflet';
import L from 'leaflet';

interface IMapMarkerProps extends MarkerProps {
    color: string;
}

function MapMarker(props: IMapMarkerProps): JSX.Element | null {
    const [markerProps, setMarkerProps] = useState<MarkerProps>();

    useEffect(() => {
        (async () => {
            const { color, ...mProps } = props;

            const colorString = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
            <path fill="${color}" d="M24 4c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
            </svg>`;
            const svgString = encodeURI('data:image/svg+xml,' + colorString).replace('#', '%23');

            const icon = L.icon({
                iconUrl: svgString,
                iconSize: L.point(37, 37),
                iconAnchor: L.point(19, 35),
                popupAnchor: L.point(0, -21),
                tooltipAnchor: L.point(0, -21)
            });

            mProps.icon = icon;

            setMarkerProps(mProps);
        })();
    }, [props]);

    function theReturn(): JSX.Element | null {
        if (markerProps && markerProps.position) {
            return <Marker {...markerProps} >{props.children}</Marker>;
        }
        else return null;
    }

    return theReturn();
}

export default MapMarker;