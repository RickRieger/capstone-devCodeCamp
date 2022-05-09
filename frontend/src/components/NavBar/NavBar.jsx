import React from 'react';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './NavBar.css';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = ({ setUpDateSearch }) => {
  const [query, setQuery] = useState('');
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSearchQuery = () => {
    if (query.length === 0) {
      alert('please enter a proper search query!');
      return;
    }
    navigate('/');
    setUpDateSearch(query);
    setQuery('');
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
                handleSearchQuery(e);
              }
            }}
          />
          <SearchIcon
            className='search-button'
            onClick={() => handleSearchQuery()}
          />
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
