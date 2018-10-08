import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
    user: state.user,
    coach: state.coach.coach,
  });
  
  class CoachListPage extends Component {
    componentDidMount() {
      this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
      this.props.dispatch({ type: 'GET_ALL_COACHES'});
    }
  
    componentDidUpdate() {
      if (!this.props.user.isLoading && this.props.user.email === null) {
        this.props.history.push('landing_page');
      }
    }
  
    logout = () => {
      this.props.dispatch(triggerLogout());
    }

    deleteCoach = (id) => {
      console.log('Coach deleted:', id);
    }
  
    render() {
      let content = null;
  
      if (this.props.user.email) {
        content = (
          <div className="center-text">
            <h1>Coaches</h1>
            <table className="center-element">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.props.coach.map((coach, i) => {
                    return (
                    <tr key={i}>
                      <td>{coach.name}</td>
                      <td>{coach.email}</td>
                      <td>{coach.status_type}</td>
                      <td><button onClick={() => this.deleteCoach(coach.id)}>Delete</button></td>
                    </tr>
                    );
                })}
              </tbody>
            </table>
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
  export default connect(mapStateToProps)(CoachListPage);