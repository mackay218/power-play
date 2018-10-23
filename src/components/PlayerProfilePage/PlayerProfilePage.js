import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import './PlayerProfilePage.css';
import swal from 'sweetalert';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import ReactFilestack from 'filestack-react';

const mapStateToProps = state => ({
  user: state.user,
  player: state.player,
});



//USED FOR FILESTACK -- 
const options = {
  accept: 'image/*',
  maxFiles: 1,
  storeTo: {
    location: 's3',
  },
};


class PlayerProfilePage extends Component {
 
  //Function to get image from filestack 
  getImage = (result) => {
    console.log('filestack submitted', result.filesUploaded);
    swal('Image added!');
    
    const action = {
      type: 'SET_PLAYER_INFO', payload: {
        ...this.props.player.playerInfo,
        image_path: result.filesUploaded[0].url,
      }
    }
    this.props.dispatch(action);
  }


  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });

    
  }

  componentDidUpdate() {
    // If statement to redirect users to their respective main pages
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
  // Function for handling changes in player info form
  handleProfileChange = (event) => {
    const action = {type: 'SET_PLAYER_INFO', payload:{
      ...this.props.player.playerInfo,
      [event.target.name]: event.target.value,
    }}
    this.props.dispatch(action);
  }
  // Function for loggin the user out of the site
  logout = () => {
    this.props.dispatch(triggerLogout());
  }
  // Function to update the players information
  submitPlayerProfile = (event) => {
    event.preventDefault();
    console.log('Player profile submitted.');
    console.log('this.state.profile:', this.state)
    // Sends information to update the player
    axios({
      method: 'PUT',
      url: '/api/players/updateProfile/' + this.props.user.id,
      data: this.props.player.playerInfo,
    }).then(() => {
      swal('Your profile was updated!');
      // Gets the updated information to display on the profile page
      this.props.dispatch({ type: 'GET_PLAYER_INFO', payload: this.props.user.id });
      this.props.handleClose();
    }).catch((error) => {
      swal('There was an error updating your profile!');
      console.log('ERROR', error);
    });
  }

  // Function used in presentation to fill out the player info form quickly
  // Should be deleted before sent to production
  easyFill = () => {
    console.log('In easyFill');
    let body = {
      person_id: this.props.user.id,
      league_id: '5',
      team_name: 'The White Hawks',
      school_name: 'Mount West Tonka',
      position_id: '4',
      first_name: 'Billy',
      last_name: 'Remington',
      phone_number: 6514438876,
      birth_date: '2000-12-12',
      height: `6'4''`,
      weight: '175lb',
      gpa: '4.0',
      act_score: 31,
      school_year: '12',
      video_link: 'https://www.youtube.com/watch?v=naUgrBOozsk',
      goals: 0,
      assists: 0,
      points: 0,
      games_played: 14,
      wins: 12,
      losses: 2,
      ties: 0,
      save_percent: '90.1%',
      shutouts: 4,
      goals_against: 15,
      guardian: true,
      player_info: 'I\'ve been starting at the goalie position at Mount West Tonka for the last three years, Each year I have been getting better at the position and have been going to Michael Bowman Hockey Camp over the summers. I focus on my academics an equal amount as I focus on my hockey career. I am looking forward to a tryout with you and your team!',
      email: this.props.user.email,
    };

    const action = { type: 'SET_PLAYER_INFO', payload: body };

    this.props.dispatch(action);
  }

  render() {

    let playerInfo = this.props.player.playerInfo;

    let content = null;
    let positionalContent = null;
    if (playerInfo.position_id === '4') {
      //Sets additional inputs if the player selects goalie as their position
      positionalContent = (
        <div className="align-left">
          <div>
            <label>Goalie Options:</label>
            <br />
            <TextField type="number" label="Wins" value={playerInfo.wins} onChange={this.handleProfileChange} name="wins" />
            <TextField type="number" label="Losses" value={playerInfo.losses} onChange={this.handleProfileChange} name="losses" />
            <TextField type="number" label="Ties" value={playerInfo.ties} onChange={this.handleProfileChange} name="ties" />
          </div>
          <div>
            <TextField type="text" label="Save %" value={playerInfo.save_percent} onChange={this.handleProfileChange} name="save_percent" />
            <TextField type="number" label="Shutouts" value={playerInfo.shutouts} onChange={this.handleProfileChange} name="shutouts" />
            <TextField type="number" label="Goals Against" value={playerInfo.goals_against} onChange={this.handleProfileChange} name="goals_against" />
            <TextField type="number" label="Games Played" value={playerInfo.games_played} onChange={this.handleProfileChange} name="games_played" />
          </div>
        </div>
      )
    } else if (playerInfo.position_id === '3' || playerInfo.position_id === '2') {
      //Sets additional inputs if the player selects forward or defense as their position
      positionalContent = (
        <div className="align-left">
          <div>
            <label>Skater Options:</label>
            <br />
            <TextField type="number" label="Goals" value={playerInfo.goals} onChange={this.handleProfileChange} name="goals" />
            <TextField type="number" label="Assists" value={playerInfo.assists} onChange={this.handleProfileChange} name="assists" />
            <TextField type="number" label="Points" value={playerInfo.points} onChange={this.handleProfileChange} name="points" />
          </div>
          <div>
            <TextField type="number" label="Games Played" value={playerInfo.games_played} onChange={this.handleProfileChange} name="games_played" />
          </div>
        </div>
      )
    }
    if (this.props.user.email) {
      content = (
        <div>
          {/* <Image className="profilePic" src="https://eadb.org/wp-content/uploads/2015/08/profile-label.jpg" alt="Avatar" /> */}
          <div>
            {/* On click to run the easy fill function (onClick should be removed before being sent to production) */}
            <h1 onClick={this.easyFill} className="center-text">Enter Information</h1>
            <br />
            {/* Form for updating player information */}
            <form onSubmit={this.submitPlayerProfile} onChange={this.handleProfileChange} className="info-form">
              <Grid container>
                <Grid item md={1}></Grid>
                <Grid item md={4}>
                  <div className="playerFormSection">
                    <TextField type="text" label="First Name" value={playerInfo.first_name} onChange={this.handleProfileChange} name="first_name" />
                    <TextField type="text" label="Last Name" value={playerInfo.last_name} onChange={this.handleProfileChange} name="last_name" />
                    <TextField type="text" label="School" value={playerInfo.school_name} onChange={this.handleProfileChange} name="school_name" />
                    <TextField type="text" label="Team" value={playerInfo.team_name} onChange={this.handleProfileChange} name="team_name" />
                    {/* CAN ADD EMAIL EDITING IN LATER */}
                    {/* <TextField type="text" label="Email" value={this.props.user.email} name="email"/> */}
                    <TextField type="number" label="Phone Number" value={playerInfo.phone_number} onChange={this.handleProfileChange} name="phone_number" />
                  </div>
                  <div className="playerFormSection">
                    <FormControl>
                      <InputLabel>Grade</InputLabel>
                      <Select value={playerInfo.school_year} onChange={this.handleProfileChange} name="school_year" className="align-left">
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="11">11</MenuItem>
                        <MenuItem value="12">12</MenuItem>
                        <MenuItem value="13">Graduate</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField type="text" label="GPA" value={playerInfo.gpa} onChange={this.handleProfileChange} name="gpa" />
                    <TextField type="text" label="Weight" value={playerInfo.weight} onChange={this.handleProfileChange} name="weight" />
                    <TextField type="text" label="Height" value={playerInfo.height} onChange={this.handleProfileChange} name="height" />
                    <FormControl>
                      <InputLabel>Position</InputLabel>
                      <Select value={playerInfo.position_id} onChange={this.handleProfileChange} name="position_id" className="align-left">
                        <MenuItem value="2">Forward</MenuItem>
                        <MenuItem value="3">Defence</MenuItem>
                        <MenuItem value="4">Goalie</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
                <Grid item md={1}></Grid>
                <Grid item md={4}>
                  <div className="playerFormSection">
                    <TextField label="Video URL" value={playerInfo.video_link} onChange={this.handleProfileChange} name="video_link" />
                    <FormControl>
                      <InputLabel>League</InputLabel>
                      <Select value={playerInfo.league_id} onChange={this.handleProfileChange} name="league_id" className="align-left" required>
                        <MenuItem value="2">1A</MenuItem>
                        <MenuItem value="3">2A</MenuItem>
                        <MenuItem value="4">3A</MenuItem>
                        <MenuItem value="5">4A</MenuItem>
                        <MenuItem value="6">5A</MenuItem>
                        <MenuItem value="7">6A</MenuItem>
                        <MenuItem value="8">7A</MenuItem>
                        <MenuItem value="9">8A</MenuItem>
                        <MenuItem value="10">1AA</MenuItem>
                        <MenuItem value="11">2AA</MenuItem>
                        <MenuItem value="12">3AA</MenuItem>
                        <MenuItem value="13">4AA</MenuItem>
                        <MenuItem value="14">5AA</MenuItem>
                        <MenuItem value="15">6AA</MenuItem>
                        <MenuItem value="16">7AA</MenuItem>
                        <MenuItem value="17">8AA</MenuItem>
                      </Select>
                    </FormControl>
                    <label>Date Of Birth:</label>
                    <FormControl>
                      <TextField
                        value={playerInfo.birth_date} onChange={this.handleProfileChange} name="birth_date"
                        type="date"
                      />
                    </FormControl>
                  </div>
                  <div className="playerFormSection">
                    <label>Notes:</label>
                    <TextField value={playerInfo.player_info} onChange={this.handleProfileChange} name="player_info" />
                  </div>
                  <br />
                  <div>
                    {/* Changes inputs based on position chosen, if none are chosen nothing is displayed here. */}
                    {positionalContent}
                  </div>
                  <div className="fileStackContainer">
                    <ReactFilestack
                      className="input-width filestack"
                      apikey='AwwYnOWkHRtWpGXbTjLIyz'
                      buttonText="Upload an Image"
                      options={options}
                      onSuccess={this.getImage}
                    />
                  </div>
                  <div className="submitButton">
                    <Button variant="contained" color="secondary" type="submit">Submit</Button>
                  </div>
                </Grid>
                <Grid item md={1}></Grid>
              </Grid>
            </form>
            {/* 
              <form>
            
            
            */}
          </div>
        </div>
      );
    }

    return (
      <div className="mainContainer"
        // Sets background image for the site
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
export default connect(mapStateToProps)(PlayerProfilePage);