import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import './PlayerProfilePage.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';


import PlayerProfileDialog from './PlayerProfileDialog';



const mapStateToProps = state => ({
  user: state.user,
  player: state.player,
});


class PlayerProfileDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {

      profile:
      {
        person_id: this.props.user.id,
        league_id: null,
        team_id: null,
        school: null,
        position_id: null,
        first_name: null,
        last_name: null,
        phone_number: null,
        birth_date: null,
        height: null,
        weight: null,
        gpa: null,
        act_score: null,
        school_year: null,
        image_path: null,
        video_link: null,
        goals: null,
        assists: null,
        points: null,
        games_played: null,
        wins: null,
        losses: null,
        ties: null,
        save_percent: null,
        shutouts: null,
        goals_against: null,
        guardian: false,
        player_info: null,
      },

      toggleView: false,
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });

    setTimeout(() => {
      console.log('get player info test');
      this.props.dispatch({ type: 'GET_PLAYER_INFO', payload: this.props.user.id })

    }, 1000);

  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('landing_page');
    }
  }

  handleProfileChange = (event) => {
    this.setState({
      ...this.state,

      profile: {
        ...this.state.profile,
        [event.target.name]: event.target.value,
      }

    })
    console.log('this.state.profile:', this.state.profile)
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  submitPlayerProfile = (event) => {
    event.preventDefault();
    console.log('Player profile submitted.');
    this.toggleDisplay();
    console.log('this.state.profile:', this.state.profile)

    axios({
      method: 'PUT',
      url: '/api/players/updateProfile/' + this.props.user.id,
      data: this.state.profile,
      success: function (response) {
        console.log('update profile response: ', response)
      }
    });
  }



  render() {
    let content = null;
    let positionalContent = null;
    let playerScreenContent = null;

    if (this.props.player.playerInfo) {
      content = (
        <div>
          <h1>test works</h1>
        </div>
      );
    } else {
      content = (
        <div>
          <p>loading...</p>
        </div>

      );
    }
    return (
      <div className="mainContainer">
        <Nav />
        <div className="pageContainer">
          {content}
        </div>

      </div>
    )



  }



}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PlayerProfileDisplay);