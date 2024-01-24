import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logout from './Logout';

const Navigation = () => {
  const navigate = useNavigate();
  const [logoutMessage, setLogoutMessage] = useState(false);

  const handleLogout = () => {
    Logout();
    setLogoutMessage('Successfully logged out! Click OK to go back to the Homepage');
    setTimeout(() => {
      setLogoutMessage(null);
      navigate('/');
    }, 2000);
  };

  return (
    <nav>
      <Link to="/">
        <button>Home</button></Link>
      <Link to="/login">
        <button>Login</button></Link>
      <Link to="/account-info">
        <button>My Account</button></Link>
      <Link to="/sell">
        <button>Sell</button></Link>
      <button onClick={handleLogout}>Logout</button>
      {logoutMessage && window.alert(logoutMessage)}
      <form>
        <input type="text" placeholder="Search..." />
        <button type="submit">Go!</button>
      </form>
    </nav>
  );
};

export default Navigation;