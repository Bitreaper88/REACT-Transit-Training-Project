import React from 'react';
import MainNav from './MainNav';
import './App.css';


function App(): JSX.Element {
  return (
    <div className='h-screen w-screen bg-red-500 bg-opacity-100'> {/* They gray here is for debuging */}
      <MainNav />
    </div>
  );
}

export default App;
