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
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';

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
  is_feed,
  post,
  post_id,
  postFrom,
  feed,
  setFeed,
}) => {
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
  const removePost = async () => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/posts/${post_id}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      let newFeed = feed.filter((post) => post.id != post_id);
      setFeed(newFeed);
    } catch (e) {
      console.log(e);
    }
  };

  if (is_feed) {
    return (
      <div className='event-card' style={{ width: '30rem' }}>
        <div style={{ padding: '.5rem' }}>
          {user.id == postFrom.id ? (
            <div
              onClick={() => {
                removePost();
              }}
            >
              {' '}
              <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
                delete post
              </span>
              <CloseIcon style={{ color: 'red', float: 'right' }} />
            </div>
          ) : (
            <div style={{ height: '1rem' }}></div>
          )}
        </div>
        <div
          style={{
            padding: '1rem',
            display: 'flex',
            verticalAlign: 'text-top',
            fontSize: '1rem',
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,

              marginBottom: '1rem',
            }}
          />
          <div style={{ verticleAlign: 'middle', marginLeft: '1rem' }}>
            {postFrom.first_name} {postFrom.last_name}
          </div>
        </div>
        <div style={{ display: 'flex', padding: '1rem' }}>{post}</div>
        <img
          style={{ width: '100%' }}
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
            <button
              className='icon-buttons'
              onClick={() => saveAlbumToFavorites()}
            >
              <BookmarkAddedIcon />
              save album
            </button>

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
  } else {
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
  }
};

export default MusicCard;
