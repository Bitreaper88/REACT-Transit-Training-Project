import { Mode } from './TransportModes';

/**********************/
/* Combined responses */
/**********************/

export interface IRawResponse {
    /** Array of responses from public transit API */
    public: IData[];
    /** Array of responses from car route API */
    car: ICarRouteAPI[];
}

/*********************************/
/* Public transit response types */
/*********************************/

export interface IAgency {
    /** Agency feed and id */
    gtfsId: string;
    /** Name of the agency */
    name: string;
}

export interface ILegGeometry {
    /** The number of points in the string */
    length: number;
    /** List of coordinates of in a Google encoded polyline format */
    points: string;
}

export interface IStop {
    /** Stop code which is visible at the stop */
    code: string;
    /** Name of the stop, e.g. Pasilan asema */
    name: string;
}

export interface IToLocation {
    lat: number;
    lon: number;
    /** For transit stops, the name of the stop. For points of interest, the name of the POI. */
    name: string;
}

export interface IFromLocation extends IToLocation {
    /** The stop related to the place. */
    stop: IStop | null;
}

export interface ILeg {
    /** The mode (e.g. WALK) used when traversing this leg. */
    mode: Mode
    // | 'AIRPLANE'
    // // | 'BICYCLE'
    // | 'BUS'
    // | 'CABLE_CAR'
    // | 'CAR'
    // | 'FERRY'
    // | 'FUNICULAR'
    // // | 'GONDOLA'
    // | 'RAIL'
    // | 'SUBWAY'
    // | 'TRAM'
    // // | 'TRANSIT'
    // | 'WALK';
    /** The date and time when this leg begins. Format: Unix timestamp in milliseconds. */
    startTime: number;
    /** The date and time when this leg ends. Format: Unix timestamp in milliseconds. */
    endTime: number;
    /** The Place where the leg originates. */
    from: IFromLocation;
    /** The Place where the leg ends. */
    to: IToLocation;
    /** For transit legs, the transit agency that operates the service used for this leg. For non-transit legs, null. */
    agency: IAgency | null;
    /** The distance traveled while traversing the leg in meters. */
    distance: number;
    /** The leg's geometry. */
    legGeometry: ILegGeometry;
}

export interface IItinerary {
    /** How far the user has to walk, in meters. */
    walkDistance: number;
    /** Duration of the trip on this itinerary, in seconds. */
    duration: number;
    /** A list of Legs. Each Leg is either a walking (cycling, car) portion of the itinerary, or a transit leg on a particular vehicle. 
    *   So a itinerary where the user walks to the Q train, transfers to the 6, then walks to their destination, has four legs. */
    legs: ILeg[];
}
export interface IData {
    plan: {
        /** Array of 1-3 possible routes (index 0 should be optimized for speed) */
        itineraries: IItinerary[];
    };
}

/****************************/
/* Car route response types */
/****************************/

export interface IRoutes {
    weight_name: string | null;
    weight: number | null;
    geometry: string;
    duration: number;
    distance: number;
    location: number[];
}

export interface IWaypoints {
    distance: number;
    name: string;
    location: number[];
}

export interface ICarRouteAPI {
    routes: IRoutes[];
    waypoints: IWaypoints[];
    code: string;
    uuid: string;
}
