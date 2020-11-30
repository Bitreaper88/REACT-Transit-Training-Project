import React from 'react';
import L from 'leaflet';
import { MapConsumer } from 'react-leaflet';
import MapMarkerDraggable from './MapMarkerDraggable';

interface ILMProps {
    /** ID string to keep track of markers */
    id: string;
    /** Marker color */
    color?: string;
    /** LatLng position */
    position: L.LatLngExpression | undefined;
    /** For lifting position state up */
    setPosition: React.Dispatch<React.SetStateAction<L.LatLng | L.LatLngLiteral | L.LatLngTuple | undefined>>;
}

function MapMarkerFull(props: ILMProps): JSX.Element {

    function onDrop(e: React.DragEvent<HTMLDivElement>, map: L.Map) {
        e.preventDefault();

        const containerPoint = L.point(e.clientX, e.clientY);
        const elementAtDropPoint = document.elementFromPoint(e.clientX, e.clientY);

        // Center map if marker is dropeed outside current view
        if (elementAtDropPoint && elementAtDropPoint.className.includes('theMap')) {
            props.setPosition(map.containerPointToLatLng(containerPoint));
        }
    }

    return (
        <span>
            {props.position &&
                <MapMarkerDraggable
                    position={props.position}
                    setPos={props.setPosition}
                    color={props.color} />}
                    
            {!props.position ?
                <MapConsumer>
                    {map => {
                        return (
                            <div className='material-icons' draggable
                                onDragEnd={(e) => onDrop(e, map)}
                                style={{ color: props.color }}>
                                place
                            </div>
                        );
                    }}
                </MapConsumer> :
                <div className='material-icons select-none'>
                    place
                </div>}
        </span>
    );
}

export default MapMarkerFull;