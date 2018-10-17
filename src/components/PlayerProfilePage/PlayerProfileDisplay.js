import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import './PlayerProfilePage.css';
import axios from 'axios';

import moment from 'moment';

import Button from '@material-ui/core/Button';


import PlayerProfileDialog from './PlayerProfileDialog';

const mapStateToProps = state => ({
  user: state.user,
  player: state.player,
});

let loadedPlayer = false;

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
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('landing_page');
    }
    // Done loading the user, the user exists and the player info hasn't been loaded
    if (!this.props.user.isLoading && this.props.user.email !== null && !loadedPlayer) {
      loadedPlayer = true;
      this.props.dispatch({ type: 'GET_PLAYER_INFO', payload: this.props.user.id })
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
    let playerInfo = this.props.player.playerInfo;
    
    let content = null;

    //placeholder profile pic
    let profilePic = (
      <img src="https://eadb.org/wp-content/uploads/2015/08/profile-placeholder.jpg" 
      alt="placeholder image"/>
    )

    let lastName = (
      <p>Last Name</p>
    );

    let firstName = (
      <p>First Name</p>
    );

    let birthDate = (
      <p>DOB: 01/01/01</p>
    );

    let phoneNum = (
      <p>phone: 555-555-5555</p>
    );

    let emailAddress = (
      <p>email: johnDoe@example.com</p>
    )

    let school = null;
    let schoolYear = null;
    let gpa = null;
    let actScore = null;

    let position = (
      <h2>Hockey Player</h2>
    );

    let teamName = (
      <p>Team: </p>
    );

    let league = (
      <p>League: </p>
    );

    let height = (
      <p>Height: </p>
    );

    let weight = (
      <p>Weight: </p>
    );

    if(playerInfo){
      //if picture link has been provided
      if(playerInfo.image_path){
        profilePic = (
          <img src={playerInfo.image_path}/>
        );
      }  
      //if last name have been provided
      if(playerInfo.last_name){
        lastName = (
          <h4>{playerInfo.last_name}</h4>
        );
      }
      if(playerInfo.first_name){
        firstName = (
          <h4>{playerInfo.first_name}</h4>
        )
      }
      if(playerInfo.birth_date){

        let formatBirthDate = moment(playerInfo.birth_date).format('L');

        birthDate = (
          <p>DOB: {formatBirthDate}</p>
        )
      }
      if(playerInfo.phone_number){
        phoneNum = (
          <p>phone: {playerInfo.phone_number}</p>
        );
      }
      if(playerInfo.email){
        emailAddress = (
          <p>email: {playerInfo.email}</p>
        );
      }
      if(playerInfo.school_name){
        school = (
          <p>school: {playerInfo.school_name}</p>
        );
      }
      if(playerInfo.school_year){
        schoolYear = (
          <p>School Year: {playerInfo.school_year}</p>
        )
      }
      if(playerInfo.gpa){
        gpa = (
          <p>GPA: {playerInfo.gpa}</p>
        )
      }
      if(playerInfo.act_score){
        actScore = (
          <p>ACT: {playerInfo.act_score}</p>
        )
      }
      if(playerInfo.position_id === 1){
        position = (
          <h2>Forward</h2>
        );
      } 
      else if(playerInfo.position_id === 2){
        position = (
          <h2>Defense</h2>
        );
      }
      else if(playerInfo.position_id === 3){
        position = (
          <h2>Goalie</h2>
        );  
      }
      
      if(playerInfo.team_name){
        teamName = (
          <p>Team: {playerInfo.team_name}</p>
        );
      }

      if(playerInfo.league_name){
        league = (
          <p>League: {playerInfo.league_name}</p>
        )
        
      }

      if(playerInfo.height){
        height = (
          <p>Height: {playerInfo.height}</p>
        );
      }

      if(playerInfo.weight){
        weight = (
          <p>Weight: {playerInfo.weight}</p>
        );
      }

      content = (
        <div className="profileContainer">
          <div className="infoContainer">
            <div className="profilePicContainer">
              {profilePic}
            </div>
            <div className="personInfo">
              {firstName}
              {lastName}
              {birthDate}
              {phoneNum}
              {emailAddress}
              {school}
              {schoolYear}
              {gpa}
              {actScore}
            </div>
          </div>
          <div className="infoContainer">
            {position}
            {teamName}
            {league}
            {height}
          </div>
          <PlayerProfileDialog/>
        </div>
      );
    }
    else{
      content = (
        <div>
          <p>loading...</p>
        </div>
      )
    }

  return (
      <div className="mainContainer"
        style={{ backgroundImage: 'url("./images/ice-background.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no repeat' }}
      >
        <Nav/>
        <div className="pageContainer">
          {content}
        </div>
      </div>
    )
     
  }
  

}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PlayerProfileDisplay);