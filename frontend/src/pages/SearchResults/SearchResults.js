import React from 'react';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import useAuth from '../../hooks/useAuth';
import './SearchResults.css';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import MusicCard from '../../components/MusicCard/MusicCard';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

const SearchResults = ({ upDateSearch, setUpDateSearch }) => {
  const [token] = useAuth();
  const [index, setIndex] = useState(0);
  const [queryString, setQueryString] = useState(null);
  const { user, getAllResultsFromQuery, musicCollection, setMusicCollection } =
    useContext(AuthContext);
  const [query, setQuery] = useState('');
  const auth = useAuth();

  useEffect(() => {}, [musicCollection]);

  const toggleShowPlayer = (index, showPlayer) => {
    const newMusicCollection = musicCollection.map((album, albumIndex) => {
      if (albumIndex === index) {
        return { ...album, showPlayer };
      }
      return { ...album, showPlayer: false };
    });
    setMusicCollection(newMusicCollection);
  };

  // const getAllResultsFromQuery = async () => {
  //   console.log('okookok');
  //   const options = {
  //     method: 'GET',
  //     url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
  //     params: { q: query, index: index },
  //     headers: {
  //       'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
  //       'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
  //     },
  //   };
  //   try {
  //     let result = await axios.request(options);
  //     result = result.data;
  //     setMusicCollection(result.data);
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };

  const override = 'display: block; margin: 0 auto;border-color: red;size:5';

  if (!musicCollection || musicCollection.error) {
    return (
      <div className='container-placeholder'>
        <div style={{ marginTop: '20rem' }}>
          {/* https://www.pngkey.com/ */}
          <img
            src='/clipart1638227.png'
            alt='clipart'
            style={{ width: '10rem', height: '10rem' }}
          />
          <span style={{ fontSize: '2rem' }}>
            {' '}
            <TextField
              id='standard-basic'
              label={`Search something ${user.username}...`}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  getAllResultsFromQuery(query, index);
                }
              }}
              variant='standard'
              sx={{ width: '100%', mt: 5 }}
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
            <Button
              variant='contained'
              onClick={() => {
                getAllResultsFromQuery(query, index);
              }}
              style={{ marginTop: '4rem' }}
            >
              Search
            </Button>
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className='container'>
        {musicCollection.map((result, index) => {
          return (
            <MusicCard
              album_image={
                result.album.cover_big
                  ? result.album.cover_big
                  : 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'
              }
              track_id={result.id}
              preview_track={result.preview}
              album_title={result.album.title}
              artist_name={result.artist.name}
              key={result.id}
              track_title={result.title}
              album_id={result.album.id}
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

export default SearchResults;
