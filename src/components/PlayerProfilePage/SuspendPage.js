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
          { content }
          
        </div>
      );
    }
  }
  
  // this allows us to use <App /> in index.js
  export default connect(mapStateToProps)(SuspendPage);