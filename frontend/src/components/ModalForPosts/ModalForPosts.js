import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

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

const ModalForPosts = ({
  album_title,
  album_image,
  album_id,
  track_id,
  track_title,
  artist_name,
  preview_track,
  handleClose,
  open,
}) => {
  console.log(album_id);
  const auth = useAuth();
  const [user, token] = auth;
  const [post, setPost] = useState('');
  const postToBackEnd = {
    post: post,
    album_id: album_id,
    track_id: track_id,
    album_title: album_title,
    track_title: track_title,
    artist_name: artist_name,
    album_image: album_image,
    preview_track: preview_track,
  };
  console.log('====', token);

  const sendPostToTheBackEnd = async () => {
    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/api/posts/',
        postToBackEnd,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
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
            value={post}
            onChange={(e) => {
              setPost(e.target.value);
            }}
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

        <img src={album_image} alt='' />
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
            onClick={() => sendPostToTheBackEnd()}
          >
            Post
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalForPosts;
