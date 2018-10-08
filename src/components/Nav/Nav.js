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
          <Link to="/players_page">
            Players Listed Page
          </Link>
        </li>
        <li>
          <Link to="/admin_page">
            Administrative Overlord Access Portal
          </Link>
        </li>
        <li>
          <Link to="/admin_coach_list_page">
            admins very own coach list
          </Link>
        </li>
        <li>
          <Link to="/suspend_page">
            suspend and delete
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
