import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TableForTracks from '../../components/TableForTracks/TableForTracks';
const AlbumInfo = () => {
  const [albumInfo, setAlbumInfo] = useState(null);
  const [tracks, setTracks] = useState(null);
  const params = useParams();
  useEffect(() => {
    getAllAlbumInfo();
  }, []);

  const getAllAlbumInfo = async () => {
    const options = {
      method: 'GET',
      url: `https://deezerdevs-deezer.p.rapidapi.com/album/${params.albumId}`,
      headers: {
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      },
    };
    try {
      let result = await axios.request(options);
      result = result.data;
      // console.log(result);
      // console.log(result.data);
      // console.log(result.tracks.data);
      // console.log(result.data.tracks);
      setAlbumInfo(result);
      // setTracks(result.tracks.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  console.log('******ALBUM-INFO:', albumInfo);
  // console.log('******TRACKS-INFO:', tracks);
  if (!albumInfo) {
    return (
      <div style={{ marginTop: '10rem', display: 'flex', flexWrap: 'wrap' }}>
        Nothing to display
      </div>
    );
  } else {
    return (
      <div style={{ marginTop: '10rem', display: 'flex', flexWrap: 'wrap' }}>
        <div className='album-pic'>
          <img src={albumInfo.cover_big} alt='' />
        </div>
        <div className='artist-pic'>
          <img src={albumInfo.artist.picture_big} alt='' />
        </div>
        <div className='info'>
          genre:{' '}
          {albumInfo.genres.data.map((genre) => {
            return genre.name;
          })}
          <br />
          recordLable:{albumInfo.label}
          <br />
          releaseDate:{albumInfo.release_date}
          <br />
          title:{albumInfo.title}
        </div>
        <TableForTracks
          albumInfo={albumInfo}
          // tracks={tracks}
          // setTracks={setTracks}
        />
      </div>
    );
  }
};

export default AlbumInfo;
