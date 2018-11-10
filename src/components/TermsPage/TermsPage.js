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

  // post routes for calling mock data generator
  //DELETE BEFORE FINAL BUILD

  // Function to populate database with fake players
  handlePlayerClick = () => {
    axios.post('/api/databaseFaker', this.state)
      .then((response) => {
        console.log('ran mock data maker for players')
      })
      .catch((error) => {
        console.log('error running mock data maker:', error);
      });
  }
  // Function to populate the database with fake coaches
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

      content = (
        <div>
          <p>
            Terms Page
          </p>

          {/* buttons for generating mock data  DELETE BEFORE FINAL BUILD*/}
          {/* Replace with actual terms and conditions once */}
          <button type="button" onClick={this.handlePlayerClick} disabled>Mock Players</button>
          <button type="button" onClick={this.handleCoachClick} disabled>Mock Coaches</button>
          {/* ******************* */}

        </div>
      );
    

    return (
      <div className="mainContainer"
        style={{ backgroundImage: 'url("./images/ice-background.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no repeat' }}
      >
        <Nav />
        <div className="pageContainer">
          {content}
        </div> 
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TermsPage);
