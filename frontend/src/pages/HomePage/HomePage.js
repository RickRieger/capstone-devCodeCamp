import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MusicCard from '../../components/MusicCard/MusicCard';
import useAuth from '../../hooks/useAuth';
import Avatar from '@mui/material/Avatar';
import { CardHeader } from '@mui/material';

import { Tooltip } from '@mui/material';
import './Home.css';
const HomePage = () => {
  const [feed, setFeed] = useState(null);
  const [friends, setFriends] = useState(null);
  const auth = useAuth();
  const [user, token] = auth;
  useEffect(() => {
    getAllPostsFromFriends();
    getAllFriends();
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
      setFeed(res.data);
    } catch (e) {
      console.log(e.data);
    }
  };
  const getAllFriends = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/friends/', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setFriends(res.data);
    } catch (e) {
      console.log(e.data);
    }
  };

  if (feed) {
    return (
      <div className='container-main'>
        <div className='container-cards'>
          {' '}
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
                key={result.id}
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
        <div className='container-friends'>
          <div>
            <h1 style={{ fontSize: '3rem', marginBottom: '3rem' }}>Friends</h1>
            {friends &&
              friends.map((friend) => {
                return (
                  <div className='friends' key={friend.id}>
                    {' '}
                    <CardHeader
                      avatar={
                        <Avatar
                          alt={friend.first_name + ' ' + friend.last_name}
                          src='/static/images/avatar/1.jpg'
                          sx={{ backgroundColor: 'aqua', color: 'black' }}
                        />
                      }
                      title={friend.first_name + ' ' + friend.last_name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        {/* <h1>Home Page for {user.username}!</h1> */}
      </div>
    );
  } else {
    return <div>HomePage</div>;
  }
};

export default HomePage;
