import React from 'react';
import MapLeaflet from './components/MapLeaflet';
import MainNav from './components/MainNav';
import ResponseProvider from './components/ResponseProvider';

function App(): JSX.Element {
  return (
    <div className='h-screen w-screen'> {/* They gray here is for debuging */}
      <ResponseProvider>
        <MapLeaflet>
          <MainNav />
        </MapLeaflet>
      </ResponseProvider>
    </div>
  );
}

export default App;
