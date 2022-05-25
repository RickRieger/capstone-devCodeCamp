import React, { useState, useEffect, useContext, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { createApi } from 'unsplash-js';
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

//FOR RANDOM PHOTO "UPSPLASH API"
const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: 'vkdIPTn4xVNPo20E40Sxv8rUjANBRy08fQfFk54PNoc',
});

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
  const [data, setPhotosResponse] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoAtt, setPhotoAtt] = useState(null);

  const [image, setImage] = useState(null);
  useEffect(() => {
    api.search
      .getPhotos({
        query: 'random',
        orientation: 'landscape',
        page: 1,
        perPage: 20,
      })
      .then((result) => {
        setPhoto(result.response.results[0].urls.regular);
        setPhotosResponse(result.response.results);
        let index = Math.floor(Math.random() * result.response.results.length);
        setPhoto(result.response.results[index].urls.regular);
        setPhotoAtt(result.response.results[index].user);
      })
      .catch(() => {
        console.log('something went wrong!');
      });

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
  //####################CHECKS TO SEE IF FRIEND###########################
  let isFriend;
  if (profileFriends && loggedInUsersFriends) {
    isFriend = loggedInUsersFriends.some((f) => f.id === profileInfo.id);
  }

  const requestFriendship = async () => {
    try {
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
      toast('\ud83d\ude01 Request already sent!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleUnfriend = async (id) => {
    let bool = window.confirm(`Are you sure you want to delete this friend?`);
    if (!bool) {
      return;
    }

    try {
      let res = await axios.delete(
        `http://127.0.0.1:8000/api/friends/${id}`,

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
  const handleDeleteRequest = async (id) => {
    let bool = window.confirm(
      `Are you sure you want to delete this friend request?`
    );
    if (!bool) {
      return;
    }
    try {
      let res = await axios.delete(
        `http://127.0.0.1:8000/api/friends/${id}`,

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
  const handleFriendRequest = async (request, deleteRequest = false) => {
    if (deleteRequest) {
      let bool = window.confirm(
        `Are you sure you want to delete this friend request homie?`
      );
      if (!bool) {
        return;
      }
      try {
        let res = await axios.delete(
          `http://127.0.0.1:8000/api/friends/${request.requestor.id}`,

          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );
        let filteredRequests = pendingFriendRequests.filter(
          (req) => req.id !== request.id
        );
        setPendingFriendRequests(filteredRequests);
      } catch (e) {
        console.log(e);
      }
    } else {
      let bool = window.confirm(
        `Are you sure you want to accept this friend request?`
      );
      if (!bool) {
        return;
      }
      try {
        let res = await axios.patch(
          `http://127.0.0.1:8000/api/friends/${request.id}`,
          {
            status: 'Accepted',
          },

          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );
        let filteredRequests = pendingFriendRequests.filter(
          (req) => req.id !== request.id
        );
        setPendingFriendRequests(filteredRequests);
        setProfileFriends([...profileFriends, request.requestor]);
      } catch (e) {
        console.log(e);
      }
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
                    onClick={() => navigate(`/profile/${p.id}`)}
                  >{`${p.first_name} ${' '} ${p.last_name}`}</button>
                );
              })}
          </div>
        </>
      )}

      <div className='center-profile-container'>
        <div className='friends-profile-page'>
          <h1>
            {profileInfo && user.id === profileInfo.id ? 'Friend-Requests' : ''}
          </h1>
          {profileInfo && user.id === profileInfo.id && (
            <>
              {pendingFriendRequests &&
                pendingFriendRequests.map((request) => {
                  console.log(request);
                  return (
                    <div key={request.id}>
                      <Friend
                        request={request}
                        isRequests={true}
                        friend={request.requestor}
                        friends={profileFriends}
                        getAllFriendsOfProfile={getAllFriendsOfProfile}
                        getPendingFriendRequests={getPendingFriendRequests}
                        handleUnfriend={handleUnfriend}
                      />
                      <div className='btn-group btn-accept'>
                        <button onClick={() => handleFriendRequest(request)}>
                          Accept
                        </button>
                        <button
                          className='btn-delete'
                          onClick={() => handleFriendRequest(request, true)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
            </>
          )}
        </div>

        <div className='profile-image-container'>
          <div className='profile-name-button'>
            <span>
              <h1>
                {profileInfo && user.id === profileInfo.id
                  ? 'My profile'
                  : profileInfo &&
                    profileInfo.first_name + profileInfo.last_name}
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
          {photo && <img src={photo} alt='background image' />}
          {photoAtt && (
            <a
              className='credit'
              target='_blank'
              href={`https://unsplash.com/@${photoAtt.username}`}
            >
              {`Photo by: ${photoAtt.name}`}
            </a>
          )}

          {/* {data && (
            <div className='feed'>
              <ul className='columnUl'>
                {data.response.results.map((photo) => (
                  <li key={photo.id} className='li'>
                    <PhotoComp photo={photo} />
                  </li>
                ))}
              </ul>
            </div>
          )} */}

          <div className='avatar-bg'>
            <Avatar
              id='user-profile-avatar'
              alt='Remy Sharp'
              src={avatarImage}
            />
          </div>
          {profileInfo && user.id === profileInfo.id ? (
            <div></div>
          ) : (
            <div className='container-userprofile-buttons'>
              {isFriend ? (
                <Button
                  style={{
                    position: 'absolute',
                    right: '0',
                    marginTop: '10px',
                  }}
                  variant='contained'
                  onClick={() => handleUnfriend(profileInfo.id)}
                >
                  unfriend
                </Button>
              ) : (
                <Button
                  style={{
                    position: 'absolute',
                    right: '0',
                    marginTop: '10px',
                  }}
                  variant='contained'
                  onClick={() => requestFriendship()}
                >
                  addfriend
                </Button>
              )}
            </div>
          )}
        </div>

        <div className='friends-profile-page'>
          <h1>
            {profileInfo && user.id === profileInfo.id
              ? 'My Friends'
              : `${profileInfo && profileInfo.first_name}'s Friends`}
          </h1>
          {profileFriends &&
            profileFriends.map((friend) => {
              console.log(friend);
              return (
                <div key={friend.id}>
                  <Friend
                    friend={friend}
                    friends={profileFriends}
                    getAllFriendsOfProfile={getAllFriendsOfProfile}
                  />
                  {user.id === profileInfo.id && (
                    <div className='btn-group btn-delete'>
                      <button onClick={() => handleDeleteRequest(friend.id)}>
                        Unfriend
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
