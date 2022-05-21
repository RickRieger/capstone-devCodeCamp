// General Imports
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages Imports
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AlbumInfo from './pages/AlbumInfo/AlbumInfo';
import SavedMusic from './pages/SavedMusic/SavedMusic';
import SearchResults from './pages/SearchResults/SearchResults';
import UserProfile from './pages/UserProfile/UserProfile';
// Component Imports
import NavBar from './components/NavBar/NavBar';

import Footer from './components/Footer/Footer';

// Util Imports
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <div className='main-container'>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path='/search-music'
          element={
            <PrivateRoute>
              <SearchResults />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile/:id'
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path='/album-info/:albumId'
          element={
            <PrivateRoute>
              <AlbumInfo />
            </PrivateRoute>
          }
        />

        <Route
          path='/favorites'
          element={
            <PrivateRoute>
              <SavedMusic />
            </PrivateRoute>
          }
        />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      <Footer />
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
