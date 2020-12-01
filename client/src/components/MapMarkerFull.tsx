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

    // For asserting event types
    function isReactMouseEvent(e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>):
        e is React.MouseEvent<HTMLDivElement, MouseEvent> {
        return e.type === 'mousedown';
    }
    function isReactTouchEvent(e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>):
        e is React.TouchEvent<HTMLDivElement> {
        return e.type === 'touchstart';
    }
    function isMouseEvent(e: MouseEvent | TouchEvent):
        e is MouseEvent {
        return e.type === 'mousedown' || e.type === 'mousemove' || e.type === 'mouseout' || e.type === 'mouseup';
    }
    function isTouchEvent(e: MouseEvent | TouchEvent):
        e is TouchEvent {
        return e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel';
    }

    /** Update marker position while being dragged from UI */
    function onMouseMove(this: HTMLDivElement, e: MouseEvent) {
        this.style.top = (e.clientY - 18).toString() + 'px';
        this.style.left = (e.clientX - 18).toString() + 'px';
    }

    function onTouchMove(this: HTMLDivElement, e: TouchEvent) {
        this.style.top = (e.touches[0].clientY - 18).toString() + 'px';
        this.style.left = (e.touches[0].clientX - 18).toString() + 'px';
    }

    /** When marker is no longer being dragged */
    function onStop(this: HTMLDivElement, e: MouseEvent | TouchEvent) {

        let elementUnderMarker;
        let containerPoint;

        if (isMouseEvent(e)) {
            this.style.pointerEvents = 'none';
            elementUnderMarker = document.elementFromPoint(e.clientX, e.clientY);
            this.style.pointerEvents = 'auto';

            containerPoint = L.point(e.clientX, e.clientY + 16);
        }
        else if (isTouchEvent(e)) {
            this.style.pointerEvents = 'none';
            elementUnderMarker = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            this.style.pointerEvents = 'auto';

            containerPoint = L.point(e.changedTouches[0].clientX, e.changedTouches[0].clientY + 16);
        }
        else console.log('ERROR!');

        // Send position upstream if droppd on theMap
        if (mapRef.current && containerPoint && elementUnderMarker && elementUnderMarker.classList.contains('theMap')) {
            props.setPosition(mapRef.current.containerPointToLatLng(containerPoint));
        }
        else {
            // Reset if dropped on UI
            this.style.position = '';
            this.style.zIndex = '';
            this.style.cursor = 'pointer';
            this.classList.remove('md-36');
            setIsBeingDragged(false);
        }

        // Clean up afterwards
        if (isMouseEvent(e)) {
            this.removeEventListener('mousemove', onMouseMove);
            this.removeEventListener('mouseout', onMouseMove);
            this.removeEventListener('mouseup', onStop);
            setIsBeingDragged(false);
        }
        else if (isTouchEvent(e)) {
            this.removeEventListener('touchcancel', onStop);
            this.removeEventListener('touchmove', onTouchMove);
            this.removeEventListener('touchend', onStop);
            setIsBeingDragged(false);
        }
        else console.log('ERROR!');
    }

    /** When dragging begins */
    function onStart(e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) {
        if (isReactMouseEvent(e)) e.preventDefault();
        setIsBeingDragged(true);

        // Put marker on top
        e.currentTarget.style.position = 'fixed';
        e.currentTarget.style.zIndex = '9999';

        // Set styles
        e.currentTarget.style.cursor = 'grabbing';
        e.currentTarget.classList.add('md-36');

        if (isReactMouseEvent(e)) {

            // Move marker to mouse position
            e.currentTarget.style.top = (e.clientY - 18).toString() + 'px';
            e.currentTarget.style.left = (e.clientX - 18).toString() + 'px';

            // Set up mouse listeners
            e.currentTarget.addEventListener('mousemove', onMouseMove);
            e.currentTarget.addEventListener('mouseout', onMouseMove);
            e.currentTarget.addEventListener('mouseup', onStop);

        }
        else if (isReactTouchEvent(e)) {

            // Move marker to touch position
            e.currentTarget.style.top = (e.touches[0].clientY - 18).toString() + 'px';
            e.currentTarget.style.left = (e.touches[0].clientX - 18).toString() + 'px';

            // Set up touch listeners
            e.currentTarget.addEventListener('touchcancel', onStop);
            e.currentTarget.addEventListener('touchmove', onTouchMove);
            e.currentTarget.addEventListener('touchend', onStop);
        }
        else console.log('ERROR!');
    }

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
                            <div key={props.id} className='material-icons select-none theMarker'
                                onMouseDownCapture={(e) => onStart(e)}
                                onTouchStartCapture={(e) => onStart(e)}
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