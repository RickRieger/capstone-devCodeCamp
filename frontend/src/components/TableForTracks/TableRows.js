import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ReactAudioPlayer from 'react-audio-player';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import ShareIcon from '@mui/icons-material/Share';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';
import ModalForPosts from '../ModalForPosts/ModalForPosts';
const TableRows = ({
  row,
  index,
  togglePlayMusic,
  playMusic,
  album,
  albumInfo,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const auth = useAuth();
  const [user, token] = auth;
  const saveTrackToFavorites = async () => {
    try {
      const track = {
        track_id: row.id,
        album: album.title,
        title: row.title,
        artist: row.artist.name,
        image: album.cover_big,
        preview: row.preview,
      };
      const res = await axios.post('http://127.0.0.1:8000/api/tracks/', track, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      toast('🦄 Album saved!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(res.data);
    } catch (e) {
      toast('Album already saved!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(e.response);
    }
  };
  return (
    <TableRow
      key={index}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      style={{ backgroundColor: 'rgb(144 174 244)', fontWeight: 'bolder' }}
    >
      <TableCell component='th' scope='row'>
        {index + 1}. {row.title}
      </TableCell>

      <TableCell align='right'>{album.title}</TableCell>
      <TableCell align='right'>{album.artist.name}</TableCell>
      <TableCell align='right'>
        <ShareIcon
          sx={{ color: 'rgb(0, 0, 0)' }}
          onClick={() => handleOpen()}
        />
      </TableCell>
      <TableCell align='right'>
        <BookmarkAddedIcon
          sx={{ color: 'rgb(0 0 0)' }}
          onClick={() => saveTrackToFavorites()}
        />
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
      <ModalForPosts
        album_id={albumInfo.id}
        track_id={row.id}
        album_title={albumInfo.title}
        track_title={row.title}
        artist_name={albumInfo.artist.name}
        album_image={albumInfo.cover_big}
        preview_track={row.preview}
        handleClose={handleClose}
        open={open}
      />
    </TableRow>
  );
};

export default TableRows;
