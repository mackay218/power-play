import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import swal from 'sweetalert';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  user: state.user,
});

class SuspendPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reason: '',
      reasonBody: ''
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

  submitReasonSuspend = (event) => {
    event.preventDefault();
    console.log('reason submitted');
  }

  suspendPlayer = (id) => {
    //TODO: set up delete
    swal({
      title: "Are you sure you want to suspend your account?",
      text: "Once suspended, you will not be able to be seen by coaches!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.dispatch({ type: 'SUSPEND_PLAYER', payload: {id: id, reasons: this.state }});
        swal('Your account has been suspended', {
          icon: 'success'
        });
      }
      else {
        swal('Your account has not been suspended');
      }
    })
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
      <div className="mainContainer"
        style={{ backgroundImage: 'url("./images/ice-background.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no repeat' }}
      >
        <Nav />
        <div className="pageContainer">
          {content}
          <form onSubmit={this.submitReasonSuspend}>
            <select value={this.state.reason} onChange={this.handleChange} name="reason">
              <option value="Reason for suspension">reason for suspension</option>
              <option value="Commited">Commited</option>
              <option value="No longer looking to be recruited">No longer looking to be recruited</option>
              <option value="Other">Other</option>
            </select><br />
            <label>If other, explain:</label><br />
            <input type="text" onChange={this.handleChange} name="reasonBody" />
          </form>
          <div className="center-text">
            <button onClick={() => this.suspendPlayer(this.props.user.id)}>Suspend Account</button>
          </div>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(SuspendPage);