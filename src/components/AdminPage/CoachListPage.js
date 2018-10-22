import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import './AdminPage.css';
import CoachTable from './CoachTable';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const mapStateToProps = state => ({
  user: state.user,
  coach: state.coach.coach,
});


class CoachListPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coachName: '',
    }
  }

  scrollPosition = 0

  // Resets the page position when changing pages
  componentWillReceiveProps() {
    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      this.scrollPosition = window.scrollY
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: 'GET_ALL_COACHES' });

    // Resets the page position when changing pages
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

    // Resets the page position when changing pages
    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      window.scrollTo(0, this.scrollPosition)
    }
  }
  // Function to log the user out of the site
  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  handleNameChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    })
  }

  searchCoaches = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: 'SEARCH_COACHES', payload: this.state.coachName });
  }

  render() {
    let content = null;

    if (this.props.user.email) {
      content = (
        <div className="center-text">
          <div>
            <form onSubmit={this.searchCoaches} className="coach-search">
              <h2>Search Coaches</h2>
              <TextField type="text" label="Coaches Name" value={this.state.coachName} onChange={this.handleNameChange} name="coachName" />
              <br />
              <Button variant="contained" color="primary" type="submit">Search</Button>
            </form>
          </div>
          {/* Renders the list of coaches */}
          <CoachTable />
        </div>
      );
    }

    return (
      <div className="mainContainer"
        // Sets the background image of the site
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