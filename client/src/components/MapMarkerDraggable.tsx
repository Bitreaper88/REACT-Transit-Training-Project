import React, { useState } from 'react';
import MapMarker, { IMapMarkerProps } from './MapMarker';

enum OnTop {
    true = 1,
    false = 0
}

function MapMarkerDraggable(props: IMapMarkerProps): JSX.Element {
    // eslint-disable-next-line
    const [onTop, setOnTop] = useState<number>(OnTop.true);

    return (
        <MapMarker
            {...props}
            riseOnHover={true}
            riseOffset={10000}
            draggable={true}
            zIndexOffset={onTop}
            eventHandlers={{
                baselayerchange: () => {
                    console.log('foo');
                }
            }}>
            {props.children}
        </MapMarker>
    );
}

export default MapMarkerDraggable;