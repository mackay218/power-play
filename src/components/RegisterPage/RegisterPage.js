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
  // Funciton for registering a user (only registers a player)
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

  // Function for handling changes in the registration form
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }
  // Function for changing the alert based on the error that is thrown
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
      // Sets the background image of the site
      style={{ backgroundImage: 'url("./images/ice-background.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no repeat' }}
      >
        {/* Renders the Navigation bar */}
        <Nav />
        <div className="pageContainer center-text">
          {/* Renders an alert if there is an error */}
          {this.renderAlert()}
          {/* Form for collecting information to register a player */}
          <form className="register-form">
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
            <div className="stripeForm" >
              {/* Components required for stripe form to appear */}
              <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PK_KEY}>
                <Elements>
                  <CheckoutForm history={this.props.history} registerUser={this.registerUser} registerInfo={{email: this.state.email, password: this.state.password}}/>
                </Elements>
              </StripeProvider>
            </div>
          </form>
          <img className="inverseLogo" src="images/largePPRLogo.svg" alt="logo"/>
        </div>
      </div>
    );
  }
}

export default connect()(RegisterPage);

