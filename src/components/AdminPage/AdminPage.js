import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

import axios from 'axios';
import Button from '@material-ui/core/Button';
import './AdminPage.css';
import TextField from '@material-ui/core/TextField';

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

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('landing_page');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    })
  }

  submitCoach = (event) => {
    event.preventDefault();
    console.log('Coach submitted');

    axios.post('/api/password/coachInvite', this.state)
      .then((response) => {
        console.log('email invite sent to: ', this.state.email);
        alert('email invite sent');
      })
      .catch((error) => {
        console.log('error sending invite: ', error);
        alert('error sending invite email');
      });
  }

  sendToCoaches = () => {
    this.props.history.push('admin_coach_list_page')
  }

  sendToPlayers = () => {
    this.props.history.push('players_page');
  }

  render() {
    let content = null;

    if (this.props.user.email) {
      content = (
        <div>
          <h1 className="center-text">Add Coaches</h1>
          <form className="center-text coach-form" onSubmit={this.submitCoach}>
            <TextField label="name" type="text" onChange={this.handleChange} value={this.state.name} name="name" />
            <br />
            <TextField label="email" type="text" onChange={this.handleChange} value={this.state.email} name="email" />
            <br />
            <Button variant="contained" type="submit">Add Coach</Button>
          </form>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AdminPage);