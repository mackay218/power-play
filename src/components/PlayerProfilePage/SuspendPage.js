import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import swal from 'sweetalert';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import './PlayerProfilePage.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
        this.props.dispatch({ type: 'SUSPEND_PLAYER', payload: { id: id, reasons: this.state } });
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
    return (
      <div className="mainContainer"
        style={{ backgroundImage: 'url("./images/ice-background.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no repeat' }}
      >
        <Nav />
        <div className="pageContainer">
          <form onSubmit={() => this.suspendPlayer(this.props.user.id)} className="suspend-form">
            <h3>Suspend Account</h3>
            <FormControl >
              <InputLabel>Reason for suspending account</InputLabel>
              <Select value={this.state.reason} onChange={this.handleChange} name="reason">
                <MenuItem value="Commited">Commited</MenuItem>
                <MenuItem value="No longer looking to be recruited">No longer looking to be recruited</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <br />
            <label>If other, explain:</label>
            <TextField type="text" label="explanation for suspending account" onChange={this.handleChange} name="reasonBody" />
            <br />
            <Button variant="contained" color="secondary" type="submit">Suspend Account</Button>
          </form>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(SuspendPage);