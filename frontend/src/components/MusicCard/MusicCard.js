import React, { useContex } from 'react';
import { useNavigate } from 'react-router-dom';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import InfoIcon from '@mui/icons-material/Info';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ReactAudioPlayer from 'react-audio-player';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Close from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { borderColor } from '@mui/material/node_modules/@mui/system';
import Avatar from '@mui/material/Avatar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 'auto',
  bgcolor: '#252424',
  boxShadow: 24,
  borderRadius: 4,
  padding: 3,

  boxShadow:
    'rgba(142, 163, 255, 0.8) 0px 20px 20px, rgba(142, 163, 255, 0.8) 0px -12px 20px, rgba(142, 163, 255, 0.8) 0px 4px 6px, rgba(142, 163, 255, 0.8) 0px 9px 9px, rgba(142, 163, 255, 0.8) 0px -3px 1px',
};

const MusicCard = ({
  image,
  sampleTrack,
  albumId,
  albumTitle,
  artistName,
  trackTitle,
  showPlayer,
  toggleShowPlayer,
  setUpDateSearch,
  savedAlbums,
  preview_title,
  albums,
  setAlbums,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const album = {
    album_id: albumId,
    title: albumTitle,
    artist: artistName,
    image: image,
    preview: sampleTrack,
    preview_title: trackTitle,
  };
  const navigate = useNavigate();
  const auth = useAuth();
  const [user, token] = auth;
  const handleNavigate = () => {
    if (setUpDateSearch) {
      setUpDateSearch('');
    }

    navigate(`/album-info/${albumId}`);
  };
  const saveAlbumToFavorites = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/albums/', album, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(res.data);
    } catch (e) {
      console.log(e.response.data.album_id[0]);
    }
  };
  const removeAlbumFromFavorites = async () => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/albums/${albumId}`,

        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      let newAlbums = albums.filter((album) => album.id != albumId);
      setAlbums(newAlbums);
      console.log(res.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <div className='event-card'>
      <img className='event-image' src={image} alt='album or song cover' />
      <div className='event-details'>
        <p
          style={{
            fontSize: '.8rem',
            textAlign: 'center',
            visibility: showPlayer ? 'visible' : 'hidden',
          }}
        >
          "{trackTitle}"
        </p>
        <div className='row-links'>
          {savedAlbums ? (
            <button
              className='icon-buttons'
              onClick={() => removeAlbumFromFavorites()}
            >
              <DeleteIcon /> remove album
            </button>
          ) : (
            <button
              className='icon-buttons'
              onClick={() => saveAlbumToFavorites()}
            >
              <BookmarkAddedIcon />
              save album
            </button>
          )}

          <button className='icon-buttons' onClick={() => handleNavigate()}>
            <InfoIcon />
            get album info
          </button>
          <button className='icon-buttons' onClick={() => handleOpen()}>
            <ShareIcon />
            share album
          </button>
          <button
            className='icon-buttons'
            onClick={() => toggleShowPlayer(!!!showPlayer)}
          >
            {showPlayer ? (
              <>
                <StopCircleIcon /> stop player
              </>
            ) : (
              <>
                <PlayCircleIcon /> play sample
              </>
            )}
          </button>
        </div>
      </div>
      {showPlayer ? (
        <ReactAudioPlayer
          src={sampleTrack}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div style={{ padding: '.5rem' }}>
            <CloseIcon
              style={{ color: 'red', float: 'right' }}
              onClick={() => handleClose()}
            />
          </div>

          <Typography
            id='modal-modal-title'
            variant='h4'
            component='h2'
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <span>Create post</span>
          </Typography>
          <hr />

          <Typography
            id='modal-modal-description'
            sx={{ mt: 4, padding: 2, color: 'white', fontSize: '2rem' }}
          >
            <div>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  marginTop: '-2rem',
                  marginBottom: '1rem',
                }}
              />
              {user.first_name} {user.last_name}
            </div>

            <TextField
              id='standard-basic'
              label={`What's on your mind ${user.username}...`}
              variant='standard'
              sx={{ width: '100%' }}
              InputLabelProps={{
                style: {
                  color: '#0080ff',
                  fontSize: '1.5rem',
                },
              }}
              InputProps={{
                style: {
                  color: '#fff',
                  fontSize: '1.5rem',
                },
              }}
              autoFocus
            />
          </Typography>

          <img src={image} alt='' />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
          >
            {' '}
            <Button
              variant='contained'
              style={{ minWidth: '80%' }}
              sx={{
                ':hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              Post
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MusicCard;
