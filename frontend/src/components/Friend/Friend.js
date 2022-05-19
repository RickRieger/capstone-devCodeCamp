import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Avatar } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CardHeader } from '@mui/material';
import axios from 'axios';
const Friend = ({
  friend,
  friends,
  isRequests,
  request,
  getAllFriendsOfProfile,
  getPendingFriendRequests,
}) => {
  const [canShowUnfriend, setCanShowUnfriend] = useState(false);
  const [user, token] = useAuth();

  const handleFriendRequest = async (friend) => {
    setCanShowUnfriend(false);

    let bool = window.confirm(
      `Are you sure you want to accept this friend request?`
    );
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
      getPendingFriendRequests();
      getAllFriendsOfProfile();
    } catch (e) {
      console.log(e);
    }
  };
  const handleUnfriend = async () => {
    console.log(request);
    setCanShowUnfriend(false);
    let bool = window.confirm(`Are you sure you want to delete this friend?`);
    if (!bool) {
      return;
    }
    try {
      let res = await axios.delete(
        `http://127.0.0.1:8000/api/friends/${friend.id}`,

        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      getAllFriendsOfProfile();
    } catch (e) {
      console.log(e);
    }
  };
  console.log(friends);
  return (
    <div className='friends' key={friend.id}>
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
      <div className='more-icon'>
        <MoreHorizIcon onClick={() => setCanShowUnfriend(!canShowUnfriend)} />
        {canShowUnfriend && (
          <div
            className='dropdown'
            onClick={
              isRequests
                ? () => handleFriendRequest(friend)
                : () => handleUnfriend()
            }
          >
            {isRequests ? 'accept?' : 'un-friend?'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friend;
