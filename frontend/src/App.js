// General Imports
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Pages Imports
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

// Component Imports
import Navbar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

// Util Imports
import PrivateRoute from './utils/PrivateRoute';
import { useState } from 'react';
import { Fragment } from 'react';

function App() {
  const [upDateSearch, setUpDateSearch] = useState(null);
  return (
    <Fragment>
      <Navbar setUpDateSearch={setUpDateSearch} />
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <HomePage upDateSearch={upDateSearch} />
            </PrivateRoute>
          }
        />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
