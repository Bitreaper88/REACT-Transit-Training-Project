/*********************************/
/* Public transit response types */
/*********************************/

export interface IAgency {
    gtfsId: string;
    name: string;
}

export interface ILegGeometry {
    length: number;
    points: string;
}

export interface IStop {
    code: string;
    name: string;
}

export interface IToLocation {
    lat: number;
    lon: number;
    name: string;
}

export interface IFromLocation extends IToLocation {
    stop: IStop | null;
}

export interface ILeg {
    mode:
    | 'WALK'
    | 'BUS'
    | 'TRAM'
    | 'CAR'
    | 'BICYCLE'
    | 'SUBWAY'
    | 'TRAIN'
    | 'FERRY'
    | 'TRANSIT';
    startTime: number;
    endTime: number;
    from: IFromLocation;
    to: IToLocation;
    agency: IAgency | null;
    distance: number;
    legGeometry: ILegGeometry;
}

export interface IItinerary {
    walkDistance: number;
    duration: number;
    legs: ILeg[];
}
export interface IData {
    plan: {
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
