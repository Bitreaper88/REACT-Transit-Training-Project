import React from 'react';
import MapLeaflet from './MapLeaflet';
import MainNav from './MainNav';
import './App.css';


function App(): JSX.Element {
  return (
    <div className='h-screen w-screen bg-white'> {/* They gray here is for debuging */}
      <MainNav />
    <MapLeaflet>
      {/* Custom components on top of the map can go here too */}
    </MapLeaflet>
    </div>
  );
}

export default App;
