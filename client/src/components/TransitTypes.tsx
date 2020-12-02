/** Array of all the modes used in the app. */
export const AppModes = [
    'AIRPLANE',
    // 'BICYCLE',
    'BUS',
    'CABLE_CAR',
    // 'CAR',
    'FERRY',
    'FUNICULAR',
    // 'GONDOLA',
    'RAIL',
    'SUBWAY',
    'TRAM',
    // 'TRANSIT', // Special type that includes all public transit options
    'WALK'        // Requires special treatment: prioritize no walk
] as const;

/** All the modes currently used by the app. */
export type TransitMode = typeof AppModes[number];

/** Icon for each mode. */
export enum ModeIcon {
    'AIRPLANE' = 'flight',
    'BICYCLE' = 'directions_bike',
    'BUS' = 'directions_bus',
    'CABLE_CAR' = 'tram',
    'CAR' = 'directions_car',
    'FERRY' = 'directions_boat',
    'FUNICULAR' = 'tram',
    'GONDOLA' = 'rowing',
    'RAIL' = 'train',
    'SUBWAY' = 'subway',
    'TRAM' = 'tram',
    'WALK' = 'directions_walk'
}

/** Color key for each mode. */
export enum ModeColor {
    'AIRPLANE' = 'blue',
    'BICYCLE' = 'red',
    'BUS' = 'buss_magenta',
    'CABLE_CAR' = 'orange',
    'CAR' = 'green',
    'FERRY' = 'black',
    'FUNICULAR' = 'white',
    'GONDOLA' = 'purple',
    'RAIL' = 'train_teal',
    'SUBWAY' = 'gray',
    'TRAM' = 'pink',
    'WALK' = 'brown'
}

/** Color key for each mode. */
export enum ModeColorCSS {
    'AIRPLANE' = 'blue',
    'BICYCLE' = 'red',
    'BUS' = '#e1425f',
    'CABLE_CAR' = '#ace142',
    'CAR' = '#4299e1',
    'FERRY' = 'black',
    'FUNICULAR' = 'white',
    'GONDOLA' = 'purple',
    'RAIL' = '#42e1c9',
    'SUBWAY' = '#e142ce',
    'TRAM' = 'pink',
    'WALK' = 'brown'
}

/** Mouseover hover text for each mode. */
export enum ModeHover {
    'AIRPLANE' = 'Airplane',
    'BICYCLE' = 'Bicycle',
    'BUS' = 'Bus',
    'CABLE_CAR' = 'Cable car',
    'CAR' = 'Car',
    'FERRY' = 'Ferry',
    'FUNICULAR' = 'Funicular',
    'GONDOLA' = 'Gondola',
    'RAIL' = 'Train',
    'SUBWAY' = 'Subway',
    'TRAM' = 'Tram',
    'WALK' = 'Walk'
}
