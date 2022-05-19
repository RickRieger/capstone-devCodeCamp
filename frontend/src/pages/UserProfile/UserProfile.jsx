import React, { useState, useEffect, useContext } from 'react';
import useAuth from '../../hooks/useAuth';
import AuthContext from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import Friend from '../../components/Friend/Friend';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import './UserProfile.css';
const UserProfile = () => {
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState(null);
  const [pendingFriendRequests, setPendingFriendRequests] = useState(null);
  const [loggedInUsersFriends, setLoggedInUsersFriends] = useState(null);
  const [profileFriends, setProfileFriends] = useState(null);
  const [user, token] = useAuth();
  const [avatarImage, setAvatarImage] = useState('');
  const params = useParams();
  const { searchResults, setSearchResults } = useContext(AuthContext);
  useEffect(() => {
    getAllLoggedInUsersFriends();
    getUserInfo();
    getAllFriendsOfProfile();
    getAvatarImage();
    if (params.id == user.id) {
      getPendingFriendRequests();
    }
  }, [params]);

  const getUserInfo = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/friends/user-profile/${params.id}`,
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
  const getPendingFriendRequests = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/friends/pending`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(res.data);
      setPendingFriendRequests(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllFriendsOfProfile = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/friends/${params.id}`,
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

  const getAvatarImage = async () => {
    try {
      let res = await axios.get('https://randomuser.me/api/');
      setAvatarImage(res.data.results[0].picture.large);
    } catch (e) {
      console.log(e);
    }
  };
  const getAllLoggedInUsersFriends = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/friends/${user.id}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setLoggedInUsersFriends(res.data);
    } catch (e) {
      console.log(e.data);
    }
  };
  let isFriend;
  if (profileFriends && loggedInUsersFriends) {
    isFriend = loggedInUsersFriends.some((f) => f.id === profileInfo.id);
  }
  console.log(profileFriends);

  const requestFriendship = async () => {
    try {
      console.log('*************', token, params.id);
      const res = await axios.post(
        `http://127.0.0.1:8000/api/friends/${params.id}`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      toast('\ud83d\ude01 Request sent!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleUnfriend = async () => {
    let bool = window.confirm(`Are you sure you want to delete this friend?`);
    if (!bool) {
      return;
    }
    try {
      let res = await axios.delete(
        `http://127.0.0.1:8000/api/friends/${profileInfo.id}`,

        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      navigate(`/profile/${params.id}`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className='profile-container'>
      {searchResults && (
        <>
          <h2 className='search-results-title'>
            Search Results (choose to view profile){'   '}
            <Button
              variant='outlined'
              className='clear-search-button'
              onClick={() => setSearchResults(null)}
            >
              Clear Search
            </Button>
          </h2>
          <div className='search-results'>
            {searchResults &&
              searchResults.map((p) => {
                return (
                  <button
                    key={p.id}
                    onClick={() => navigate(`/my-profile/${p.id}`)}
                  >{`${p.first_name} ${' '} ${p.last_name}`}</button>
                );
              })}
          </div>
        </>
      )}
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
              onClick={() => handleUnfriend()}
            >
              unfriend
            </Button>
          ) : (
            <Button
              style={{ position: 'absolute', right: '0', marginTop: '10px' }}
              variant='contained'
              onClick={() => requestFriendship()}
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
                getAllFriendsOfProfile={getAllFriendsOfProfile}
              />
            );
          })}
      </div>
      <h1
        style={{
          textAlign: 'center',
          marginTop: '100px',
          marginBottom: '10px',
        }}
      >
        {profileInfo && user.id === profileInfo.id ? 'Friend-Requests' : ''}
      </h1>
      {
        <div className='friends-container'>
          {pendingFriendRequests &&
            pendingFriendRequests.map((request) => {
              return (
                <Friend
                  request={request}
                  isRequests={true}
                  friend={request.requestor}
                  friends={profileFriends}
                  key={request.requestor.id}
                  getAllFriendsOfProfile={getAllFriendsOfProfile}
                  getPendingFriendRequests={getPendingFriendRequests}
                />
              );
            })}
        </div>
      }
    </div>
  );
};

export default UserProfile;
