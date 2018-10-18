import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import './PlayerProfilePage.css';
import axios from 'axios';
import ReactDOM from 'react-dom';


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

  scrollPosition = 0

  componentWillReceiveProps() {
    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      this.scrollPosition = window.scrollY
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      window.scrollTo(0, this.scrollPosition)
    }
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
    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      window.scrollTo(0, this.scrollPosition)
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
        alt="placeholder image" />
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
    let playerBio = (
      <p>Player Info: I am awesome, pick ME!!!!</p>
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

    let goals = (
      <p>Goals: 0</p>
    );

    let assists = (
      <p>Assists: 0</p>
    );

    let points = (
      <p>Points: 0</p>
    );

    let gamesPlayed = (
      <p>Games Played: 0</p>
    );

    let savePercent = (
      <p>Save %: 0</p>
    );

    let wins = (
      <p>Wins: 0</p>
    )

    let losses = (
      <p>Losses: 0</p>
    );

    let ties = (
      <p>Ties: 0</p>
    );

    let shutouts = (
      <p>Shutouts: 0</p>
    );

    let goalsAgainst = (
      <p>Goals Against: 0</p>
    );



    if (playerInfo) {
      //if picture link has been provided
      if (playerInfo.image_path) {
        profilePic = (
          <img src={playerInfo.image_path} />
        );
      }
      //if last name have been provided
      if (playerInfo.last_name) {
        lastName = (
          <h4>{playerInfo.last_name}</h4>
        );
      }
      if (playerInfo.first_name) {
        firstName = (
          <h4>{playerInfo.first_name}</h4>
        )
      }
      if (playerInfo.birth_date) {

        let formatBirthDate = moment(playerInfo.birth_date).format('L');

        birthDate = (
          <p>DOB: {formatBirthDate}</p>
        )
      }
      if (playerInfo.phone_number) {
        phoneNum = (
          <p>phone: {playerInfo.phone_number}</p>
        );
      }
      if (playerInfo.email) {
        emailAddress = (
          <p>email: {playerInfo.email}</p>
        );
      }
      if (playerInfo.school_name) {
        school = (
          <p>school: {playerInfo.school_name}</p>
        );
      }
      if (playerInfo.school_year) {
        schoolYear = (
          <p>School Year: {playerInfo.school_year}</p>
        )
      }
      if (playerInfo.gpa) {
        gpa = (
          <p>GPA: {playerInfo.gpa}</p>
        )
      }
      if (playerInfo.act_score) {
        actScore = (
          <p>ACT: {playerInfo.act_score}</p>
        )
      }
      if (playerInfo.player_info) {
        playerBio = (
          <p>Player Info: {playerInfo.player_info}</p>
        )
      }
      if (playerInfo.position_id === 1) {
        position = (
          <h2>Forward</h2>
        );
      }
      else if (playerInfo.position_id === 2) {
        position = (
          <h2>Defense</h2>
        );
      }
      else if (playerInfo.position_id === 3) {
        position = (
          <h2>Goalie</h2>
        );
      }

      if (playerInfo.team_name) {
        teamName = (
          <p>Team: {playerInfo.team_name}</p>
        );
      }

      if (playerInfo.league_name) {
        league = (
          <p>League: {playerInfo.league_name}</p>
        )

      }

      if (playerInfo.height) {
        height = (
          <p>Height: {playerInfo.height}</p>
        );
      }

      if (playerInfo.weight) {
        weight = (
          <p>Weight: {playerInfo.weight}</p>
        );
      }
      if (playerInfo.goals) {
        goals = (
          <p>Goals: {playerInfo.goals}</p>
        );
      }

      if (playerInfo.assists) {
        goals = (
          <p>Assists: {playerInfo.assists}</p>
        );
      }

      if (playerInfo.points) {
        points = (
          <p>Points: {playerInfo.points}</p>
        );
      }

      if (playerInfo.games_played) {
        gamesPlayed = (
          <p>Games Played: {playerInfo.games_played}</p>
        );
      }

      if (playerInfo.save_percent) {
        savePercent = (
          <p>Save Percent: {playerInfo.save_percent}</p>
        );
      }

      if (playerInfo.wins) {
        wins = (
          <p>Wins:</p>
        )
      }

      if (playerInfo.losses) {
        losses = (
          <p>Losses:</p>
        )
      }

      if (playerInfo.ties) {
        ties = (
          <p>Ties:</p>
        )
      }

      if (playerInfo.shutouts) {
        shutouts = (
          <p>Shutouts:</p>
        )
      }

      if (playerInfo.goals_against) {
        goalsAgainst = (
          <p>Goals Against:</p>
        )
      }

      let videoPlayer = (
        <iframe id="player" type="text/html" width="640" height="390"
          allowFullScreen="allowFullScreen"
          src="http://www.youtube.com/embed/dwDpSKDyKRU?enablejsapi=1&origin=http://example.com"
          frameborder="0"></iframe>

      )

      if (this.props.player.video_link) {
        let videoCode = this.props.player.video_link;

        videoCode = videoCode.split('=');
        videoCode = videoCode[1];

        let videoUrl = `http://www.youtube.com/embed/${videoCode}?enablejsapi=1&origin=http://example.com`;

        videoPlayer = (
          <iframe id="player" type="text/html" width="640" height="390"
            allowFullScreen="allowFullScreen"
            src={videoUrl}
            frameborder="0"></iframe>
        )

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
              {playerBio}
              <PlayerProfileDialog />
            </div>
          </div>
          <div className="infoContainer">
            {position}
            {teamName}
            {league}
            {height}
            {weight}
            {goals}
            {assists}
            {points}
            {gamesPlayed}
            {savePercent}
            {wins}
            {losses}
            {ties}
            {shutouts}
            {goalsAgainst}
          </div>
          <div>
            {videoPlayer}
          </div>
        </div>
      );
    }
    else {
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