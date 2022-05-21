import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ReactAudioPlayer from 'react-audio-player';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import useAuth from '../../hooks/useAuth';
import ModalForPosts from '../ModalForPosts/ModalForPosts';
import axios from 'axios';
const TableRows = ({
  row,
  index,
  togglePlayMusic,
  playMusic,
  tracks,
  setTracks,
}) => {
  const auth = useAuth();
  const [user, token] = auth;
  const removeTrackFromFavorites = async () => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/tracks/${row.id}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      const newTracks = tracks.filter((track) => track.id !== row.id);
      setTracks(newTracks);
    } catch (e) {
      console.log(e.response.data);
    }
  };
  return (
    <TableRow
      key={index}
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
      }}
      style={{ backgroundColor: 'rgb(144 174 244)' }}
    >
      <TableCell component='th' scope='row'>
        {index + 1}. {row.title}
      </TableCell>
      <TableCell component='th' scope='row'>
        {row.album}
      </TableCell>
      <TableCell component='th' scope='row'>
        {row.artist}
      </TableCell>

      <TableCell align='right'>
        <ShareIcon sx={{ color: 'rgb(0, 0, 0)' }} />
      </TableCell>

      <TableCell align='right'>
        {playMusic ? (
          <StopCircleIcon
            sx={{ color: '#8b0000' }}
            onClick={() => togglePlayMusic(!playMusic)}
          />
        ) : (
          <PlayCircleIcon
            sx={{ color: 'green' }}
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
      <TableCell align='right'>
        <DeleteIcon
          sx={{ color: 'rgb(0, 0, 0)' }}
          onClick={() => removeTrackFromFavorites()}
        />
      </TableCell>
    </TableRow>
  );
};

export default TableRows;
