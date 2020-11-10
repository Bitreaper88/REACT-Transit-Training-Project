import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

const End: React.FC = () => {
  const fontStyleLoc: React.CSSProperties  = {
    fontSize: '1.5rem',
    color: 'green',
    marginLeft: '.6rem'
  };
  const mainStyle: React.CSSProperties  = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    marginTop: '1.5rem',
    marginBottom: '1.5rem'
  };
  const dStyle: React.CSSProperties = {
    fontWeight: 'bold'
  };
  const d = new Date();
  return (
    <div style={mainStyle}>
      <div><h4 style={dStyle}>{`${d.getHours()} : ${d.getMinutes()}`}</h4></div>
      <FontAwesomeIcon icon={faMapMarkerAlt} style={fontStyleLoc} />
      <div>Turku, Turku</div>
    </div>
  );
};

export default End;