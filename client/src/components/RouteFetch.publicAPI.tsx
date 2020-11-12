
export function getGraphQLRequest(): string {

  return (
    `query Itinaries($from: InputCoordinates, $to: InputCoordinates)
      {plan(from: $from, to: $to) { 
        itineraries {
          walkDistance,
          duration,
            legs {
              mode
              startTime
              endTime
              from {
                lat
                lon
                name
                stop {
                  code
                  name
                }
              },
              to {
                lat
                lon
                name
              },
              agency {
                gtfsId
                name
              },
              distance
              legGeometry {
                length
                points
              }
            }
          }
        }  
      }`
  );
}