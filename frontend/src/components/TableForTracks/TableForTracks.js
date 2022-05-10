import React, { useState } from 'react';
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

const TableForTracks = ({ albumInfo }) => {
  const [tracks, setTracks] = useState(albumInfo.tracks.data);
  // let rows = [];
  // tracks.forEach((track) => {
  //   rows.push(createData(track.title, track.playMusic, 6.0, 24, track.preview));
  // });

  const togglePlayMusic = (index, playMusic) => {
    const newTracks = tracks.map((track, trackIndex) => {
      if (trackIndex === index) {
        return { ...track, playMusic };
      }
      return { ...track, playMusic: false };
    });

    setTracks(newTracks);
  };
  console.log('***TRACKS:', tracks);
  console.log('***ALBUM:', albumInfo);

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
          {tracks.map((row, index) => {
            return (
              <TableRows
                key={index}
                album={albumInfo}
                row={row}
                index={index}
                playMusic={row.playMusic}
                togglePlayMusic={(valueToSet) => {
                  console.log('**** valueToSet: ', valueToSet);
                  togglePlayMusic(index, valueToSet);
                }}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableForTracks;
