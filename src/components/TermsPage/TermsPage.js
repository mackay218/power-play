import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

//USED FOR MOCK DATA GENERATOR
import axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
});

class TermsPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('home');
    }
  }

  // post routes for calling mock data generator
  //DELETE BEFORE FINAL BUILD

  handlePlayerClick = () => {
    axios.post('/api/databaseFaker', this.state)
      .then((response) => {
        console.log('ran mock data maker for players')
      })
      .catch((error) => {
        console.log('error running mock data maker:', error);
      });
  }

  handleCoachClick = () => {
    axios.post('api/databaseFaker/coaches', this.state)
      .then((response) => {
        console.log('ran mock data maker for coaches')
      })
      .catch((error) => {
        console.log('error running mock data maker:', error);
      });
  }

  /****************************************************/

  render() {
    let content = null;

    if (this.props.user.email) {
      content = (
        <div>
          <p>
            Terms Page
          </p>

          {/* buttons for generating mock data  DELETE BEFORE FINAL BUILD*/}
          <button type="button" onClick={this.handlePlayerClick}>Mock Players</button>
          <button type="button" onClick={this.handleCoachClick}>Mock Coaches</button>
          {/* ******************* */}

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
export default connect(mapStateToProps)(TermsPage);
