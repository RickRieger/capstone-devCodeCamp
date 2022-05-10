import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ReactAudioPlayer from 'react-audio-player';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

const TableRows = ({ row, index, togglePlayMusic, playMusic, album }) => {
  console.log('***PlayMusic:', playMusic);
  // console.log('***Index:', index);
  return (
    <TableRow
      key={index}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='th' scope='row'>
        {index + 1}. {row.title}
      </TableCell>

      <TableCell align='right'>
        <BookmarkAddedIcon sx={{ color: 'rgb(0, 208, 208)' }} />
      </TableCell>

      <TableCell align='right'>
        {playMusic ? (
          <PlayCircleIcon
            sx={{ color: 'rgb(0, 208, 208)' }}
            onClick={() => togglePlayMusic(!playMusic)}
          />
        ) : (
          <StopCircleIcon
            sx={{ color: 'rgb(0, 208, 208)' }}
            onClick={() => togglePlayMusic(!playMusic)}
          />
        )}
        {playMusic ? (
          <ReactAudioPlayer
            src={row.preview}
            autoPlay
            controls
            loop={true}
            style={{
              marginBottom: '1rem',
              color: 'black',
              display: 'none',
            }}
          />
        ) : (
          ''
        )}
      </TableCell>
    </TableRow>
  );
};

export default TableRows;
