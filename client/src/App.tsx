import React from 'react';
import MapLeaflet from './components/MapLeaflet';
import MainNav from './components/MainNav';

function App(): JSX.Element {
  return ( 
    <div className='h-screen w-screen'> {/* They gray here is for debuging */}      
      <MapLeaflet>
        <MainNav />
      </MapLeaflet>    
    </div>
  );
}

export default App;
