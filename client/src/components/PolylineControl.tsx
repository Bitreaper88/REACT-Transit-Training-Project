import React, { useContext, useEffect, useState } from 'react';
import { Polyline } from 'react-leaflet';
import L from 'leaflet';
import { ResponseContext } from './ResponseContext';
import { TransitMode, ModeColor } from './TransitTypes';

// eslint-disable-next-line
const PL = require('google-polyline');

interface IGoogleLines {
    pub: {
        lines: string[];
        mode: TransitMode[];
    }
    car: string;
}

interface IPLCProps {
    zoomBounds: (bounds: L.LatLngBounds) => void;
}

function PolylineControl(props: IPLCProps): JSX.Element {
    const { parsed } = useContext(ResponseContext);
    const [legs, setLegs] = useState<IGoogleLines>();
    const [polylines, setPolylines] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if (!parsed || !parsed.pubDf || !parsed.carDf) return;

        const pubGoogleLines = parsed.pubDf.legs.map(leg => {
            return leg.legGeometry.points;
        });

        const pubModes = parsed.pubDf.legs.map(leg => {
            return leg.mode;
        });

        const carGoogleLine = parsed.carDf.geometry;

        setLegs({
            pub: {
                lines: pubGoogleLines,
                mode: pubModes
            },
            car: carGoogleLine
        });
    }, [parsed]);

    // Decode and generate polyline elements
    useEffect(() => {
        if (legs) {
            const decodedPubLines = legs.pub.lines.map((line) => {
                return PL.decode(line) as L.LatLngTuple[];
            });
            const decodedCarLine = PL.decode(legs.car) as L.LatLngTuple[];

            const newCarLine = <Polyline key={'carLine'} color={ModeColor['CAR']} positions={decodedCarLine} />;

            const newPubLines = decodedPubLines.map((line, ind) => {
                return (
                    <Polyline
                        key={legs.pub.mode[ind] + ind}
                        color={ModeColor[legs.pub.mode[ind]]}
                        dashArray={legs.pub.mode[ind] === 'WALK' ? '4' : ''}
                        positions={line} />
                );
            });

            setPolylines([...newPubLines, newCarLine]);

            const polylineBounds = L.polyline(decodedCarLine).getBounds();
            props.zoomBounds(polylineBounds);
        }
    }, [legs]);

    return (
        <div>
            {polylines}
        </div>
    );
}

export default PolylineControl;