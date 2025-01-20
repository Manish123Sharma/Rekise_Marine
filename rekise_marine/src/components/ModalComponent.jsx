import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "../styles/ModalComponent.css";

const calculateDistance = (coord1, coord2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371e3; // Earth's radius in meters
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

const ModalComponent = ({
  open = false,
  onClose,
  lineStringCoordinates = [],
  polygonCoordinates = [],
  currentDrawing = "",
  handleInsertPolygon,
}) => {
  const renderWaypoints = () => {
    const coordinates =
      currentDrawing === "LineString" ? lineStringCoordinates : polygonCoordinates;

    if (!coordinates || coordinates.length === 0) {
      return <p>No waypoints available.</p>;
    }

    return coordinates.map((wp, index) => {
      const nextWp = coordinates[index + 1] || wp;
      const distance = index > 0 ? calculateDistance(coordinates[index - 1], wp) : 0;

      return (
        <div key={index} className="waypoint-row">
          <span>
            WP({String(index + 1).padStart(2, "0")}): {wp.join(", ")}
          </span>
          <span>Distance: {distance.toFixed(2)} meters</span>
          <button
            onClick={() => handleInsertPolygon("before", index)}
            className="dropdown-option"
          >
            Insert Polygon Before
          </button>
          <button
            onClick={() => handleInsertPolygon("after", index)}
            className="dropdown-option"
          >
            Insert Polygon After
          </button>
        </div>
      );
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-content">
        <h2>{currentDrawing === "LineString" ? "Mission Planner" : "Polygon Tool"}</h2>
        <div className="modal-waypoints">{renderWaypoints()}</div>
        <div className="modal-actions">
          <Button variant="contained" color="secondary" onClick={onClose}>
            Discard
          </Button>
          <Button variant="contained" color="primary">
            Import Points
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
