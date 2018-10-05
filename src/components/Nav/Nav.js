import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/home">
            Landing Page
          </Link>
        </li>
        <li>
          <Link to="/player_profile_page">
            Player Profile
          </Link>
        </li>
        <li>
          <Link to="/coach_page">
            Coaches Page
          </Link>
        </li>
        <li>
          <Link to="/terms">
            Terms
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
