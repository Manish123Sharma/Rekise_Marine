import React from 'react';

const Dropdown = ({ onInsertPolygon }) => {
  return (
    <div>
      <button onClick={() => onInsertPolygon('before')}>Insert Polygon Before</button>
      <button onClick={() => onInsertPolygon('after')}>Insert Polygon After</button>
    </div>
  );
};

export default Dropdown;
