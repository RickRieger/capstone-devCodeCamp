import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MusicCard from '../../components/MusicCard/MusicCard';
import useAuth from '../../hooks/useAuth';
const HomePage = () => {
  const [feed, setFeed] = useState(null);
  const auth = useAuth();
  const [user, token] = auth;
  useEffect(() => {
    getAllPostsFromFriends();
  }, []);
  const toggleShowPlayer = (index, showPlayer) => {
    const newFeed = feed.map((feed, feedIndex) => {
      if (feedIndex === index) {
        return { ...feed, showPlayer };
      }
      return { ...feed, showPlayer: false };
    });
    setFeed(newFeed);
  };

  const getAllPostsFromFriends = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/posts/', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(res.data);
      setFeed(res.data);
    } catch (e) {
      console.log(e.data);
    }
  };

  if (feed) {
    return (
      <div className='container'>
        {/* <h1>Home Page for {user.username}!</h1> */}
        {feed.map((result, index) => {
          return (
            <MusicCard
              feed={feed}
              setFeed={setFeed}
              postFrom={result.user}
              is_feed={true}
              person_who_posted={result.user}
              post={result.post}
              post_id={result.id}
              album_image={
                result.album_image
                  ? result.album_image
                  : 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'
              }
              track_id={result.track_id}
              preview_track={result.preview_track}
              album_title={result.album_title}
              artist_name={result.artist_name}
              key={index}
              track_title={result.track_title}
              album_id={result.album_id}
              showPlayer={result.showPlayer}
              toggleShowPlayer={(valueToSet) => {
                toggleShowPlayer(index, valueToSet);
              }}
            />
          );
        })}
      </div>
    );
  } else {
    return <div>HomePage</div>;
  }
};

export default HomePage;
