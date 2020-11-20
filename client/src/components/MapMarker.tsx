import React, { useEffect, useState } from 'react';
import { Marker, MarkerProps } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import testMarker from '../../node_modules/material-design-icons/maps/svg/production/ic_place_48px.svg';

interface IMapMarkerProps extends MarkerProps {
    color: string;
}

function MapMarker(props: IMapMarkerProps): JSX.Element | null {
    const [markerProps, setMarkerProps] = useState<MarkerProps>();

    // const marker = useMemo(() => {
    //     // const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48">
    //     // <path fill="${props.color}" d="M24 4c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
    //     // </svg>`;
    //     // // <path d="M24 4c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>

    // }, [props.color]);

    useEffect(() => {
        (async () => {
            const { color, ...mProps } = props;

            const svgString = await axios.get(testMarker).then((res) => {
                const svgString = res.data as string;
                const coloredSvgString = svgString.replace(/(?<=path)\s/, ` fill="${color}" `);
                return encodeURI('data:image/svg+xml,' + coloredSvgString).replace('#', '%23');
            }).catch((err) => { console.log(err); });
            if (!svgString) return;


            const icon = L.icon({
                iconUrl: svgString,
                iconSize: L.point(36, 36),
                iconAnchor: L.point(18, 36),
                popupAnchor: L.point(0, 24),    // Not accurate
                tooltipAnchor: L.point(0, 24),   // Not accurate
            });

            mProps.icon = icon;

            setMarkerProps(mProps);
        })();
    }, [props]);

    function theReturn(): JSX.Element | null {
        if (markerProps && markerProps.position) {
            return <Marker {...markerProps} />;
        }
        else return null;
    }

    return theReturn();
}

export default MapMarker;