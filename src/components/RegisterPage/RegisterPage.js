import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import Nav from '../Nav/Nav';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './RegisterPage.css';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      message: '',
    };
  }

  handleCancel = () => {
    this.props.history.push('/landing_page');
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.email === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a email and password!',
      });
    } else {
      const body = {
        email: this.state.email,
        password: this.state.password,
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
        .then((response) => {
          console.log(response);
          if (response.data.status === 201) {
            this.props.dispatch({type: 'CREATE_PLAYER', payload: response.data.id});
            this.props.history.push('/login');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The email might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div className="mainContainer">
        <Nav />
        <div className="pageContainer">
          {this.renderAlert()}
          <form className="registerForm" onSubmit={this.registerUser}>
            <h1>Register User</h1>
            <div className="formInputs">
              <div>
                <TextField type="email" 
                  onChange={this.handleInputChangeFor('email')} 
                  label="email" 
                  name="email"
                />
              </div>
              <div>
                <TextField type="password"
                  onChange={this.handleInputChangeFor('password')}
                  label="password"
                  name="password"
                />
              </div>
            </div>
          
            <div className="btnContainer">
              <Button
                type="submit"
                name="submit"
                value="Register"
              >Sign Up</Button>
              <Button 
                type="button"
                onClick={this.handleCancel} name="cancel">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(RegisterPage);

