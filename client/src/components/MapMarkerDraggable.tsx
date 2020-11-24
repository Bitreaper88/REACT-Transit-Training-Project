import React, { useState } from 'react';
import MapMarker, { IMapMarkerProps } from './MapMarker';

enum OnTop {
    true = 1,
    false = 0
}

function MapMarkerDraggable(props: IMapMarkerProps): JSX.Element {
    // eslint-disable-next-line
    const [onTop, setOnTop] = useState<number>(OnTop.true);
    const [pos, setPos] = useState<L.LatLngExpression>(props.position);

    return (
        <MapMarker
            {...props}
            position={pos}
            autoPan={true}
            draggable={true}
            zIndexOffset={1}
            eventHandlers={{
                baselayerchange: () => {
                    console.log('foo');
                },
                moveend: (event) => {
                    setPos(event.sourceTarget._latlng as L.LatLngLiteral);
                }
            }}>
            {props.children}
        </MapMarker>
    );
}

export default MapMarkerDraggable;