import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import './PlayerProfilePage.css';
import axios from 'axios'
import Button from '@material-ui/core/Button'

const mapStateToProps = state => ({
  user: state.user,
  player: state.player.player,
});


class PlayerProfilePage extends Component {
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
    this.props.dispatch({ type: 'GET_THIS_PLAYER' });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('landing_page');
    }
    if (!this.props.user.isLoading && this.props.user.role === "coach") {
      this.props.history.push('/players_page');
    }
    if (!this.props.user.isLoading && this.props.user.role === "admin") {
      this.props.history.push('/admin_page');
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
          <div className="card">
            <img className="img" src="https://media.istockphoto.com/videos/hockey-player-skates-video-id483200277?s=640x640" alt="Avatar" />
            <div className="container">
              <h4>{this.state.profile.first_name}<span> </span>{this.state.profile.last_name}</h4> 
            </div>
            <div>
              <p>{this.state.position_id}<span> </span>{this.state.profile.school}<span> </span>{this.state.league_id}</p>
            </div>
            <div>
              <p>{this.state.profile.team_id}<span> </span>{this.state.phone_number}<span> </span>{this.state.birth_date}</p>
            </div>
            <div>
              <p>{this.state.profile.height}<span> </span>{this.state.profile.weight}<span> </span>{this.state.profile.gpa}</p>
            </div>
            <div>
              <p>{this.state.profile.act_score}<span> </span>{this.state.profile.school_year}<span> </span>{this.state.profile.games_played}</p>
            </div>
            <div>
              <p>{this.state.profile.wins}<span> </span>{this.state.profile.losses}<span> </span>{this.state.profile.ties}</p>
            </div>
            <div>
              <p>{this.state.profile.save_percent}<span> </span>{this.state.profile.shutouts}<span> </span>{this.state.profile.goals_against}</p>
            </div>
            <div>
              <p>{this.state.profile.goals}<span> </span>{this.state.profile.assists}<span> </span>{this.state.profile.points}</p>
            </div>
              <p>{this.state.profile.player_info}</p>
            <div>
            <div className="videoContainer">

            </div>
              <Button onClick={this.toggleDisplay} variant="contained" color="primary">test</Button>
              {/* {JSON.stringify(this.props.player)} */}
            </div>
          </div>
          

      )
    }

    if (this.state.position_id === '3') {
      positionalContent = (
        <div>
          <div>
            <label>Goalie Options:</label>
            <input type="number" placeholder="Wins" value={this.state.profile.wins} onChange={this.handleProfileChange} name="wins"></input>
            <input type="number" placeholder="Losses" value={this.state.profile.losses} onChange={this.handleProfileChange} name="losses"></input>
            <input type="number" placeholder="Ties" value={this.state.profile.ties} onChange={this.handleProfileChange} name="ties"></input>
          </div>
          <div>
            <input type="number" placeholder="Save %" value={this.state.profile.save_percent} onChange={this.handleProfileChange} name="save_percent"></input>
            <input type="number" placeholder="Shutouts" value={this.state.profile.shutouts} onChange={this.handleProfileChange} name="shutouts"></input>
            <input type="number" placeholder="Goals Against" value={this.state.profile.goals_against} onChange={this.handleProfileChange} name="goals_against"></input>
            <input type="number" placeholder="Games Played" value={this.state.profile.games_played} onChange={this.handleProfileChange} name="games_played"></input>
          </div>
        </div>
      )
    } else if (this.state.profile.position_id === '2' || this.state.profile.position_id === '1') {
      positionalContent = (
        <div>
          <div>
            <label>Skater Options:</label>
            <input type="number" placeholder="Goals" value={this.state.profile.goals} onChange={this.handleProfileChange} name="goals"></input>
            <input type="number" placeholder="Assists" value={this.state.profile.assists} onChange={this.handleProfileChange} name="assists"></input>
            <input type="number" placeholder="Points" value={this.state.profile.points} onChange={this.handleProfileChange} name="points"></input>
          </div>
          <div>
            <input type="number" placeholder="Games Played" value={this.state.profile.games_played} onChange={this.handleProfileChange} name="games_played"></input>
          </div>
        </div>
      )
    }
    if (this.props.user.email) {
      content = (
        <div>
          <h1 className="center-text">Enter Information</h1>
          <form className="playerForm" onSubmit={this.submitPlayerProfile} onChange={this.handleProfileChange}>
            <div>
              <input type="text" placeholder="First Name" value={this.state.profile.first_name} onChange={this.handleProfileChange} name="first_name"></input>
              <input type="text" placeholder="Last Name" value={this.state.profile.last_name} onChange={this.handleProfileChange} name="last_name"></input>
              <input type="text" placeholder="School" value={this.state.profile.school} onChange={this.handleProfileChange} name="school"></input>
            </div>
            <div>
              <input type="text" placeholder="Email"></input>
              <input type="number" placeholder="Phone Number" value={this.state.profile.phone_number} onChange={this.handleProfileChange} name="phone_number"></input>

              <select value={this.state.profile.grade} onChange={this.handleProfileChange} name="grade">
                <option value="Grade">Grade</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>
            <div>
              <input type="number" placeholder="GPA" value={this.state.profile.gpa} onChange={this.handleProfileChange} name="gpa"></input>
              <input type="text" placeholder="Weight" value={this.state.profile.weight} onChange={this.handleProfileChange} name="weight"></input>

              <select value={this.state.profile.position_id} onChange={this.handleProfileChange} name="position_id">
                <option value="">Position</option>
                <option value="1">Forward</option>
                <option value="2">Defence</option>
                <option value="3">Goalie</option>
              </select>
              {JSON.stringify(this.state.profile.position_id)}
            </div>
            <div>
              <input placeholder="Video URL" value={this.state.profile.video_link} onChange={this.handleProfileChange} name="video_link"></input>
              <select value={this.state.profile.league_id} onChange={this.handleProfileChange} name="league_id">
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
              <select value={this.state.profile.birth_date} onChange={this.handleProfileChange} name="birth_date">
                <option value="">DOB</option>
                <option value="1">Jan, 1956</option>
                <option value="2">Feb, 1776</option>
                <option value="3">March, 2012</option>
              </select>
            </div>
            <div>
              <label>Notes:</label>
              <input value={this.state.profile.player_info} onChange={this.handleProfileChange} name="player_info"></input>
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

    // if (this.props.player.length > 0) {

      if (this.state.toggleView === false) {
        return (
          <div>
            {playerScreenContent}
          </div>
        )
      } else {

        return (
          <div>
            <Nav />
            {content}
          </div>
        );
      }
    }
  //   else {
  //     return (<div>loading</div>)
  //   }
  // }





}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PlayerProfilePage);