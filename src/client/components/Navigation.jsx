import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/account">My Account</Link>
      <Link to="/sell">Sell</Link>
      <form>
        <input type="text" placeholder="Search..." />
        <button type="submit">Go!</button>
      </form>
    </nav>
  );
};

export default Navigation;