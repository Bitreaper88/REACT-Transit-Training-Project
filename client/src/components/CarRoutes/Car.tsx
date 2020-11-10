import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';

const Car: React.FC = () => {
  const fontStyleWalk: React.CSSProperties = {
    fontSize: '1.5rem'
  };
  const fontStyledot: React.CSSProperties = {
    fontSize: '2rem',
    color: 'grey'
  };
  const mainStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    marginTop: '1.5rem',
    marginBottom: '1.5rem'
  };
  return (
    <div style={mainStyle}>
      <div><FontAwesomeIcon icon={faCar} style={fontStyleWalk} /></div>
      <FontAwesomeIcon icon={faGripLinesVertical} style={fontStyledot}/>
      <div>Car...</div>
    </div>
  );
};

export default Car;