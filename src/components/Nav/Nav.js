import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

let mapStateToProps = (state) => ({
  user: state.user,
});


class Nav extends Component {

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  render() {
    let content = null;

    let logOutBtn = null;

    if (this.props.user) {
      logOutBtn = (
        <button
          className="logoutBtn"
          onClick={this.logout}
        >
          Log Out
          </button>
      )
    }

    if (this.props.user.role === "player") {
      content = (
        <div className="nav">
          <Link to="/landing_page">
            <img className="logo"
              src="https://drive.google.com/uc?export=view&id=1k270ptdyB7SabQnO3HHD1DBytIIBQBtQ"
              alt="logo">
            </img>
          </Link>
          <div className="navLinkWrapper">
            <Link to="/player_profile_page">
              Player Profile
            </Link>
            <Link to="/landing_page">
              Home
            </Link>
            <Link to="/teams">
              Teams
            </Link>
            <Link to="/suspend_page">
              suspend and delete
            </Link>
            <Link to="/terms">
              Terms
            </Link>
          </div>
          {logOutBtn}
        </div>
      );
    }
    else if (this.props.user.role === "coach") {
      content = (
        <div className="nav">
          <Link to="/landing_page">
            <img className="logo"
              src="https://drive.google.com/uc?export=view&id=1k270ptdyB7SabQnO3HHD1DBytIIBQBtQ"
              alt="logo">
            </img>
          </Link>
          
          <div className="navLinkWrapper">
            <Link to="/landing_page">
              Home
            </Link>
            <Link to="/teams">
              Teams
            </Link>
            <Link to="/players_page">
              Players Listed Page
            </Link>
            <Link to="/suspend_page">
              suspend and delete
            </Link>
            <Link to="/terms">
              Terms
            </Link>
          </div>
          {logOutBtn}
        </div>);
    }
    else if (this.props.user.role === "admin") {
      content = (
        <div className="nav">
          <Link to="/landing_page">
            <img className="logo"
              src="https://drive.google.com/uc?export=view&id=1k270ptdyB7SabQnO3HHD1DBytIIBQBtQ"
              alt="logo">
            </img>
          </Link>
          <div className="navLinkWrapper">
            <Link to="/landing_page">
              Home
              </Link>
            <Link to="/teams">
              Teams
              </Link>
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
          {logOutBtn}
        </div>
      )
    }
    else {
      content = (
        <div className="nav">
            <Link to="/landing_page">
              <img className="logo"
                src="https://drive.google.com/uc?export=view&id=1k270ptdyB7SabQnO3HHD1DBytIIBQBtQ"
                alt="logo">
              </img>
            </Link>
            <div className="navLinkWrapper">
              <Link to="/landing_page">
                Home
              </Link>
              <Link to="/teams">
                Teams
              </Link>
              <Link to="/login">
                Log In
              </Link>
              <Link to="/register">
                Sign Up
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
