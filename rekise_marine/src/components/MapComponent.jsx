
import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import { Draw } from "ol/interaction";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";
import "../styles/MapComponent.css";

const MapComponent = ({ onDrawComplete }) => {
  const mapRef = useRef(null);
  const vectorSourceRef = useRef(new VectorSource());
  const drawInteractionRef = useRef(null);

  const [mapInstance, setMapInstance] = useState(null);
  const [drawings, setDrawings] = useState([]); // Store coordinates and type

  useEffect(() => {
    if (mapRef.current) {
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({ source: new OSM() }),
          new VectorLayer({ source: vectorSourceRef.current }),
        ],
        view: new View({
          center: fromLonLat([77.5946, 12.9716]), // Default center (Bangalore, India)
          zoom: 10,
        }),
      });

      setMapInstance(map);

      return () => {
        map.setTarget(null);
      };
    }
  }, []);

  const startDrawing = (type) => {
    if (!mapInstance) return;

    // Remove previous interaction if any
    if (drawInteractionRef.current) {
      mapInstance.removeInteraction(drawInteractionRef.current);
    }

    const drawInteraction = new Draw({
      source: vectorSourceRef.current,
      type: type,
    });

    drawInteraction.on("drawend", (event) => {
      const geometry = event.feature.getGeometry();
      const coordinates = geometry.getCoordinates();

      // Update drawings state
      setDrawings((prev) => [
        ...prev,
        { type: type === "LineString" ? "Line" : "Polygon", coordinates },
      ]);

      // Call the parent callback if provided
      if (onDrawComplete && typeof onDrawComplete === "function") {
        onDrawComplete(type, coordinates);
      }

      // Remove interaction
      mapInstance.removeInteraction(drawInteraction);
      drawInteractionRef.current = null;
    });

    mapInstance.addInteraction(drawInteraction);
    drawInteractionRef.current = drawInteraction;
  };

  return (
    <div className="map-container">
      <div ref={mapRef} className="map-element"></div>
      <div className="drawing-controls">
        <button onClick={() => startDrawing("LineString")}>Draw Line</button>
        <button onClick={() => startDrawing("Polygon")}>Draw Polygon</button>
      </div>
      <div className="drawing-results">
        <h3>Drawings:</h3>
        {drawings.length === 0 ? (
          <p>No drawings yet</p>
        ) : (
          <ul>
            {drawings.map((drawing, index) => (
              <li key={index}>
                <strong>{drawing.type}</strong>:{" "}
                {drawing.coordinates.map((coord, i) =>
                  Array.isArray(coord[0]) ? (
                    <ul key={i}>
                      {coord.map((subCoord, j) => (
                        <li key={j}>{`[${subCoord.join(", ")}]`}</li>
                      ))}
                    </ul>
                  ) : (
                    <span key={i}>{`[${coord.join(", ")}] `}</span>
                  )
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
