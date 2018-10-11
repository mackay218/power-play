import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

let mapStateToProps = (state) => ({
  user: state.user,
});

class Nav extends Component {
  render() {
    let content = null;

    if (this.props.user.role === "player") {
      content = (
        <div className="nav">
          <img className="logo"
            src="https://drive.google.com/uc?export=view&id=1k270ptdyB7SabQnO3HHD1DBytIIBQBtQ"
            alt="logo">
          </img>
          <Link to="/player_profile_page">
            Player Profile
          </Link>
          <Link to="/suspend_page">
            suspend and delete
          </Link>
          <Link to="/terms">
            Terms
          </Link>
        </div>
      );
    }
    else if (this.props.user.role === "coach") {
      content = (
        <div className="nav">
          <img className="logo"
            src="https://drive.google.com/uc?export=view&id=1k270ptdyB7SabQnO3HHD1DBytIIBQBtQ"
            alt="logo">
          </img>
          <Link to="/players_page">
            Players Listed Page
          </Link>
          <Link to="/suspend_page">
            suspend and delete
          </Link>
          <Link to="/terms">
            Terms
          </Link>
        </div>);
    }
    else if (this.props.user.role === "admin") {
      content = (
        <div className="nav">
          <img className="logo"
            src="https://drive.google.com/uc?export=view&id=1k270ptdyB7SabQnO3HHD1DBytIIBQBtQ"
            alt="logo">
          </img>
          <div>
            <Link to="players_page">
              Player List
            </Link>
            <Link to="admin_coach_list_page">
              Coach List
            </Link>
            <Link to="/admin_page">
              Add Coaches
            </Link>
            <Link to="/terms">
              Terms
            </Link>
          </div>
        </div>
      )
    }
    else {
      content = (
        <div className="nav">
          <div>
            <img className="logo"
              src="https://drive.google.com/uc?export=view&id=1k270ptdyB7SabQnO3HHD1DBytIIBQBtQ"
              alt="logo">
            </img>
            <Link to="/landing_page">
              Home
            </Link>
            <Link to="/login">
              Log In
            </Link>
            <Link to="/register">
              Register
            </Link>
            <Link to="/terms">
              Terms
            </Link>
          </div>
        </div>
      )
    }
    return (
      <div>{content}</div>
    );
  }
}

export default connect(mapStateToProps)(Nav);
