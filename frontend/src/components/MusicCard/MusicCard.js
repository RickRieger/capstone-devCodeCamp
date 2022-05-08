import React, { useState, useEffect, useRef } from 'react';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import InfoIcon from '@mui/icons-material/Info';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import ReactAudioPlayer from 'react-audio-player';

const MusicCard = ({ image, sampleTrack, albumId }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      setShowPlayer(false);
    });
  }, []);

  // showAlbumInfo = (e) => {};

  return (
    <div className='event-card'>
      <img className='event-image' src={image} alt='album or song cover' />
      <div className='event-details'>
        <div className='row-links'>
          <button className='icon-buttons'>
            <BookmarkAddedIcon />
            save album
          </button>
          <button
            className='icon-buttons'
            // onClick={(e) => {
            //   showAlbumInfo(e);
            // }}
          >
            <InfoIcon />
            get album info
          </button>
          <button
            className='icon-buttons'
            onClick={() => setShowPlayer(!showPlayer)}
          >
            {showPlayer ? <StopCircleIcon /> : <PlayCircleIcon />}

            {showPlayer ? `hide player` : 'play sample'}
          </button>
        </div>
      </div>
      {showPlayer ? (
        <ReactAudioPlayer
          src={sampleTrack}
          autoPlay
          controls
          style={{ marginBottom: '1rem', color: 'black' }}
          onEnded={() => setShowPlayer(false)}
        />
      ) : (
        <div style={{ height: '4.8rem' }}></div>
      )}
    </div>
  );
};

export default MusicCard;
