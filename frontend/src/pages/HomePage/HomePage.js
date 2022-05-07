import React from 'react';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import './Home.css';
import axios from 'axios';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import InfoIcon from '@mui/icons-material/Info';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ReactAudioPlayer from 'react-audio-player';
import MusicCard from '../../components/MusicCard/MusicCard';
const HomePage = () => {
  const [user, token] = useAuth();
  const [musicCollection, setMusicCollection] = useState(null);

  useEffect(() => {
    getAllEventsAtRandom();
  }, [token]);

  const getAllEventsAtRandom = async () => {
    const options = {
      method: 'GET',
      url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
      params: { q: 'eminem' },
      headers: {
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        'X-RapidAPI-Key': '405cf8c179msh5f4d383fbbc07dcp1f824fjsnccd940673b12',
      },
    };
    try {
      let result = await axios.request(options);
      setMusicCollection(result.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  console.log(musicCollection);

  if (!musicCollection) {
    return '';
  } else {
    return (
      <div className='container'>
        {/* <h1>Home Page for {user.username}!</h1> */}
        {musicCollection.data.map((result) => {
          return (
            <MusicCard
              image={result.album.cover_big}
              sampleTrack={result.preview}
            />
          );
        })}
      </div>
    );
  }
};

export default HomePage;
