import React from 'react';
import './App.css';
import MapLeaflet from './MapLeaflet';

function App(): JSX.Element {
  return (
    <MapLeaflet>
      {/* Custom components on top of the map can go here too */}
    </MapLeaflet>
  );
}

export default App;
