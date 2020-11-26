import React, { useEffect, useState } from 'react';
import axios from 'axios';
interface IAddress {
  label: string;
  coordinates: [number, number];
}
interface IProps {
  fieldName: string;
}

// const data: IAddress = { label: 'Hello', coordinates: [23.23, 234.4] };
// console.log(data);

const Location = (props: IProps): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  // eslint-disable-next-line
  const [address, setAddress] = useState<string>('');
  const [options, setOptions] = useState<IAddress[]>([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (!search) {
      setAddress('');
      return;
    }

    const location: IAddress[] = [];
    async function getLocation() {
      const response = await axios.get(
        `https://api.digitransit.fi/geocoding/v1/autocomplete?text=${search}&layers=address`
      );
      const body = await response.data.features;
      console.log('Data Body', body);
      // eslint-disable-next-line
      body.map((a: any) => {
        const c: IAddress = {
          label: a.properties.label,
          coordinates: a.geometry.coordinates,
        };
        return location.push(c);
      });
      console.log('this is b', location);
      setOptions(location);
      console.log('This is option', options);
    }
    getLocation();
  }, [search]);

  const setAddressLabel = (label: string) => {
    setAddress(label);
    setDisplay(false);
  };
  // console.log(address);
  return (
    <form action='' className='w-full'>
      {props.fieldName}
      <input
        className='border-2 focus:outline-none, focus:border-blue'
        type='text'
        onClick={() => setDisplay(!display)}
        placeholder='Type to Search Origin'
        onChange={(event) => setSearch(event.target.value)}
        value={search}
      ></input>
      {display && (
        <div className='absolute left-0 mt-1 py-1 rounded-sm bg'>
          {options
            .filter(({ label }) => label.indexOf(search.toLowerCase()) > -1)
            .map((v, i) => {
              return (
                <div
                  onClick={() => setAddressLabel(v.label)}
                  tabIndex={0}
                  key={i}
                  className='bg-white rounded-lg p-1 w-65'
                >
                  <span
                    className='block border-white px-2 py-1 hover:border-white hover:bg-indigo-500 hover:text-white'
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
