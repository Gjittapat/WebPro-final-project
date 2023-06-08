// not used in the app , use NewNav instead
import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import ImageAvatars from './ImageAvatars';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  const test = () => {
    console.log("test");
  };
  console.log("user: ", user)

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-left">
          <Link to="/">
            <img id="navbar-logo" src="/appLogo.png" alt="app logo" />
          </Link>
          <div className="navbar-search">
            <input id="nav-search-bar" type="text" placeholder="Search..." />
          </div>
          {user && user.role === 'admin' && (
            <Link to="/requests">
              <p>requests</p>
            </Link>
          )}
        </div>

        <nav>
          {user && (
            <div className="navbar-user">
              <div className="avatar" onClick={test}>
                <ImageAvatars />
              </div>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div className="navbar-links">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
