import React from 'react';

const Location = (): JSX.Element => {
  return (
    <div className=''>
      <form>
        <label htmlFor='from'>
          From
          <input type='text' id='from' name='from' />
        </label>
        <label htmlFor='destination'>
          Destination
          <input type='text' id='destination' name='destination' />
        </label>
      </form>
    </div>
  );
};

export default Location;
