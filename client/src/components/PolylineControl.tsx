import React, { useContext, useEffect, useState } from 'react';
import { Polyline } from 'react-leaflet';
import L from 'leaflet';
import { ResponseContext } from './ResponseContext';
import { Mode } from './TransportModes';

// eslint-disable-next-line
const PL = require('google-polyline');

enum ILineColors {
    'AIRPLANE' = 'fuchsia',
    'BICYCLE' = 'green',
    'BUS' = 'blue',
    'CABLE_CAR' = 'black',
    'CAR' = 'grey',
    'FERRY' = 'lightblue',
    'FUNICULAR' = 'teal',
    'GONDOLA' = 'brown',
    'RAIL' = 'yellow',
    'SUBWAY' = 'white',
    'TRAM' = 'lightbrown',
    'WALK' = 'blueviolet'
}

interface IGoogleLines {
    pub: string[];
    car: string;
}

interface IPLCProps {
    zoomBounds: (bounds: L.LatLngBounds) => void;
}

function PolylineControl(props: IPLCProps): JSX.Element {
    const { parsed } = useContext(ResponseContext);
    const [googleLines, setGoogleLines] = useState<IGoogleLines>();
    const [polylines, setPolylines] = useState<JSX.Element[]>([]);
    const [pubModes, setPubModes] = useState<Mode[]>([]);

    useEffect(() => {
        if (!parsed || !parsed.pubDf || !parsed.carDf) return;

        const pubGoogleLines = parsed.pubDf.legs.map(leg => {
            return leg.legGeometry.points;
        });

        const newPubModes = parsed.pubDf.legs.map(leg => {
            return leg.mode;
        });

        const carGoogleLine = parsed.carDf.geometry;

        setPubModes(newPubModes);
        setGoogleLines({
            pub: pubGoogleLines,
            car: carGoogleLine
        });
    }, [parsed]);

    // Decode and generate polyline elements
    useEffect(() => {
        if (googleLines) {
            const decodedPubLines = googleLines.pub.map((line) => {
                return PL.decode(line) as L.LatLngTuple[];
            });
            const decodedCarLine = PL.decode(googleLines.car) as L.LatLngTuple[];

            const newCarLine = <Polyline key={'carLine'} color={'red'} positions={decodedCarLine} />;

            const time = Date.now();
            const newPubLines = decodedPubLines.map((line, ind) => {
                return (
                    <Polyline
                        key={time.toString() + ind}
                        color={ILineColors[pubModes[ind]]}
                        dashArray={pubModes[ind] === 'WALK' ? '4' : ''}
                        positions={line} />
                );
            });

            setPolylines([...newPubLines, newCarLine]);

            const polylineBounds = L.polyline(decodedCarLine).getBounds();
            props.zoomBounds(polylineBounds);
        }
    }, [googleLines]);

    return (
        <div>
            {polylines}
        </div>
    );
}

export default PolylineControl;