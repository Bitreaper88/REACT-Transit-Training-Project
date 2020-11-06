import React, { useEffect, useState } from 'react';
import './MapLeaflet.css';
import { MapContainer, TileLayer, ZoomControl, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Test from './devtools/Test';

// eslint-disable-next-line
const PL = require('google-polyline');

interface IMapProps {
    children?: JSX.Element | JSX.Element[];
}

function MapLeaflet(props: IMapProps): JSX.Element {
    const [mapStyle, setMapStyle] = useState<React.CSSProperties>({
        height: '100%',
        width: '100%',
        cursor: 'grab'
    });
    // setGoogleLines will be needed later
    // eslint-disable-next-line
    const [googleLines, setGoogleLines] = useState<string[]>([
        'svfnJ_jdwCtAxFVx@zBbGx@vBbCbFxB|DnDfEb@r@P^^n@BBhApCj@`Bv@fDn@hE\\hDRbDTnLDtGJbGXtZA~EI`DMxCY`Gs@|MUrFEpE@jDFrDLbDLrBVnCb@lDr@hExC|Nt@lEr@jFp@~Fv@vHjBvPrBlRfA~JXlCZ`DZtC`@vD\\`EPzCJhCDjC?rCArCKfEOlDWbD]nC[|Bi@zCq@|CcAhDo@lBwCnH}@dCm@tBs@lCo@rCg@lCc@tCm@dFmChWUbCuCxYQ~A_Dd\\E^gHzr@sAdMm@vDo@zC}@dDu@rBy@pBq@lAkAfBgArAsAjAuA~@eAd@aATcAPsAJ{@AgAKmASmAe@mAq@sAaAgEmD_Aw@qAiAqAcAmDsCiDoCkB}AeAw@gAo@cAa@oA[y@G_A@}@H{@Rw@Tw@b@u@h@u@r@o@v@m@z@}@fB{@pBi@~Ae@~A_@fBc@fCYjCUnCMpCK`DIrDEdDEhDEjEApEHrDRlDXhCZnB\\jBd@hBf@`Bj@bBn@nAt@rA|@jAl@n@|@r@bAt@rFvC|F|CjAl@vAz@l@\\l@`@t@n@p@n@x@dA~@xA|@fBl@`Bl@jBl@fCp@`Df@pDt@pJXrCBVLlCf@tHTxEFnDDdD@rDAdFCnZCrNErQ?bDAhFEtOAhE?|B?|J?lGBlDLhDPdDTdCX|Bd@`Dh@hCj@bCz@vChB`GfMta@l@nBdBzFnF`QlBdFrBjE`CrDxSrZ~@tAv@tA~@jBv@hBp@rBl@vBh@vB`@zBb@nC|AtLvBvPj@pEHfA"',
        'q}dnJy|~uCBAG_@SaBAIIFe@b@MJ@D?Dy@t@BZTdB@H@H@H@H?B@D@L@D?BRM',
        'e`enJow~uCNTJj@b@nA@LHf@VQP_A`@SNfALfAdAxHDdAPfAJbANfADf@d@hDHn@L|@Z`Cv@nGtA|JlAnGn@~CPf@oAzAa@^qBjAy@Ri@Dm@?k@OqAk@}A@]JKFaBnAq@h@_@j@c@d@u@~@e@r@cDtFs@zAs@~@~@fFT`BLfALrBJfCLzCn@zTPnKAzNAjAE~HI|DOtGU~Im@AYPo@^iB`@cANk@Dy@Rm@VcAl@s@p@g@l@i@z@_A~A{@~BMb@]pAwAjFOf@_ApBe@v@wCrCu@bAk@bAo@vAc@tAs@tCg@tBsAbF]vCOtAi@nFKt@Kz@Kr@a@dAi@x@uAx@cA^a@D{BBw@?uADE?H|BFjBEjB',
    ]);
    const [polylines, setPolylines] = useState<JSX.Element[]>([]);
    const [mapBounds, setMapBounds] = useState<L.LatLngBounds>();

    // Decode and generate polyline elements
    useEffect(() => {
        if (googleLines && googleLines.length && typeof googleLines[0] === 'string') {
            const decodedLines = googleLines.map((line) => {
                return PL.decode(line) as L.LatLngTuple[];
            });

            const newPolylines = decodedLines.map((line, index) => {
                return <Polyline key={index} positions={line} />;
            });

            // little sketch, latlng.toBounds()?
            const polylineBounds = L.polyline(decodedLines).getBounds();

            setMapBounds(polylineBounds);
            setPolylines([...newPolylines]);
        }
    }, [googleLines]);

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
            center={{ lat: 60.44994, lng: 22.26637 }}
            zoom={13}
            bounds={mapBounds}
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
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,&nbsp;
                            &copy; <a href="https://carto.com/attribution">CARTO</a>'
                maxZoom={7}
            />

            <ZoomControl position='bottomright' />

            {/* Map elements generated from response data */}
            {polylines}

            {/* Custom components */}
            {props.children}

            {/* Devtools */}
            <Test cursor={changeCursor} />
        </MapContainer>
    );
}

export default MapLeaflet;