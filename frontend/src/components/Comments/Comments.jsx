import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Comments.css';
import Comment from './Comment';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { Button } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const ariaLabel = { 'aria-label': 'description' };
const Comments = ({ post_id, comments, getAllPostsFromFriends }) => {
  const [showComments, setShowComments] = useState(false);
  const auth = useAuth();
  const [user, token] = auth;
  const [userComment, setUserComment] = useState([]);

  const postComment = async (callBack) => {
    let body = {
      comment: userComment,
    };
    console.log(body);
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/posts/comment/${post_id}`,
        body,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      getAllPostsFromFriends();
      callBack();
    } catch (e) {
      console.log(e.message);
    }
  };

  const onSuccess = () => {
    setUserComment('');
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (userComment.length === 0) {
      alert('cant be empty');
      return;
    }
    postComment(onSuccess);
  }

  return (
    <div className='container-comments'>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1 },
          marginTop: '40px',
          marginBottom: '40px',
        }}
        noValidate
        autoComplete='off'
      >
        <Input
          placeholder='Add a comment...'
          inputProps={ariaLabel}
          sx={{
            color: 'white',
            border: 'white',
            width: '80%',
          }}
          type='text'
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
        />
        <Button className='comment-button' variant='text'>
          CANCEL
        </Button>
        <Button
          className='comment-button'
          variant='outlined'
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          COMMENT
        </Button>
      </Box>
      <div
        className='reply-container'
        style={{ visibility: comments.length > 0 ? 'visible' : 'hidden' }}
      >
        <div onClick={() => setShowComments(!showComments)}>
          {showComments ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          {showComments ? (
            <span className={'show-hide-text'}>Hide comments</span>
          ) : (
            <span>
              {' '}
              <span className={'show-hide-text'}>Show comments{'  '}</span>
              <span>{`(${comments.length} ${'  '} comments)`}</span>
            </span>
          )}
        </div>

        {showComments &&
          comments
            .slice(0)
            .reverse()
            .map((comment, index) => {
              return (
                <Comment
                  key={index}
                  comment={comment.comment}
                  commentId={comment.id}
                  author={comment.author}
                  username={comment.username}
                  created={comment.created}
                  replies={comment.replies}
                  getAllPostsFromFriends={getAllPostsFromFriends}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Comments;
