import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ReactAudioPlayer from 'react-audio-player';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
const TableRows = ({ row, index, togglePlayMusic, playMusic }) => {
  const auth = useAuth();
  const [user, token] = auth;
  const saveTrackToFavorites = async () => {
    try {
      const track = {
        // track_id: row.id,
        // album: album.title,
        // title: row.title,
        // artist: row.artist.name,
        // image: album.cover_big,
        // preview: row.preview,
      };
      const res = await axios.post('http://127.0.0.1:8000/api/tracks/', track, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(res.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };
  return (
    <TableRow
      key={index}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
        <ShareIcon
          sx={{ color: 'rgb(0, 208, 208)' }}
          onClick={() => saveTrackToFavorites()}
        />
      </TableCell>

      <TableCell align='right'>
        {playMusic ? (
          <StopCircleIcon
            sx={{ color: 'rgb(0, 208, 208)' }}
            onClick={() => togglePlayMusic(!playMusic)}
          />
        ) : (
          <PlayCircleIcon
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
      <TableCell align='right'>
        <DeleteIcon sx={{ color: 'rgb(0, 208, 208)' }} />
      </TableCell>
    </TableRow>
  );
};

export default TableRows;
