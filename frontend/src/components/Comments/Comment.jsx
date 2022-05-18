import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import moment from 'moment';
import './Comments.css';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Comment(props) {
  useEffect(() => {}, []);
  const auth = useAuth();
  const [user, token] = auth;
  const {
    comment,
    commentId,
    author,
    replies,
    created,
    getAllPostsFromFriends,
  } = props;
  const [reply, setReply] = useState('');
  const [replyBool, setReplyBool] = useState(false);
  const [showReplyBool, setShowReplyBool] = useState(false);

  async function postReply() {
    if (reply.length == 0) {
      alert('need to make a valid reply!');
      return;
    }
    let body = {
      reply: reply,
      author: user.id,
    };
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/posts/reply/${commentId}`,
        body,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      getAllPostsFromFriends();
      setShowReplyBool(!showReplyBool);
      setReplyBool(false);
      setReply('');
    } catch (e) {
      console.log(e.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (reply.length === 0) {
      e.preventDefault();
      alert('cant be empty');
      return;
    }

    postReply(reply);
    setReply('');
  }

  return (
    <div>
      <div className='comment-header-container'>
        <div className='username-text'>{author.username}</div>
        <div className='date-text'>
          {moment(created).startOf('hour').fromNow()}
        </div>
      </div>
      <h3 className={'comments'}> {comment} </h3>

      <Button variant='text' onClick={() => setReplyBool(true)}>
        Reply
      </Button>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1 },
          marginTop: '40px',
          display: replyBool ? 'block' : 'none',
          right: '0px',
        }}
        noValidate
        autoComplete='off'
      >
        <Input
          placeholder='Add a reply...'
          // inputProps={ariaLabel}
          sx={{
            color: 'white',
            border: 'white',
            width: '60%',
          }}
          type='text'
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
        />
        <Button variant='text' onClick={() => setReplyBool(false)}>
          CANCEL
        </Button>
        <Button
          variant='outlined'
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          REPLY
        </Button>
      </Box>
      <div className='reply-container'>
        <div onClick={() => setShowReplyBool(!showReplyBool)}>
          {showReplyBool ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          {showReplyBool ? (
            <span>Hide replies</span>
          ) : (
            <span>Show replies</span>
          )}
        </div>

        {showReplyBool ? (
          <div>
            {replies.reverse().map((reply, index) => {
              return (
                <>
                  <div
                    key={reply.id}
                    style={{
                      display: 'flex',
                      marginLeft: '30px',
                      fontSize: '.8rem',
                    }}
                  >
                    {reply.author.username}
                  </div>
                  <div className='replies' key={index}>
                    {reply.reply}
                  </div>
                </>
              );
            })}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Comment;
