import React, { useRef, useState } from 'react';
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

    const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false);

    const mapRef = useRef<L.Map>();

    /** Update marker position while being dragged from UI */
    function onMove(this: HTMLDivElement, event: MouseEvent) {
        this.style.top = (event.clientY - 18).toString() + 'px';
        this.style.left = (event.clientX - 18).toString() + 'px';
    }

    /** When marker is no longer being dragged */
    function onStop(this: HTMLDivElement, e: MouseEvent) {

        console.log(document.querySelectorAll(':hover'));

        const isOnMap = document.querySelectorAll(':hover .theMap').length;
        // const elementAtDropPoint = document.elementFromPoint(e.clientX, e.clientY);
        const containerPoint = L.point(e.clientX, e.clientY);

        // Send position upstream
        if (mapRef.current && isOnMap) {
            props.setPosition(mapRef.current.containerPointToLatLng(containerPoint));
        }

        // Clean up afterwards
        this.removeEventListener('mousemove', onMove);
        this.removeEventListener('mouseout', onMove);
        this.removeEventListener('mouseup', onStop);
        setIsBeingDragged(false);
    }

    /** When dragging begins */
    function onStart(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.preventDefault();
        setIsBeingDragged(true);

        // Put marker on top & set style while being dragged
        e.currentTarget.style.position = 'fixed';
        e.currentTarget.style.zIndex = '9999';

        e.currentTarget.classList.add('md-36');

        // Move marker to mouse position
        e.currentTarget.style.top = (e.clientY - 18).toString() + 'px';
        e.currentTarget.style.left = (e.clientX - 18).toString() + 'px';

        // Set up mouse listeners
        e.currentTarget.addEventListener('mousemove', onMove);
        e.currentTarget.addEventListener('mouseout', onMove);
        e.currentTarget.addEventListener('mouseup', onStop);
    }

    // function onDrop(e: React.DragEvent<HTMLDivElement>, map: L.Map) {
    //     e.preventDefault();

    //     const containerPoint = L.point(e.clientX, e.clientY);
    //     const elementAtDropPoint = document.elementFromPoint(e.clientX, e.clientY);

    //     // Center map if marker is dropeed outside current view
    //     if (elementAtDropPoint && elementAtDropPoint.className.includes('theMap')) {
    //         props.setPosition(map.containerPointToLatLng(containerPoint));
    //     }
    // }

    return (
        <span>
            {props.position &&
                <MapMarkerDraggable
                    position={props.position}
                    setPos={props.setPosition}
                    color={props.color} />}

            {!props.position &&
                <MapConsumer>
                    {map => {
                        mapRef.current = map;

                        return (
                            <div key={props.id} className='material-icons select-none'
                                onMouseDownCapture={(e) => onStart(e)}
                                // onMouseUpCapture={() => console.log('foo')}
                                // onMouseOutCapture={() => console.log('foo')}
                                style={{ color: props.color, cursor: 'pointer' }}>
                                place
                            </div>
                        );
                    }}
                </MapConsumer>}
            {(isBeingDragged || props.position) && <div className='material-icons select-none'>
                place
            </div>}
        </span>
    );
}

export default MapMarkerFull;