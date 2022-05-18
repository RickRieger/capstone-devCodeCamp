import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import Friend from '../../components/Friend/Friend';
import Button from '@mui/material/Button';
import './UserProfile.css';
const UserProfile = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [loggedInUsersFriendsList, setLoggedInUsersFriendsList] =
    useState(null);
  const [profileFriends, setProfileFriends] = useState(null);
  const [user, token] = useAuth();
  const [avatarImage, setAvatarImage] = useState('');
  const params = useParams();

  useEffect(() => {
    getUserInfo();
    getAllFriendsOfProfile();
    getAvatarImage();
    getAllFriends();
  }, [params]);

  const getUserInfo = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/friends/user-profile/${params.pk}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      setProfileInfo(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllFriendsOfProfile = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/friends/${params.pk}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setProfileFriends(res.data);
    } catch (e) {
      console.log(e);
    }
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
      setLoggedInUsersFriendsList(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getAvatarImage = async () => {
    try {
      let res = await axios.get('https://randomuser.me/api/');
      setAvatarImage(res.data.results[0].picture.large);
    } catch (e) {
      console.log(e);
    }
  };
  let isFriend;
  if (loggedInUsersFriendsList) {
    isFriend = loggedInUsersFriendsList.some((f) => f.id === profileInfo.id);
  }

  return (
    <div className='profile-container'>
      <div className='profile-name-button'>
        <span>
          <h1>
            {profileInfo && user.id === profileInfo.id
              ? 'My profile'
              : profileInfo && profileInfo.first_name + profileInfo.last_name}
          </h1>
        </span>
        <span>
          {profileInfo && user.id === profileInfo.id ? (
            ''
          ) : (
            <div>
              {isFriend ? (
                <span>
                  {' '}
                  <CheckIcon />
                  friends
                </span>
              ) : (
                <span>not friends</span>
              )}
            </div>
          )}
        </span>
      </div>

      <div className='profile-image-container'>
        <img src='https://source.unsplash.com/random' alt='' />
        <div className='avatar-bg'>
          <Avatar id='user-profile-avatar' alt='Remy Sharp' src={avatarImage} />
        </div>
      </div>

      {profileInfo && user.id === profileInfo.id ? (
        <div></div>
      ) : (
        <div>
          {isFriend ? (
            <Button
              style={{ position: 'absolute', right: '0', marginTop: '10px' }}
              variant='contained'
            >
              unfriend
            </Button>
          ) : (
            <Button
              style={{ position: 'absolute', right: '0', marginTop: '10px' }}
              variant='contained'
            >
              addfriend
            </Button>
          )}
        </div>
      )}

      <h1 style={{ textAlign: 'center', marginTop: '100px' }}>
        {profileInfo && user.id === profileInfo.id
          ? 'My Friends'
          : `${profileInfo && profileInfo.first_name}'s Friends`}
      </h1>
      <div className='friends-container'>
        {profileFriends &&
          profileFriends.map((friend) => {
            return (
              <Friend
                friend={friend}
                friends={profileFriends}
                key={friend.id}
                setFriends={setProfileFriends}
              />
            );
          })}
      </div>
    </div>
  );
};

export default UserProfile;
