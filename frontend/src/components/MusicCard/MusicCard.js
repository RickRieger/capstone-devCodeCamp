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
}) => {
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
      const album = {
        album_id: albumId,
        title: albumTitle,
        artist: artistName,
        image: image,
        preview: sampleTrack,
        preview_title: trackTitle,
      };
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
  console.log('*******', savedAlbums);
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
          "{preview_title}""
        </p>
        <div className='row-links'>
          <button
            className='icon-buttons'
            onClick={() => saveAlbumToFavorites()}
          >
            {savedAlbums ? (
              <>
                <DeleteIcon /> remove album
              </>
            ) : (
              <>
                <BookmarkAddedIcon />
                save album
              </>
            )}
          </button>
          <button className='icon-buttons' onClick={() => handleNavigate()}>
            <InfoIcon />
            get album info
          </button>
          <button className='icon-buttons' onClick={() => handleNavigate()}>
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
    </div>
  );
};

export default MusicCard;
