import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Avatar } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CardHeader } from '@mui/material';
import axios from 'axios';
const Friend = ({ friend, setFriends, friends }) => {
  const [canShowUnfriend, setCanShowUnfriend] = useState(false);
  const [user, token] = useAuth();
  const handleUnfriend = async (friend) => {
    setCanShowUnfriend(false);
    let bool = window.confirm(
      `Are you sure you want to un-friend ${friend.first_name}?`
    );
    if (bool) {
      try {
        let res = await axios.delete(
          `http://127.0.0.1:8000/api/friends/${friend.id}`,

          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );
        let newFriends = friends.filter((f) => f.id !== friend.id);
        setFriends(newFriends);
      } catch (e) {
        console.log(e.data);
      }
    }
  };
  return (
    <div className='friends' key={friend.id} onClick={() => {}}>
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
          <div className='dropdown' onClick={() => handleUnfriend(friend)}>
            un-friend?
          </div>
        )}
      </div>
    </div>
  );
};

export default Friend;
