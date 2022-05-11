import React from 'react';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import useAuth from '../../hooks/useAuth';
import './Home.css';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import MusicCard from '../../components/MusicCard/MusicCard';
const HomePage = ({ upDateSearch, setUpDateSearch }) => {
  const [token] = useAuth();
  let [musicCollection, setMusicCollection] = useState(null);
  const [index, setIndex] = useState(0);
  const [queryString, setQueryString] = useState(null);
  const { user } = useContext(AuthContext);
  console.log('*****', user);

  useEffect(() => {
    if (upDateSearch) {
      setQueryString(upDateSearch);
      getAllEventsAtRandom();
    }
    return () => {};
  }, [token, upDateSearch, queryString]);

  const toggleShowPlayer = (index, showPlayer) => {
    const newMusicCollection = musicCollection.map((album, albumIndex) => {
      if (albumIndex === index) {
        return { ...album, showPlayer };
      }
      return { ...album, showPlayer: false };
    });
    setMusicCollection(newMusicCollection);
  };

  const getAllEventsAtRandom = async () => {
    const options = {
      method: 'GET',
      url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
      params: { q: queryString, index: index },
      headers: {
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      },
    };
    try {
      let result = await axios.request(options);
      result = result.data;
      setMusicCollection(result.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  console.log(musicCollection);
  const override = 'display: block; margin: 0 auto;border-color: red;size:5';

  if (!musicCollection || musicCollection.error) {
    return (
      <div className='container-placeholder'>
        <div style={{ marginTop: '20rem' }}>
          {' '}
          <img
            src='/clipart1638227.png'
            alt='clipart'
            style={{ width: '10rem', height: '10rem' }}
          />
          <span style={{ fontSize: '2rem' }}>Search something...</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className='container'>
        <h1>Home Page for {user.username}!</h1>
        {musicCollection.map((result, index) => {
          return (
            <MusicCard
              image={
                result.album.cover_big
                  ? result.album.cover_big
                  : 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'
              }
              sampleTrack={result.preview}
              albumTitle={result.album.title}
              artistName={result.artist.name}
              key={result.id}
              trackTitle={result.title}
              albumId={result.album.id}
              showPlayer={result.showPlayer}
              toggleShowPlayer={(valueToSet) => {
                toggleShowPlayer(index, valueToSet);
              }}
              setUpDateSearch={(updatedQuery) => {
                setUpDateSearch(updatedQuery);
              }}
            />
          );
        })}
      </div>
    );
  }
};

export default HomePage;
