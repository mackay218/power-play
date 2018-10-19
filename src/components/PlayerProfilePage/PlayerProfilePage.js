import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import './PlayerProfilePage.css';

import axios from 'axios';
//import Grid from '@material-ui/core/Grid';
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
  constructor(props) {
    super(props);
    this.state = {
      person_id: this.props.user.id,
      league_id: '',
      team_id: '',
      school_id: '',
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
      guardian: '',
      player_info: '',
    }
  }

  //Function to Get Image 
  getImage = (result) => {
    console.log('filestack submitted', result.filesUploaded);
    alert('Image added!');
    this.setState({
      ...this.state,
      image_path: result.filesUploaded[0].url
    })
    console.log(this.state.image_url);
  }


  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });

    if (this.props.player.length > 0 && this.state.position_id === null) {
      this.setState({
        person_id: this.props.user.id,
        league_id: this.props.player.league_id,
        team_id: this.props.player.team_name,
        school_id: this.props.player.school_id,
        position_id: this.props.player.position_id,
        first_name: this.props.player.first_name,
        last_name: this.props.player.last_name,
        phone_number: this.props.player.phone_number,
        birth_date: this.props.player.birth_date,
        height: this.props.player.height,
        weight: this.props.player.weight,
        gpa: this.props.player.gpa,
        act_score: this.props.player.act_score,
        school_year: this.props.player.school_year,
        video_link: this.props.player.video_link,
        image_path: this.props.player.image_path,
        goals: this.props.player.goals,
        assists: this.props.player.assists,
        points: this.props.player.points,
        games_played: this.props.player.games_played,
        wins: this.props.player.wins,
        losses: this.props.player.losses,
        ties: this.props.player.ties,
        save_percent: this.props.player.save_percent,
        shutouts: this.props.player.shutouts,
        goals_against: this.props.player.goals_against,
        guardian: false,
        player_info: this.props.player.player_info,

      });
    }
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
    console.log('this.state.profile:', this.state)

    axios({
      method: 'PUT',
      url: '/api/players/updateProfile/' + this.props.user.id,
      data: this.state,
      success: function (response) {
        console.log('update profile response: ', response)
      }
    });
  }


  easyFill = () => {
    console.log('In easyFill');
    this.setState({
      person_id: this.props.user.id,
      league_id: '5',
      team_id: '6',
      school_id: '2',
      position_id: "3",
      first_name: "Billy",
      last_name: "The Goat",
      phone_number: 6514438876,
      birth_date: '',
      height: `6'4''`,
      weight: '175lb',
      gpa: '4.0',
      act_score: 31,
      school_year: "12",
      video_link: 'https://www.youtube.com/watch?v=c1iZ_pkOwwU',
      goals: 12,
      assists: 15,
      points: 83,
      games_played: 4,
      wins: 2,
      losses: 2,
      ties: 0,
      save_percent: '',
      shutouts: '',
      goals_against: '',
      guardian: true,
      player_info: 'I am a goat!!',
    })
  }

  render() {
    let content = null;
    let positionalContent = null;
    if (this.state.position_id === '4') {
      positionalContent = (
        <div>
          <div className="playerFormSection">
            <label>Goalie Options:</label>
            <TextField type="number" label="Wins" value={this.state.wins} onChange={this.handleProfileChange} name="wins" />
            <TextField type="number" label="Losses" value={this.state.losses} onChange={this.handleProfileChange} name="losses" />
            <TextField type="number" label="Ties" value={this.state.ties} onChange={this.handleProfileChange} name="ties" />
          </div>
          <div>
            <TextField type="number" label="Save %" value={this.state.save_percent} onChange={this.handleProfileChange} name="save_percent" />
            <TextField type="number" label="Shutouts" value={this.state.shutouts} onChange={this.handleProfileChange} name="shutouts" />
            <TextField type="number" label="Goals Against" value={this.state.goals_against} onChange={this.handleProfileChange} name="goals_against" />
            <TextField type="number" label="Games Played" value={this.state.games_played} onChange={this.handleProfileChange} name="games_played" />
          </div>
        </div>
      )
    } else if (this.state.position_id === '3' || this.state.position_id === '2') {
      positionalContent = (
        <div>
          <div className="playerFormSection">
            <label>Skater Options:</label>
            <TextField type="number" label="Goals" value={this.state.goals} onChange={this.handleProfileChange} name="goals" />
            <TextField type="number" label="Assists" value={this.state.assists} onChange={this.handleProfileChange} name="assists" />
            <TextField type="number" label="Points" value={this.state.points} onChange={this.handleProfileChange} name="points" />
          </div>
          <div>
            <TextField type="number" label="Games Played" value={this.state.games_played} onChange={this.handleProfileChange} name="games_played" />
          </div>
        </div>
      )
    }
    if (this.props.user.email) {
      content = (
        <div>
          {/* <Image className="profilePic" src="https://eadb.org/wp-content/uploads/2015/08/profile-label.jpg" alt="Avatar" /> */}
          <div className="profile-form-container">
            <h1 onClick={this.easyFill}>Enter Information</h1>
            <form onSubmit={this.submitPlayerProfile} onChange={this.handleProfileChange}>
              <div className="playerFormSection">
                <TextField type="text" label="First Name" value={this.state.first_name} onChange={this.handleProfileChange} name="first_name" />
                <TextField type="text" label="Last Name" value={this.state.last_name} onChange={this.handleProfileChange} name="last_name" />
                <FormControl>
                  <InputLabel>School</InputLabel>
                  <Select value={this.state.school_id} onChange={this.handleProfileChange} name="school_id">
                    <MenuItem value="2">East Bradleyview High School</MenuItem>
                    <MenuItem value="3">Huldaport High School</MenuItem>
                    <MenuItem value="4">Yeseniashire High School</MenuItem>
                    <MenuItem value="5">Gorczanyport High School</MenuItem>
                    <MenuItem value="6">South Loren High School</MenuItem>
                    <MenuItem value="7">Bergnaumburgh High School</MenuItem>
                    <MenuItem value="8">East Laila High School</MenuItem>
                    <MenuItem value="9">East Nicholas High School</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel>Team</InputLabel>
                  <Select value={this.state.team_id} onChange={this.handleProfileChange} name="team_id" >
                    <MenuItem value="2">Jacobi Jacks</MenuItem>
                    <MenuItem value="3">Jast Jousters</MenuItem>
                    <MenuItem value="4">Fishers</MenuItem>
                    <MenuItem value="5">Shutout Shutters</MenuItem>
                    <MenuItem value="6">L.A. Kings</MenuItem>
                  </Select>
                </FormControl>
                <TextField type="text" label="Email" value={this.props.user.email} />
                <TextField type="number" label="Phone Number" value={this.state.phone_number} onChange={this.handleProfileChange} name="phone_number" />
              </div>
              <div className="playerFormSection">
                <FormControl>
                  <InputLabel>Grade</InputLabel>
                  <Select value={this.state.school_year} onChange={this.handleProfileChange} name="grade">
                    <MenuItem value="Grade">Grade</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="11">11</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                    <MenuItem value="Graduate">Graduate</MenuItem>
                  </Select>
                </FormControl>
                <TextField type="text" label="GPA" value={this.state.gpa} onChange={this.handleProfileChange} name="gpa" />
                <TextField type="text" label="Weight" value={this.state.weight} onChange={this.handleProfileChange} name="weight" />
                <FormControl>
                  <InputLabel>Position</InputLabel>
                  <Select value={this.state.position_id} onChange={this.handleProfileChange} name="position_id">
                    <MenuItem value="2">Forward</MenuItem>
                    <MenuItem value="3">Defence</MenuItem>
                    <MenuItem value="4">Goalie</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="playerFormSection">
                <TextField label="Video URL" value={this.state.video_link} onChange={this.handleProfileChange} name="video_link" />
                <FormControl>
                  <InputLabel>League</InputLabel>
                  <Select value={this.state.league_id} onChange={this.handleProfileChange} name="league_id">
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
                {/* (WE WILL REPLACE THIS DROP-DOWN WITH A UI-MATERIALS CALENDAR) */}
                <FormControl>
                  <TextField
                    value={this.state.birth_date} onChange={this.handleProfileChange} name="birth_date"
                    type="date"
                  />
                </FormControl>
              </div>
              <div className="playerFormSection">
                <label>Notes:</label>
                <TextField value={this.state.player_info} onChange={this.handleProfileChange} name="player_info" />
              </div>
              {/* we can implempent an image hosting API for client drag/drop HERE \/ */}
              <div className="playerFormSection">

                <ReactFilestack
                  apikey='AwwYnOWkHRtWpGXbTjLIyz'
                  buttonText="Upload an Image"
                  options={options}
                  onSuccess={this.getImage}
                />
              </div>
              <div>
                {positionalContent}
              </div>
              <div>
                <Button variant="contained" color="secondary" type="submit">Submit</Button>
              </div>
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