import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link, navLink, NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './NavBar.css';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { circularProgressClasses } from '@mui/material';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const { logoutUser, user, token, musicCollection, setMusicCollection } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/friends/search/${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const users = response.status === 200 ? await response.json() : [];

      setOptions(
        users.map((user) => ({
          ...user,
          name: `${user.first_name} ${user.last_name}`,
        }))
      );
      setLoading(false);
      setOpen(true);
    })();

    return () => {};
  }, [query]);

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
        <li
          className='logo-text'
          style={{ fontFamily: "'Tajawal', sans-serif" }}
        >
          Music with Friends
        </li>

        {user ? (
          <>
            {/* <li className='center-nav-cluster'>
              <Autocomplete
                id='asynchronous-demo'
                style={{ width: 300 }}
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                onChange={(event, value, reason) => {
                  console.log('**** event: ', event);
                  console.log('**** value: ', value);
                  console.log('**** reason: ', reason);
                  if (reason === 'select-option') {
                    console.log(value.id);
                  }
                }}
                getOptionSelected={(option, value) =>
                  option.name === value.name
                }
                getOptionLabel={(option) => option.name}
                options={options}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    style={{
                      color: 'white',
                    }}
                    {...params}
                    label='Search Users'
                    variant='outlined'
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? (
                            <CircularProgress color='inherit' size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </li> */}
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
          ''
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
