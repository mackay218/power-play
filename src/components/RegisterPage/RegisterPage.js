import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from '../CheckoutForm/CheckoutForm.js';
import REACT_APP_STRIPE_PB_KEY from '../../config';


// let PBKEY = process.env.REACT_APP_STRIPE_PB_KEY

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      message: '',
      // keyPublish: '',
      // stripe: '',
    };
  }

  // componentDidMount(){
   
  //   setTimeout(() => {
  //     this.setPublishKey();
  //   }, 1);
    
  //   setTimeout( () => {
  //     this.whatIsPublishKey();
  //   }, 10);
  // }

  // setPublishKey = () => {
  //   console.log(this.state.keyPublish);
  //   this.setState({
  //     keyPublish: process.env.REACT_APP_STRIPE_PB_KEY ,
  //   });
  // };

  // whatIsPublishKey = () => {
  //   console.log(this.state.keyPublish);
  // }


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
          if (response.status === 201) {
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
      <div>
        {this.renderAlert()}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="email">
              email:
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <input
              type="submit"
              name="submit"
              value="Register"
            />
            <Link to="/login">Cancel</Link>
          </div>
        </form>



        {/*Checkout form for stripe*/}

        <div className="element-checkout">
          <StripeProvider apiKey={REACT_APP_STRIPE_PB_KEY}>
            <Elements>
              <CheckoutForm />
            </Elements>
          </StripeProvider>
        </div>


      </div>
    );
  }
}

export default RegisterPage;

