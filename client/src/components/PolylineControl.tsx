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
    car: {
        lowres: string;
        hires: string[][];
    };
}

interface IPolylines {
    pub: JSX.Element[],
    lowcar: JSX.Element,
    hicar: JSX.Element[]
}

interface IPLCProps {
    zoomBounds: (bounds: L.LatLngBounds) => void;
}

function PolylineControl(props: IPLCProps): JSX.Element {
    const { parsed } = useContext(ResponseContext);
    const [legs, setLegs] = useState<IGoogleLines>();
    const [polylines, setPolylines] = useState<IPolylines>();

    useEffect(() => {
        if (!parsed || !parsed.pubDf || !parsed.carDf) return;

        const pubGoogleLines = parsed.pubDf.legs.map(leg => {
            return leg.legGeometry.points;
        });

        const pubModes = parsed.pubDf.legs.map(leg => {
            return leg.mode;
        });

        const carLowResLine = parsed.carDf.geometry;
        const carHiResLine = parsed.carDf.legs.map((leg) => {
            return leg.steps.map((step) => (step.geometry));
        });

        setLegs({
            pub: {
                lines: pubGoogleLines,
                mode: pubModes
            },
            car: {
                lowres: carLowResLine,
                hires: carHiResLine
            }
        });
    }, [parsed]);

    // Decode and generate polyline elements
    useEffect(() => {
        if (legs) {
            console.log('foo');
            const decodedPubLines = legs.pub.lines.map((line) => {
                return PL.decode(line) as L.LatLngTuple[];
            });
            const decodedLowResCarLine = PL.decode(legs.car.lowres) as L.LatLngTuple[];
            const decodedHiResCarLine = legs.car.hires.map(step => {
                return step.map(line => {
                    return PL.decode(line) as L.LatLngTuple[];
                });
            });

            const newLowResCarLine = <Polyline key={'carLine'} color={ModeColor['CAR']} positions={decodedLowResCarLine} />;
            const newHiResCarLine = decodedHiResCarLine.map(((line, ind) => {
                return <Polyline key={ind} color={ModeColor['CAR']} positions={line} />;
            }));

            const newPubLines = decodedPubLines.map((line, ind) => {
                return (
                    <Polyline
                        key={legs.pub.mode[ind] + ind}
                        color={ModeColor[legs.pub.mode[ind]]}
                        dashArray={legs.pub.mode[ind] === 'WALK' ? '4' : ''}
                        positions={line} />
                );
            });

            setPolylines({
                pub: newPubLines,
                lowcar: newLowResCarLine,
                hicar: newHiResCarLine
            });

            const polylineBounds = L.polyline([decodedLowResCarLine, ...decodedPubLines]).getBounds();
            props.zoomBounds(polylineBounds);
        }
    }, [legs]);

    return (
        <div>
            {console.log('bar')}
            {polylines?.pub}
            {polylines?.hicar}
        </div>
    );
}

export default PolylineControl;