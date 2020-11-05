type legs = [
  {
    steps: [
      {
        maneuver: {
          type: string,
          instruction: string,
          bearing_after: number,
          bearing_before: number
        }
      }
    ],
    intersections: [
      {
        classes: string[],
        entry: boolean[],
        bearing: number[],
        duration: number,
        mapbox_streets_v8: {
          class: string
        },
        is_urban: boolean,
        admin_index: number,
        out: number,
        weight: number,
        geometry_index: number,
        location: number[]
      },
      {
        bearings: number[],
        entry: boolean[],
        classes: string[],
        in: number,
        turn_weight: number,
        turn_duration: number,
        mapbox_streets_v8: {
          class: string
        },
        is_urban: boolean,
        admin_index: number,
        out: number,
        geometry_index: number,
        location: number[]
      }
    ],
    weight: number,
    duration: number,
    distance: number,
    name: string,
    driving_side: string,
    mode: string,
    geometry: {
      coordinates: number[]
    },
    type: string
  },
  {
    maneuver: {
      type: string,
      instruction: string,
      modifier: string,
      bearing_after: number,
      bearing_before: number,
      location: number[]
    }
  }
];

export interface ICarRouteAPI {
  routes: [
    {
      weight_name: string | null,
      weight: number | null,
      duration: number,
      distance: number,
      location: number[],
      legs: legs
    },
  ],
  waypoints: [
    {
      distance: number,
      name: string,
      location: number[]
    }
  ]
  code: string,
  uuid: string
}

