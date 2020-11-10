import React from 'react';
import MapLeaflet from './MapLeaflet';
import MainNav from './MainNav';

function App(): JSX.Element {
  return ( 
    <div className='h-screen w-screen'> {/* They gray here is for debuging */}      
      <MapLeaflet>
      </MapLeaflet>
      <MainNav />
    </div>
  );
}

export default App;
