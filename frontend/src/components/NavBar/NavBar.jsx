import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './NavBar.css';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = ({ upDateSearch, setUpDateSearch }) => {
  const [query, setQuery] = useState(upDateSearch);
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(upDateSearch);
  }, [upDateSearch]);

  const handleSearch = () => {
    if (query.length === 0) {
      alert('please enter a proper search query!');
      return;
    }
    navigate('/');
    setUpDateSearch(query);
  };

  return (
    <div className='navBar'>
      <ul>
        <li className='brand'>
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            <b>devCodeCamp</b>
          </Link>
        </li>
        <li className='center-nav-cluster'>
          <input
            type='text'
            value={query}
            className='search-field'
            placeholder='Search...'
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <SearchIcon
            className='search-button'
            onClick={() => handleSearch()}
          />
        </li>
        <li>
          <Link
            to='/favorites'
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <p>saved music</p>
          </Link>
        </li>
        <div className='right-nav'>
          <li>
            {user ? (
              <button onClick={logoutUser}>Logout</button>
            ) : (
              <button onClick={() => navigate('/login')}>Login</button>
            )}
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
