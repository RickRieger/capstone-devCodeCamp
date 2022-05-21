import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { CardHeader } from '@mui/material';
const Friend = ({
  friend,
  friends,
  isRequests,
  request,
  getAllFriendsOfProfile,
  getPendingFriendRequests,
  handleDeleteRequest,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className='friends'
      key={friend.id}
      onClick={() => navigate(`/profile/${friend.id}`)}
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
};

export default Friend;
