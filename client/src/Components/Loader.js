import React from 'react';
import load from '../img/Loading.gif';

export default () => {
  return (
    <div>
      <img
        src={load}
        style={{ width: '100px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  )
}
