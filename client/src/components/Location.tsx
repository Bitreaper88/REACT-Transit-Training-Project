import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ICoordinates } from './RouteFetch';
import MapMarkerFull from './MapMarkerFull';
interface IAddress {
  label: string;
  coordinates: [number, number];
}
interface IProps {
  fieldName: string;
  coordinates: {
    position: ICoordinates | undefined;
    setPosition: React.Dispatch<React.SetStateAction<ICoordinates | undefined>>;
  };
}

// const data: IAddress = { label: 'Hello', coordinates: [23.23, 234.4] };
// console.log(data);

const Location = (props: IProps): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  // eslint-disable-next-line
  const [address, setAddress] = useState<string>('');
  const [options, setOptions] = useState<IAddress[]>([]);
  const [display, setDisplay] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!search) {
      setOptions([]);
      return;
    }

    const location: IAddress[] = [];
    async function getLocation() {
      const response = await axios.get(
        `https://api.digitransit.fi/geocoding/v1/autocomplete?text=${search}&layers=localadmin,address`
      );
      const body = await response.data.features;
      // eslint-disable-next-line
      body.map((a: any) => {
        const c: IAddress = {
          label: a.properties.label,
          coordinates: a.geometry.coordinates as [number, number],
        };
        return location.push(c);
      });
      setOptions(location);
    }
    getLocation();
  }, [search]);

  const setAddressLabel = (label: string, coordinates: [number, number]) => {
    setAddress(label);
    setSearch(label);
    props.coordinates.setPosition({ lat: coordinates[1], lon: coordinates[0] });
    // setCoordinates(coordinates);
    setDisplay(false);
  };

  /** When marker position is changed by dragging it on map */
  const newMarkerPosition = (pos: L.LatLng | L.LatLngLiteral | undefined) => {
    if (!pos) return;
    setSearch('');

    const lat = pos.lat;
    const lon = pos.lng;

    // Find nearby locations and make them selectable in options list
    let nearbyAddresses: IAddress[] = [];

    (async () => {
      const resp = await axios.get(`http://api.digitransit.fi/geocoding/v1/reverse?point.lat=${lat}&point.lon=${lon}&size=5&layers=address`);
      if (resp.status === 200 && resp.data.features.length) {
        const body = resp.data.features as { geometry: { coordinates: [number, number] }, properties: { label: string } }[];

        nearbyAddresses = body.map((address) => {
          return {
            coordinates: address.geometry.coordinates,
            label: address.properties.label
          };
        });

        setOptions(nearbyAddresses);
        if (inputRef.current) inputRef.current.focus();
      }
      else return;
    })();

    // Send position upstream
    props.coordinates.setPosition({ lat: pos.lat, lon: pos.lng });
  };

  return (
    <form action='' className='w-full'>
      <span className=' inline-block text-left, text-blue-700 text-base  w-20 ml-0 mb-2 '>
        {props.fieldName}
      </span>
      <input
        ref={inputRef}
        onFocus={() => setDisplay(true)}
        onBlur={() => setDisplay(false)}
        className='border-2 focus:outline-none, focus:border-blue ml-4'
        type='text'
        placeholder='Type to Search Origin'
        onChange={(event) => setSearch(event.target.value)}
        value={search}
      ></input>

      <MapMarkerFull key={props.fieldName} id={props.fieldName}
        color={props.fieldName === 'Origin' ? '#e53e3e' : '#38a169'} // These color values must be kept in sync with rest of the APP
        position={props.coordinates.position ? {
          lat: props.coordinates.position.lat,
          lng: props.coordinates.position.lon
        } : undefined}
        setPosition={newMarkerPosition} />

      {display && (
        <div className='absolute z-10 left-0 mt-1 py-1 rounded-sm bg-white select-none'>
          {options
            // .filter(
            //   ({ label }) =>
            //     label.toLowerCase().indexOf(search.toLowerCase()) > -1
            // )
            .map((v, i) => {
              return (
                <div
                  onMouseDownCapture={() => setAddressLabel(v.label, v.coordinates)}
                  tabIndex={0}
                  key={i}
                  className='bg-white rounded-lg p-1 w-65'
                >
                  <span
                    className='bg-white block border-white px-2 py-1 hover:border-white hover:bg-indigo-500 hover:text-white'
                    key={i}
                  >
                    {v.label}
                  </span>
                </div>
              );
            })}
        </div>
      )}
    </form>
  );
};

export default Location;
