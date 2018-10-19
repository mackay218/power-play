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
        league_id: null,
        team_id: null,
        school_name: null,
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
  
    if(this.props.player.length > 0 && this.state.position_id === null){
      this.setState({
        person_id: this.props.user.id,
        league_id: this.props.player.league_id,
        team_name: this.props.player.team_name,
        school_name: this.props.player.school_name,
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
            <h1>Enter Information</h1>
            <form onSubmit={this.submitPlayerProfile} onChange={this.handleProfileChange}>
              <div className="playerFormSection">
                <TextField type="text" label="First Name" value={this.state.first_name} onChange={this.handleProfileChange} name="first_name" />
                <TextField type="text" label="Last Name" value={this.state.last_name} onChange={this.handleProfileChange} name="last_name" />
                <TextField type="text" label="School" value={this.state.school} onChange={this.handleProfileChange} name="school" />
                <TextField type="text" label="Team" value={this.state.team_name} onChange={this.handleProfileChange} name="team_id" />
                <TextField type="text" label="Email" />
                <TextField type="number" label="Phone Number" value={this.state.phone_number} onChange={this.handleProfileChange} name="phone_number" />
              </div>
              <div className="playerFormSection">
                <FormControl>
                  <InputLabel>Grade</InputLabel>
                  <Select value={this.state.grade} onChange={this.handleProfileChange} name="grade">
                    <MenuItem value="Grade">Grade</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="11">11</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                    <MenuItem value="Graduate">Graduate</MenuItem>
                  </Select>
                </FormControl>
                <TextField type="number" label="GPA" value={this.state.gpa} onChange={this.handleProfileChange} name="gpa" />
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
                    defaultValue="2017-05-24"
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
                <Button variant="contained" color="secondary" type="submit">Submit</Button>
              </div>
              <div>
                {positionalContent}
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
            {JSON.stringify(this.state)}
            {content}


          </div>
        </div>
      );
    
  }
  //   else {
  //     return (<div>loading</div>)
  //   }
  // }





}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PlayerProfilePage);