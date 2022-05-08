import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ReactAudioPlayer from 'react-audio-player';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

const TableRows = ({ row, index }) => {
  const [muteBoolean, setMuteBoolean] = useState(true);
  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      setMuteBoolean(true);
    });
    return () => {
      setMuteBoolean(true);
      document.removeEventListener('mousedown', (e) => {
        setMuteBoolean(true);
      });
    };
  }, []);

  console.log(muteBoolean);

  return (
    <TableRow
      key={index}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='th' scope='row'>
        {index + 1}. {row.name}
      </TableCell>

      <TableCell align='right'>
        <BookmarkAddedIcon sx={{ color: 'rgb(0, 208, 208)' }} />
      </TableCell>

      <TableCell align='right'>
        {muteBoolean ? (
          <PlayCircleIcon
            sx={{ color: 'rgb(0, 208, 208)' }}
            onClick={() => setMuteBoolean(!muteBoolean)}
          />
        ) : (
          <StopCircleIcon
            sx={{ color: 'rgb(0, 208, 208)' }}
            onClick={() => setMuteBoolean(!muteBoolean)}
          />
        )}

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
          muted={muteBoolean}
        />
      </TableCell>
    </TableRow>
  );
};

export default TableRows;
