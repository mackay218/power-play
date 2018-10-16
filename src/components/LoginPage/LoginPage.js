import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import ForgotPasswordDialog from './ForgotPasswordDialog';
import Nav from '../Nav/Nav';

import './LoginPage.css';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  scrollPosition = 0

  componentWillReceiveProps() {
    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      this.scrollPosition = window.scrollY
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch(clearError());
    
    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      window.scrollTo(0, this.scrollPosition)
    }
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email !== null && this.props.user.role === 'player') {
      this.props.history.push('player_profile_page');
    }
    else if (!this.props.user.isLoading && this.props.user.email !== null && this.props.user.role === 'coach') {
      this.props.history.push('players_page');
    }
    else if (!this.props.user.isLoading && this.props.user.email !== null && this.props.user.role === 'admin') {
      this.props.history.push('admin_page');
    }

    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      window.scrollTo(0, this.scrollPosition)
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.email === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.email, this.state.password));
    }
  }

  handleRegister = () => {
    this.props.history.push('/register');
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          { this.props.login.message }
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
        <div className="pageContainer">
          {this.renderAlert()}
          <form className="loginForm" onSubmit={this.login}>
            <h1>Login</h1>
            <div className="formInputs">
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
            </div>
            <div className="btnContainer">
              <Button
                type="submit"
                name="submit"
                value="Log In"
              >Log In</Button>
              <Button 
                type="button"
                onClick={this.handleRegister}>Register</Button>
            </div>
            <ForgotPasswordDialog />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
