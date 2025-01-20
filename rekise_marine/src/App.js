import React from 'react';
import MapComponent from './components/MapComponent';
import WaypointTable from './components/WaypointTable';
import ModalComponent from './components/ModalComponent';
import './index.css';

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">Mission Planner</header>
      <MapComponent />
      <ModalComponent />
    </div>
  );
};

export default App;