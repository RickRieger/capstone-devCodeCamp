import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export default AuthContext;

function setUserObject(user) {
  if (!user) {
    return null;
  }
  return {
    username: user.username,
    id: user.user_id,
    first_name: user.first_name,
    last_name: user.last_name,
  };
}

export const AuthProvider = ({ children }) => {
  const BASE_URL = 'http://127.0.0.1:8000/api/auth';
  const userToken = JSON.parse(localStorage.getItem('token'));
  const decodedUser = userToken ? jwtDecode(userToken) : null;
  const [token, setToken] = useState(userToken);
  const [user, setUser] = useState(setUserObject(decodedUser));
  const [isServerError, setIsServerError] = useState(false);
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState(null);
  const [feed, setFeed] = useState(null);

  const registerUser = async (registerData) => {
    try {
      let finalData = {
        username: registerData.username,
        password: registerData.password,
        email: registerData.email,
        first_name: registerData.firstName,
        last_name: registerData.lastName,
      };
      let response = await axios.post(`${BASE_URL}/register/`, finalData);
      if (response.status === 201) {
        console.log('Successful registration! Log in to access token');
        setIsServerError(false);
        navigate('/login');
      } else {
        navigate('/register');
      }
    } catch (error) {
      console.log(error.toJSON());
    }
  };

  const loginUser = async (loginData) => {
    try {
      let response = await axios.post(`${BASE_URL}/login/`, loginData);
      if (response.status === 200) {
        localStorage.setItem('token', JSON.stringify(response.data.access));
        setToken(JSON.parse(localStorage.getItem('token')));
        let loggedInUser = jwtDecode(response.data.access);
        setUser(setUserObject(loggedInUser));
        setIsServerError(false);
        navigate('/');
      } else {
        navigate('/register');
      }
    } catch (error) {
      console.log(error.toJSON());
      setIsServerError(true);
      navigate('/register');
    }
  };

  const logoutUser = () => {
    if (user) {
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
      navigate('/');
    }
  };
  let [musicCollection, setMusicCollection] = useState(null);

  const getAllResultsFromQuery = async (query, index) => {
    console.log('okookok');
    const options = {
      method: 'GET',
      url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
      params: { q: query, index: index },
      headers: {
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      },
    };
    try {
      let result = await axios.request(options);
      result = result.data;
      setMusicCollection(result.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  const getAllPostsFromFriends = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/posts/', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      // let response = res.data.sort(() => Math.random() - 0.5);
      setFeed(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const contextData = {
    user,
    token,
    loginUser,
    logoutUser,
    registerUser,
    isServerError,
    getAllResultsFromQuery,
    setMusicCollection,
    musicCollection,
    searchResults,
    setSearchResults,
    feed,
    setFeed,
    getAllPostsFromFriends,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
