import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import TableForSavedTracks from '../../components/TableForSavedTracks/TableForSavedTracks';
import MusicCard from '../../components/MusicCard/MusicCard';
import { circularProgressClasses } from '@mui/material';
const SavedMusic = () => {
  const auth = useAuth();
  const [user, token] = auth;
  const [tracks, setTracks] = useState(null);
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    getAllTracks();
    getAllAlbums();
  }, []);

  const getAllTracks = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/tracks/', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setTracks(res.data.reverse());
    } catch (e) {
      console.log(e.data);
    }
  };
  const getAllAlbums = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/albums/', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setAlbums(res.data.reverse());
    } catch (e) {
      console.log(e.data);
    }
  };
  const toggleShowPlayer = (index, showPlayer) => {
    const newAlbumCollection = albums.map((album, albumIndex) => {
      if (albumIndex === index) {
        return { ...album, showPlayer };
      }
      return { ...album, showPlayer: false };
    });
    setAlbums(newAlbumCollection);
  };
  if (tracks && albums) {
    return (
      <div style={{ marginTop: '400px' }}>
        {<TableForSavedTracks savedTracks={tracks} />}
        {albums.map((album, index) => {
          return (
            <MusicCard
              album_image={
                album.image
                  ? album.image
                  : 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'
              }
              preview_track={album.preview}
              album_title={album.title}
              artist_name={album.artist}
              key={album.album_id}
              track_title={album.preview_title}
              album_id={album.id}
              showPlayer={album.showPlayer}
              toggleShowPlayer={(valueToSet) => {
                toggleShowPlayer(index, valueToSet);
              }}
              savedAlbums={true}
              preview_title={album.preview_title}
              albums={albums}
              setAlbums={setAlbums}
            />
          );
        })}
      </div>
    );
  } else {
    return <div>no tracks</div>;
  }
};

export default SavedMusic;
