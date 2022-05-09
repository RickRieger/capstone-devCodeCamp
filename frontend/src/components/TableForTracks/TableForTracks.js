import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableRows from './TableRows';
function createData(title, calories, fat, carbs, preview) {
  return { title, calories, fat, carbs, preview };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const TableForTracks = ({ tracks }) => {
  // console.log(tracks);

  let rows = [];
  tracks.forEach((track) => {
    rows.push(createData(track.title, 159, 6.0, 24, track.preview));
  });

  // console.log(rows);

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 800, maxHeight: 400, overflow: 'scroll' }}
    >
      <Table
        sx={{ maxWidth: 800, backgroundColor: 'rgb(108, 108, 108)' }}
        aria-label='simple table'
      >
        <TableHead>
          <TableRow>
            <TableCell>Track-Title</TableCell>
            <TableCell align='right'>Save</TableCell>
            <TableCell align='right'>Play</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            return <TableRows key={index} row={row} index={index} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableForTracks;
