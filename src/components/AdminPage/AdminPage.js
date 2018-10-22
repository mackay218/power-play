import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

import axios from 'axios';
import Button from '@material-ui/core/Button';
import './AdminPage.css';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';

const mapStateToProps = state => ({
  user: state.user,
});

class AdminPage extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    }
  }

  scrollPosition = 0

   // resets the page position when changing pages
  componentWillReceiveProps() {
    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      this.scrollPosition = window.scrollY
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });

     // resets the page position when changing pages
    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      window.scrollTo(0, this.scrollPosition)
    }
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('/landing_page');
    }
    if (!this.props.user.isLoading && this.props.user.role === "player") {
      this.props.history.push('/player_profile_page');
    }
    if (!this.props.user.isLoading && this.props.user.role === "coach") {
      this.props.history.push('/players_page');
    }

     // resets the page position when changing pages
    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      window.scrollTo(0, this.scrollPosition)
    }
  }

  // function for logging a user out of the site 
  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  // function to handle imput changes
  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    })
  }

  //function to check if coach is already in the database
  submitCoach = (event) => {
    event.preventDefault();
    console.log('Coach submitted');
    axios.post('/api/coaches/checkCoach', this.state)
      .then((response) => {
        console.log('response', response.status);
        if(response.status === 200){
          swal('An invite was already sent to this email');
          this.setState({
            name: '',
            email: '',
          });
        }
        else if(response.status === 201){
          this.sendCoachInvite();
        }
       
      })
      .catch((error) => {
        console.log('error checking coach:', error)
        swal('error checking coach');
      });
  }

  //function to send invite to coach email
  sendCoachInvite = () => {
    axios.post('/api/coaches/coachInvite', this.state)
      .then((response) => {
        console.log('email invite sent to: ', this.state.email);
        swal('email invite sent');

      })
      .catch((error) => {
        console.log('error sending invite: ', error);
        swal('error sending invite email');
      });

    this.setState({
      name: '',
      email: ''
    });
  }

  // function to send the user to the coaches list page
  sendToCoaches = () => {
    this.props.history.push('/admin_coach_list_page')
  }
  // function to send the user to the player list page
  sendToPlayers = () => {
    this.props.history.push('/players_page');
  }

  render() {
    let content = null;

    if (this.props.user.email) {
      content = (
        <div className="adminPageContainer">
          <h1 className="center-text">Add Coaches</h1>
          {/* Form for adding coaches to the site */}
          <form className="coach-form" onSubmit={this.submitCoach}>
            <TextField label="name" type="text" onChange={this.handleChange} value={this.state.name} name="name" />
            <br />
            <TextField label="email" type="text" onChange={this.handleChange} value={this.state.email} name="email" />
            <br />
            <Button variant="contained" type="submit">Add Coach</Button>
          </form>
          <img className="inverseLogo" src="images/largePPRLogo.svg" alt="logo" />
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
export default connect(mapStateToProps)(AdminPage);