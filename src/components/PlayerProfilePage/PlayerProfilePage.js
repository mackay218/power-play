import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import './PlayerProfilePage.css';

import axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  player: state.player,
});


class PlayerProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {

      profile :
       {
      person_id: this.props.user.id,
      league_id: '',
      team_id: '',
      school: '',
      position_id: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      birth_date: '',
      height: '',
      weight: '',
      gpa: '',
      act_score: '',
      school_year: '',
      video_link: '',
      goals: '',
      assists: '',
      points: '',
      games_played: '',
      wins: '',
      losses: '',
      ties: '',
      save_percent: '',
      shutouts: '',
      goals_against: '',
      guardian: false,
      player_info: '',
      },
      
      toggleView: false,
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: 'GET_THIS_PLAYER' });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('landing_page');
    }
  }

  handleChange = (event) => {
    this.setState({
      ...this.state.profile,
      [event.target.name]: event.target.value,
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
 
      // axios({
      //     method: 'PUT',
      //     url: '/api/players/updateProfile' + userId,
      //     data: this.state.profile,
      //     success: function (response) {
      //         console.log('update avatar response: ', response)
      //     }
      // });
    
  }

  toggleDisplay = () => {
    this.setState({
      ...this.state,
      toggleView: !this.state.toggleView
    })
   console.log(this.state.toggleView);

  }

  render() {
    let content = null;
    let positionalContent = null;
    let playerScreenContent = null;
    
     {
      playerScreenContent = (
        <div className="playerProfileContainer">
        <div>
          {JSON.stringify(this.props.player)}
          <p>{this.state.person_id} {this.state.league_id}{this.state.team_id}</p>
        </div>
          <div>
            <button onClick={this.toggleDisplay}>shit</button>
          </div>
        </div>
      )}

    if (this.state.position_id === '3') {
      positionalContent = (
        <div>
          <div>
            <label>Goalie Options:</label>
            <input type="number" placeholder="Wins"></input>
            <input type="number" placeholder="Losses"></input>
            <input type="number" placeholder="Ties"></input>
          </div>
          <div>
            <input type="number" placeholder="Save %"></input>
            <input type="number" placeholder="Shutouts"></input>
            <input type="number" placeholder="Goals Against"></input>
            <input type="number" placeholder="Games Played"></input>
          </div>
        </div>
      )
    } else if (this.state.profile.position_id === '2' || this.state.profile.position_id === '1') {
      positionalContent = (
        <div>
          <div>
            <label>Skater Options:</label>
            <input type="number" placeholder="Goals"></input>
            <input type="number" placeholder="Assists"></input>
            <input type="number" placeholder="Points"></input>
          </div>
          <div>
            <input type="number" placeholder="Games Played"></input>
          </div>
        </div>
      )
    }
    if (this.props.user.email) {
      content = (
        <div>
          <h1 className="center-text">Enter Information</h1>
          <form className="playerForm" onSubmit={this.submitPlayerProfile}>
            <div>
              <input type="text" placeholder="First Name"></input>
              <input type="text" placeholder="Last Name"></input>
              <input type="text" placeholder="School"></input>
            </div>
            <div>
              <input type="text" placeholder="Email"></input>
              <input type="number" placeholder="Phone Number"></input>
              <select>
                <option value="Grade">Grade</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>
            <div>
              <input type="number" placeholder="GPA"></input>
              <input type="text" placeholder="Weight"></input>
              <select value={this.state.profile.position_id} onChange={this.handleChange} name="position_id">
                <option value="">Position</option>
                <option value="1">Forward</option>
                <option value="2">Defence</option>
                <option value="3">Goalie</option>
              </select>
            </div>
            <div>
              <input placeholder="Video URL"></input>
              <select value={this.state.profile.league_id} onChange={this.handleChange} name="league_id">
                <option value="">League</option>
                <option value="1">1A</option>
                <option value="2">2A</option>
                <option value="3">3A</option>
                <option value="4">4A</option>
                <option value="5">5A</option>
                <option value="6">6A</option>
                <option value="7">7A</option>
                <option value="8">8A</option>
                <option value="9">1AA</option>
                <option value="10">2AA</option>
                <option value="11">3AA</option>
                <option value="12">4AA</option>
                <option value="13">5AA</option>
                <option value="14">6AA</option>
                <option value="15">7AA</option>
                <option value="16">8AA</option>
              </select>
              <label>Date Of Birth:</label>
              {/* (WE WILL REPLACE THIS DROP-DOWN WITH A UI-MATERIALS CALENDAR) */}
              <select>
                <option value="">DOB</option>
                <option value="1">Jan, 1956</option>
                <option value="2">Feb, 1776</option>
                <option value="3">March, 2012</option>
              </select>
            </div>
            <div>
              <label>Notes:</label>
              <input></input>
            </div>
            {/* we can implempent an image hosting API for client drag/drop HERE \/ */}
            <div>
              <img src="https://media.istockphoto.com/videos/hockey-player-skates-video-id483200277?s=640x640" alt="hockey puck" height="100" width="100" /><br />
              <button>Add a pic</button>
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
            <div>
              {positionalContent}
            </div>
          </form>
        {/* <div>
          {playerScreenContent}
        </div> */}
        </div>
      );
    }

    if (this.state.toggleView === false) {
      return (
        <div>
          {playerScreenContent}
        </div>
      )
    }else {

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
    }
  }
  

  
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PlayerProfilePage);