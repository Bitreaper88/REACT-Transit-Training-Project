// import axios from 'axios';
// import * as q from './Pricing.queries';
import { IItinerary, ILeg } from './components/RouteFetch.types';

/** Object including price for a leg and boolean indicating whether it is estimate or exact value */
export interface IPrice {
    /** Whether the value is an estimate or accurate fare price */
    estimate: boolean;
    /** Fare price in euros */
    price: number;
}

/** Async get single price for a whole itinerary */
export async function endPrice(itin: IItinerary): Promise<IPrice> {
    const allLegs = await prices(itin.legs);
    return allLegs.reduce((acc, curr) => {
        return {
            estimate: acc.estimate || curr.estimate,
            price: acc.price + curr.price
        };
    });
}

/** Async get price estimate for an array of legs */
export async function prices(legs: ILeg[]): Promise<IPrice[]> {
    const promises = legs.map(leg => price(leg));
    return Promise.all(promises).then((res) => {
        return res;
    });
}

/** Async get price estimate for one leg */
export async function price(leg: ILeg): Promise<IPrice> {
    switch (leg.mode) {
        case 'AIRPLANE':
            return {
                estimate: true,
                price: leg.distance / 1000 * 0.5    // Rough estimate
            };

        case 'BUS':
            return {
                estimate: true,
                price: 100
            };

        // if (leg.agency?.gtfsId === 'HSL:HSL') {
        //     const reqVariables = {
        //         from: {
        //             lat: leg.from.lat,
        //             lon: leg.from.lon
        //         },
        //         to: {
        //             lat: leg.to.lat,
        //             lon: leg.to.lon
        //         },
        //     };
        //     return await axios('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         data: JSON.stringify({
        //             query: q.HSLQuery,
        //             variables: reqVariables
        //         })
        //     }).then(() => {
        //         return {
        //             estimate: false,
        //             price: 5
        //         };

        //     }).catch(() => {
        //         return {
        //             estimate: true,
        //             price: 10
        //         };

        //     });
        // }
        // else return {
        //     estimate: true,
        //     price: 10
        // };

        case 'CABLE_CAR':
            return {
                estimate: true,
                price: 2.8      // Standard HSL fare
            };

        case 'FERRY':       // Placeholder
            return {
                estimate: true,
                price: 100
            };

        case 'FUNICULAR':
            return {
                estimate: true,
                price: 2.8      // Standard HSL fare, most likely wrong
            };

        case 'RAIL':
            return {
                estimate: true,
                price: leg.distance * 0.12      // Actually pretty good estimate
            };

        case 'SUBWAY':
            return {
                estimate: true,
                price: 2.8      // Price of a local ticket, standard HSL ticket
            };

        case 'TRAM':
            return {
                estimate: true,
                price: 2.8      // Standard HSL fare
            };

        case 'WALK':
            return {
                estimate: false,
                price: 0        // Walking is free
            };

        default:            // Error
            return {
                estimate: true,
                price: -1
            };
    }
}