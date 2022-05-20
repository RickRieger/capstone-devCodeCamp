import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MusicCard from '../../components/MusicCard/MusicCard';
import useAuth from '../../hooks/useAuth';
import Avatar from '@mui/material/Avatar';
import { CardHeader } from '@mui/material';
import AuthContext from '../../context/AuthContext';
import './Home.css';

const HomePage = () => {
  const auth = useAuth();
  const [user, token] = auth;
  const [friends, setFriends] = useState(null);
  const navigate = useNavigate();
  const { feed, setFeed, getAllPostsFromFriends } = useContext(AuthContext);
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

  const getAllFriends = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/friends/${user.id}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setFriends(res.data);
    } catch (e) {
      console.log(e.data);
    }
  };

  if (feed) {
    return (
      <div className='container-main'>
        <div className='container-cards'>
          {feed.map((result, index) => {
            return (
              <MusicCard
                getAllPostsFromFriends={getAllPostsFromFriends}
                comments={result.comments}
                likes={result.likes}
                disLikes={result.disLikes}
                created_on={result.created_on}
                feed={feed}
                setFeed={setFeed}
                postFrom={result.author}
                is_feed={true}
                person_who_posted={result.author}
                post={result.body}
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
                  <div
                    className='friends'
                    key={friend.id}
                    onClick={() => {
                      navigate(`/profile/${friend.id}`);
                    }}
                  >
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
