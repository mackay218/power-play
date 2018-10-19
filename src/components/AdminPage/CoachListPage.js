import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import './AdminPage.css';
import CoachTable from './CoachTable';


const mapStateToProps = state => ({
  user: state.user,
  coach: state.coach.coach,
});


class CoachListPage extends Component {

  scrollPosition = 0

  componentWillReceiveProps() {
    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      this.scrollPosition = window.scrollY
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: 'GET_ALL_COACHES' });

    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      window.scrollTo(0, this.scrollPosition)
    }
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('landing_page');
    }
    if (!this.props.user.isLoading && this.props.user.role === "player") {
      this.props.history.push('/player_profile_page');
    }
    if (!this.props.user.isLoading && this.props.user.role === "coach") {
      this.props.history.push('/players_page');
    }

    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      window.scrollTo(0, this.scrollPosition)
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render() {
    let content = null;

    if (this.props.user.email) {
      content = (
        <div className="center-text">
          <h1>Coaches</h1>
          <CoachTable />
        </div>
      );
    }

    return (
      <div className="mainContainer"
        style={{ backgroundImage: 'url("./images/ice-background.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no repeat' }}
      >
        <Nav />
        <div className="pageContainer">
          {content}
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CoachListPage);