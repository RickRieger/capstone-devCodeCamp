import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
import { CardHeader } from '@mui/material';
import moment from 'moment';
import Comments from '../../components/Comments/Comments';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

const MusicCard = ({
  setUpdate,
  update,
  album_image,
  album_id,
  album_title,
  artist_name,
  track_title,
  showPlayer,
  toggleShowPlayer,
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
  created_on,
  setFeed,
  comments,
  likes,
  disLikes,
  getAllPostsFromFriends,
}) => {
  const album = {
    album_id: album_id,
    title: album_title,
    artist: artist_name,
    image: album_image,
    preview: preview_track,
    preview_title: track_title,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const [user, token] = auth;
  const saveAlbumToFavorites = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/albums/', album, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      toast('\ud83d\ude01 Album saved!', {
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
      toast('\ud83d\ude01Album already saved!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(e.response.data.album_id[0]);
    }
  };
  const removeAlbumFromFavorites = async () => {
    console.log(album_id);
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/albums/${album_id}`,

        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      let newAlbums = albums.filter((album) => album.id !== album_id);
      setAlbums(newAlbums);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const removePost = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/posts/${post_id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      let newFeed = feed.filter((post) => post.id !== post_id);
      setFeed(newFeed);
    } catch (e) {
      console.log(e);
    }
  };
  const handleLike = async (likeOrDisLike) => {
    try {
      await axios.get(
        `http://127.0.0.1:8000/api/posts/${likeOrDisLike}/${post_id}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      getAllPostsFromFriends();
    } catch (e) {
      toast('\ud83d\ude01Already Liked or disLiked this post!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (is_feed) {
    return (
      <div className='feed-card'>
        <div style={{ padding: '.5rem' }}>
          <span>
            <div
              style={{
                visibility: user.id === postFrom.id ? 'visible' : 'hidden',
              }}
              onClick={() => {
                removePost();
              }}
            >
              <span className={'delete-text'}>delete post</span>
              <div className='close-icon'>
                <CloseIcon className={'close-icon'} />
              </div>
            </div>

            <CardHeader
              titleTypographyProps={{ variant: 'h5' }}
              avatar={
                <Avatar
                  alt={postFrom.first_name + ' ' + postFrom.last_name}
                  src='/static/images/avatar/1.jpg'
                  sx={{
                    backgroundColor: 'aqua',
                    color: 'black',
                  }}
                  onClick={() => navigate(`/profile/${postFrom.id}`)}
                />
              }
              title={postFrom.first_name + ' ' + postFrom.last_name}
            />
          </span>
        </div>

        <div style={{ display: 'flex', padding: '1rem', fontSize: '1.5rem' }}>
          {post}
        </div>
        <img src={album_image} alt='album or song cover' />
        <div className='event-details'>
          <div className='like-container'>
            <div className='time-date'>
              <div style={{ display: 'flex', color: 'green' }}>Posted: </div>
              {moment(created_on).format('MMMM Do YYYY, h:mm:ss a')}
            </div>
            <div>
              <ThumbUpOutlinedIcon onClick={() => handleLike('like')} />
              <span style={{ marginLeft: '10px', verticalAlign: 'super' }}>
                {likes.length}
              </span>
              <ThumbDownAltOutlinedIcon
                onClick={() => handleLike('disLike')}
                style={{ marginLeft: '20px' }}
              />
              <span
                style={{
                  marginLeft: '10px',
                  verticalAlign: 'super',
                  marginRight: '20px',
                }}
              >
                {disLikes.length}
              </span>
            </div>
          </div>

          <div className='row-links'>
            <button
              className='icon-buttons'
              onClick={() => saveAlbumToFavorites()}
            >
              <BookmarkAddedIcon />
              save album
            </button>

            <button
              className='icon-buttons'
              onClick={() => navigate(`/album-info/${album_id}`)}
            >
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
          <p
            style={{
              fontSize: '1rem',
              textAlign: 'center',
              visibility: showPlayer ? 'visible' : 'hidden',
            }}
          >
            {`NowPlaying: "${track_title}"`}
          </p>

          <Comments
            post_id={post_id}
            comments={comments}
            getAllPostsFromFriends={getAllPostsFromFriends}
          />
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
          closeModal={handleClose}
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

            <button
              className='icon-buttons'
              onClick={() => navigate(`/album-info/${album_id}`)}
            >
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
          update={update}
          setUpdate={setUpdate}
          album_id={album_id}
          track_id={track_id}
          album_title={album_title}
          track_title={track_title}
          artist_name={artist_name}
          album_image={album_image}
          preview_track={preview_track}
          closeModal={handleClose}
          open={open}
        />
      </div>
    );
  }
};

export default MusicCard;
