import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import InfoIcon from '@mui/icons-material/Info';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactAudioPlayer from 'react-audio-player';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import ModalForPosts from '../ModalForPosts/ModalForPosts';

const MusicCard = ({
  album_image,
  album_id,
  album_title,
  artist_name,
  track_title,
  showPlayer,
  toggleShowPlayer,
  setUpDateSearch,
  savedAlbums,
  albums,
  setAlbums,
  track_id,
  preview_track,
}) => {
  console.log('****', artist_name);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const album = {
    album_id: album_id,
    title: album_title,
    artist: artist_name,
    image: album_image,
    preview: preview_track,
    preview_title: track_title,
  };
  const navigate = useNavigate();
  const auth = useAuth();
  const [user, token] = auth;
  const handleNavigate = () => {
    if (setUpDateSearch) {
      setUpDateSearch('');
    }

    navigate(`/album-info/${album_id}`);
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
        `http://127.0.0.1:8000/api/albums/${album_id}`,

        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      let newAlbums = albums.filter((album) => album.id != album_id);
      setAlbums(newAlbums);
      console.log(res.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <div className='event-card'>
      <img
        className='event-image'
        src={album_image}
        alt='album or song cover'
      />
      <div className='event-details'>
        <p
          style={{
            fontSize: '.8rem',
            textAlign: 'center',
            visibility: showPlayer ? 'visible' : 'hidden',
          }}
        >
          "{track_title}"
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
          src={preview_track}
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
      <ModalForPosts
        album_id={album_id}
        track_id={track_id}
        album_title={album_title}
        track_title={track_title}
        artist_name={artist_name}
        album_image={album_image}
        preview_track={preview_track}
        handleClose={handleClose}
        open={open}
      />
    </div>
  );
};

export default MusicCard;
