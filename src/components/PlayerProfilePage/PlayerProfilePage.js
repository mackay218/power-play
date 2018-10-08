import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
    user: state.user,
  });
  
  class PlayerProfilePage extends Component {
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

    submitPlayerProfile = (event) => {
      event.preventDefault();
      console.log('Player profile submitted.');
    }
  
    render() {
      let content = null;
  
      if (this.props.user.email) {
        content = (
          <div>
            <h1>Enter Information</h1>
            <form onSubmit={this.submitPlayerProfile}>
              <div>
                <input></input>
                <input></input>
                <input></input>
              </div>
              
            
            
            
            
            
            
            
            
            
            </form>
          </div>
        );
      }
  
      return (
        <div>
          <Nav />
          { content }
        </div>
      );
    }
  }
  
  // this allows us to use <App /> in index.js
  export default connect(mapStateToProps)(PlayerProfilePage);