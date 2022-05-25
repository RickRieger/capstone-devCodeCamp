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

      setAlbumInfo(result);
    } catch (e) {
      console.log(e.message);
    }
  };
  if (!albumInfo) {
    return (
      <div
        style={{ marginTop: '10rem', display: 'flex', flexWrap: 'wrap' }}
      ></div>
    );
  } else {
    return (
      <div
        className='container-main'
        style={{ marginTop: '10rem', display: 'flex', flexWrap: 'wrap' }}
      >
        <div
          className='info'
          style={{
            position: 'fixed',
            top: '9rem',
            left: '50%',
            transform: 'translate(-50%, 0)',
            fontSize: '2rem',
            textAlign: 'left',
          }}
        >
          <span className='album-info'> TITLE: </span>
          <span className='album-info-info'> {albumInfo.title} </span>
          <br />
          <span className='album-info'> ARTIST: </span>
          <span className='album-info-info'> {albumInfo.artist.name} </span>
          <br />
          <span className='album-info'> GENRE: </span>
          <span className='album-info-info'>
            {' '}
            {albumInfo.genres.data[0].name}{' '}
          </span>

          <br />
          <span className='album-info'> RECORD LABEL: </span>
          <span className='album-info-info'> {albumInfo.label} </span>

          <br />
          <span className='album-info'> RELEASE DATE: </span>
          <span className='album-info-info'> {albumInfo.release_date} </span>
        </div>
        <div
          className='album-pic'
          style={{
            position: 'fixed',
            top: '20rem',
            left: '20%',
            transform: 'translate(-70%, 0)',
          }}
        >
          <img src={albumInfo.cover_big} alt='' />
        </div>
        <div
          className='artist-pic'
          style={{
            position: 'fixed',
            top: '20rem',
            right: '20%',
            transform: 'translate(70%, 0)',
          }}
        >
          <img src={albumInfo.artist.picture_big} alt='' />
        </div>
        <TableForTracks albumInfo={albumInfo} />
      </div>
    );
  }
};

export default AlbumInfo;
