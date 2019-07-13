import React from 'react';
import load from '../img/Loading.gif';

export default () => {
  return (
    <div>
      <img
        src={load}
        style={{ width: '80px', margin: 'auto', marginTop: '5em', display: 'block' }}
        alt="Loading..."
      />
    </div>
  )
}
