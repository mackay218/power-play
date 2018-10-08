import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

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
  }

  sendToCoaches = () => {
    console.log('Sent to Coaches');
  }

  sendToPlayers = () => {
    console.log('Sent to players');
  }

  render() {
    let content = null;

    if (this.props.user.email) {
      content = (
        <div>
          <h1>Add Coaches</h1>
          <form onSubmit={this.submitCoach}>
            <label>Name:</label>
            <input type="text" onChange={this.handleChange} value={this.state.name} name="name"></input>
            <br />
            <label>Email:</label>
            <input type="text" onChange={this.handleChange} value={this.state.email} name="email"></input>
            <br />
            <button type="submit">Add Coach</button>
          </form>
          <div className="center-text">
            <button onClick={this.sendToPlayers}>Player list</button>
            <button onClick={this.sendToCoaches}>Coach List</button>
          </div>
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