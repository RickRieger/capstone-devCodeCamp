import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import InfoIcon from '@mui/icons-material/Info';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import ReactAudioPlayer from 'react-audio-player';

const MusicCard = ({
  image,
  sampleTrack,
  albumId,
  showPlayer,
  toggleShowPlayer,
}) => {
  const navigate = useNavigate();
  // console.log('**** aldumId | showPlayer: ', albumId, showPlayer);

  const handleNavigate = () => {
    navigate(`/album-info/${albumId}`);
  };

  return (
    <div className='event-card'>
      <img className='event-image' src={image} alt='album or song cover' />
      <div className='event-details'>
        <div className='row-links'>
          <button className='icon-buttons'>
            <BookmarkAddedIcon />
            save album
          </button>
          <button className='icon-buttons' onClick={() => handleNavigate()}>
            <InfoIcon />
            get album info
          </button>
          <button
            className='icon-buttons'
            onClick={() => toggleShowPlayer(!!!showPlayer)}
          >
            {showPlayer ? (
              <>
                <StopCircleIcon /> hide player
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
          style={{ marginBottom: '1rem', color: 'black' }}
          onEnded={() => toggleShowPlayer(false)}
        />
      ) : (
        <div style={{ height: '4.8rem' }}></div>
      )}
    </div>
  );
};

export default MusicCard;
