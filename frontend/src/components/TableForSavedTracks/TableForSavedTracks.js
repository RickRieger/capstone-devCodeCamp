import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableRows from './TableRows';

const TableForSavedTracks = ({ savedTracks }) => {
  const [tracks, setTracks] = useState(savedTracks);

  const togglePlayMusic = (index, playMusic) => {
    const newTracks = tracks.map((track, trackIndex) => {
      if (trackIndex === index) {
        return { ...track, playMusic };
      }
      return { ...track, playMusic: false };
    });

    setTracks(newTracks);
  };

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
            <TableCell align='left'>Album</TableCell>
            <TableCell align='center'>Artist</TableCell>
            <TableCell align='right'>Share</TableCell>
            <TableCell align='right'>Play</TableCell>
            <TableCell align='right'>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tracks.map((row, index) => {
            return (
              <TableRows
                key={index}
                row={row}
                index={index}
                playMusic={row.playMusic}
                togglePlayMusic={(valueToSet) => {
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

export default TableForSavedTracks;
