import React, { useContext, useState } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './NavBar.css';
import TextField from '@material-ui/core/TextField';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const {
    logoutUser,
    user,
    token,
    musicCollection,
    setMusicCollection,
    setSearchResults,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/friends/search/${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const users = response.status === 200 ? await response.json() : [];

      setSearchResults(users);
      navigate(`/profile/${user.id}`);
      setQuery('');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='navBar'>
      <ul>
        <li className='brand' style={{ alignItems: 'center' }}>
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            <img
              src='/clipart1638227.png'
              alt='logo'
              style={{ width: '4rem' }}
            />
          </Link>
        </li>
        {user && (
          <li
            className='logo-text'
            style={{ fontFamily: "'Tajawal', sans-serif" }}
          >
            Music with Friends
          </li>
        )}

        <span style={{ fontSize: '1rem' }}>
          {user && `Welcome back ${user.first_name}!`}
        </span>

        {user ? (
          <>
            <div className='center-nav-cluster'>
              <TextField
                id='outlined-basic'
                label='Search People...'
                variant='outlined'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e);
                  }
                }}
              />
            </div>
            <li>
              <NavLink
                to={`/profile/${user.id}`}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                <p>profile</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/favorites'
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                <p>saved music</p>
              </NavLink>
            </li>

            {musicCollection ? (
              <li>
                <NavLink
                  onClick={() => setMusicCollection(null)}
                  className={({ isActive }) =>
                    isActive ? 'active' : undefined
                  }
                  to='/search-music'
                >
                  {' '}
                  <p>new search</p>
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'active' : undefined
                  }
                  to='/search-music'
                >
                  {' '}
                  <p>search</p>
                </NavLink>
              </li>
            )}

            <li>
              <NavLink
                to='/'
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                <p>home</p>
              </NavLink>
            </li>
          </>
        ) : (
          <li
            className='logo-text'
            style={{
              fontFamily: "'Tajawal', sans-serif",
              marginRight: '450px',
            }}
          >
            Music with Friends
          </li>
        )}

        {user ? (
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            to='/login'
            onClick={logoutUser}
          >
            <li>Logout</li>
          </NavLink>
        ) : (
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            to='/login'
          >
            <li>Login</li>
          </NavLink>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
