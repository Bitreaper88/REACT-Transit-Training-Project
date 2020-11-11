import React, { useEffect, useRef, useState } from 'react';
import { useMapEvent } from 'react-leaflet';
import L from 'leaflet';

interface ITestProps {
    cursor?: () => void;
    setGoogleLines?: React.Dispatch<React.SetStateAction<string[]>>;
    googleLines?: string[];
}

function Test(props: ITestProps): JSX.Element {
    const [zoomLevel, setZoomLevel] = useState(13);
    const [coords, setCoords] = useState([0, 0]);

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (divRef.current) L.DomEvent.disableClickPropagation(divRef.current);
    }, []);

    // conflict with map.setBounds();
    // setTimeout() = hack solution but works for now
    const map = useMapEvent('zoomend', () => {
        (async () => {
            setTimeout(() => {
                setZoomLevel(map.getZoom());
            }, 100);
        })();
    });

    useMapEvent('dblclick', (event) => {
        setCoords([event.latlng.lat, event.latlng.lng]);
    });

    function toggleCursor() {
        if (props.cursor) props.cursor();
    }

    function addLines() {
        const lines = ([
            'svfnJ_jdwCtAxFVx@zBbGx@vBbCbFxB|DnDfEb@r@P^^n@BBhApCj@`Bv@fDn@hE\\hDRbDTnLDtGJbGXtZA~EI`DMxCY`Gs@|MUrFEpE@jDFrDLbDLrBVnCb@lDr@hExC|Nt@lEr@jFp@~Fv@vHjBvPrBlRfA~JXlCZ`DZtC`@vD\\`EPzCJhCDjC?rCArCKfEOlDWbD]nC[|Bi@zCq@|CcAhDo@lBwCnH}@dCm@tBs@lCo@rCg@lCc@tCm@dFmChWUbCuCxYQ~A_Dd\\E^gHzr@sAdMm@vDo@zC}@dDu@rBy@pBq@lAkAfBgArAsAjAuA~@eAd@aATcAPsAJ{@AgAKmASmAe@mAq@sAaAgEmD_Aw@qAiAqAcAmDsCiDoCkB}AeAw@gAo@cAa@oA[y@G_A@}@H{@Rw@Tw@b@u@h@u@r@o@v@m@z@}@fB{@pBi@~Ae@~A_@fBc@fCYjCUnCMpCK`DIrDEdDEhDEjEApEHrDRlDXhCZnB\\jBd@hBf@`Bj@bBn@nAt@rA|@jAl@n@|@r@bAt@rFvC|F|CjAl@vAz@l@\\l@`@t@n@p@n@x@dA~@xA|@fBl@`Bl@jBl@fCp@`Df@pDt@pJXrCBVLlCf@tHTxEFnDDdD@rDAdFCnZCrNErQ?bDAhFEtOAhE?|B?|J?lGBlDLhDPdDTdCX|Bd@`Dh@hCj@bCz@vChB`GfMta@l@nBdBzFnF`QlBdFrBjE`CrDxSrZ~@tAv@tA~@jBv@hBp@rBl@vBh@vB`@zBb@nC|AtLvBvPj@pEHfA"',
            'q}dnJy|~uCBAG_@SaBAIIFe@b@MJ@D?Dy@t@BZTdB@H@H@H@H?B@D@L@D?BRM',
            'e`enJow~uCNTJj@b@nA@LHf@VQP_A`@SNfALfAdAxHDdAPfAJbANfADf@d@hDHn@L|@Z`Cv@nGtA|JlAnGn@~CPf@oAzAa@^qBjAy@Ri@Dm@?k@OqAk@}A@]JKFaBnAq@h@_@j@c@d@u@~@e@r@cDtFs@zAs@~@~@fFT`BLfALrBJfCLzCn@zTPnKAzNAjAE~HI|DOtGU~Im@AYPo@^iB`@cANk@Dy@Rm@VcAl@s@p@g@l@i@z@_A~A{@~BMb@]pAwAjFOf@_ApBe@v@wCrCu@bAk@bAo@vAc@tAs@tCg@tBsAbF]vCOtAi@nFKt@Kz@Kr@a@dAi@x@uAx@cA^a@D{BBw@?uADE?H|BFjBEjB',
        ]);

        if (props.setGoogleLines && props.googleLines && props.googleLines.length === 0) props.setGoogleLines(lines);
    }

    return (
        <div ref={divRef}
            style={{
                position: 'absolute',
                zIndex: 1000,
                cursor: 'auto',

                bottom: '0px',
                backgroundColor: 'white',
                fontSize: 'xx-large',
                paddingLeft: '10px',
                paddingRight: '10px',
            }}>
            ZoomLevel:&nbsp;{zoomLevel}
            &nbsp;{`| Coords: ${coords[0].toFixed(5)},${coords[1].toFixed(5)}`}
            {props.cursor && <span>
                &nbsp;|&nbsp;<button onClick={toggleCursor}>Toggle Cursor</button>
            </span>}
            &nbsp;|&nbsp;<button onClick={addLines}>Add Lines</button>
        </div>
    );
}

export default Test;