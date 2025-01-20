import React, { useState } from "react";
import MapComponent from "./components/MapComponent";

const App = () => {
  const [coordinates, setCoordinates] = useState([]);

  const handleDrawComplete = (type, coords) => {
    console.log(`Completed drawing ${type}:`, coords);
    setCoordinates(coords);
  };

  return (
    <div>
      <h1>Map Drawing Tool</h1>
      <MapComponent onDrawComplete={handleDrawComplete} />
      <pre>{JSON.stringify(coordinates, null, 2)}</pre>
    </div>
  );
};

export default App;

