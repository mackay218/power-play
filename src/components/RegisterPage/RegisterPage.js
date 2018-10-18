import React, { Component } from 'react';
import axios from 'axios';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from '../CheckoutForm/CheckoutForm.js';
import './RegisterPage.css';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';

import TextField from '@material-ui/core/TextField';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      message: '',
    };
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
            this.props.dispatch({ type: 'CREATE_PLAYER', payload: response.data.id });
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
      <div className="mainContainer" 
      style={{ backgroundImage: 'url("./images/ice-background.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no repeat' }}
      >
        <Nav />
        <div className="pageContainer center-text">
          {this.renderAlert()}
          <form onSubmit={this.registerUser} className="register-form">
            <h1>Sign Up</h1>
            <div>
              <TextField
                type="email"
                name="email"
                label="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
            </div>
            <div>
              <TextField
                type="password"
                name="password"
                label="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}

              />
            </div>
            <div>
              <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PK_KEY}>
                <Elements>
                  <CheckoutForm history={this.props.history} registerUser={this.registerUser} registerInfo={{email: this.state.email, password: this.state.password}}/>
                </Elements>
              </StripeProvider>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(RegisterPage);

