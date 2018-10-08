import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  user: state.user,
});

class SuspendPage extends Component {
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

  submitReasonSuspend = (event) => {
    event.preventDefault();
    console.log('reason submitted');
  }

  suspendAccount = () => {
    console.log('Suspend Account');
  }

  deleteAccount = () => {
    console.log('Delete Account');
  }

  render() {
    let content = null;

    if (this.props.user.email) {
      content = (
        <div>
          SuspendPage
          </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
        <form onSubmit={this.submitReasonSuspend}>
          <select>
            <option value="Reason for suspension">reason for suspension</option>
            <option value="Commited">Commited</option>
            <option value="No longer looking to be recruited">No longer looking to be recruited</option>
            <option value="Other">Other</option>
          </select>
          <label>If other, explain:</label>
          <input type="text" onChange={this.handleChange}></input>
        </form>
        <div className="center-text">
          <button onClick={this.suspendAccount}>Suspend Account</button>
          <button onClick={this.deleteAccount}>Delete Account</button>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(SuspendPage);