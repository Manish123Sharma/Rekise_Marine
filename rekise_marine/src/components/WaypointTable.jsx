import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../styles/WaypointTable.css';

const WaypointTable = ({ waypoints }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>WP</TableCell>
            <TableCell>Coordinates</TableCell>
            <TableCell>Distance (m)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {waypoints.map((wp, index) => (
            <TableRow key={index}>
              <TableCell>{wp.id}</TableCell>
              <TableCell>{wp.coordinates}</TableCell>
              <TableCell>{wp.distance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WaypointTable;
