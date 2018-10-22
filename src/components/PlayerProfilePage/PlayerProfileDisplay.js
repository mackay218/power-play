import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import './PlayerProfilePage.css';
import axios from 'axios';
import ReactDOM from 'react-dom';


import moment from 'moment';




import PlayerProfileDialog from './PlayerProfileDialog';

const mapStateToProps = state => ({
  user: state.user,
  player: state.player,
});

let loadedPlayer = false;
let playerPositionRender = null;

class PlayerProfileDisplay extends Component {
  
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

        alt="placeholder" />

    )

    let lastName = (
      <h1>Last Name</h1>
    );

    let firstName = (
      <h1>First Name</h1>
    );

    let birthDate = (
      <p>DOB: 01/01/01</p>
    );

    let phoneNum = (
      <p>Phone: 555-555-5555</p>
    );

    let emailAddress = (
      <p>Email: johnDoe@example.com</p>
    )
    let playerBio = (
      <p>About me: </p>
    )

    let schoolYear = (
      <p>School Year:</p>
    )

    let school = null;
    // let schoolYear = null;
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

          <img src={playerInfo.image_path} alt="profile pic"/>

        );
      }
      //if last name have been provided
      if (playerInfo.last_name) {
        lastName = (
          <h1>{playerInfo.last_name}</h1>
        );
      }
      if (playerInfo.first_name) {
        firstName = (
          <h1>{playerInfo.first_name}</h1>
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
          <p>Phone: {playerInfo.phone_number}</p>
        );
      }
      if (playerInfo.email) {
        emailAddress = (
          <p>Email: {playerInfo.email}</p>
        );
      }
      if (playerInfo.school_name) {
        school = (
          <p>School: {playerInfo.school_name}</p>
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
          <p>ACT Score: {playerInfo.act_score}</p>
        )
      }
      if (playerInfo.player_info) {
        playerBio = (
          <p>About me: <br/>{playerInfo.player_info}</p>
        )
      }

      if (playerInfo.position_id === 2) {

        position = (
          <h2>Forward</h2>
        );
      }

      else if (playerInfo.position_id === 3) {

        position = (
          <h2>Defense</h2>
        );
      }

      else if (playerInfo.position_id === 4) {

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
          <p>Save Percent: {playerInfo.save_percent}%</p>
        );
      }

      if (playerInfo.wins) {
        wins = (
          <p>Wins: {playerInfo.wins}</p>
        )
      }

      if (playerInfo.losses) {
        losses = (
          <p>Losses: {playerInfo.losses}</p>
        )
      }

      if (playerInfo.ties) {
        ties = (
          <p>Ties: {playerInfo.ties}</p>
        )
      }

      if (playerInfo.shutouts) {
        shutouts = (
          <p>Shutouts: {playerInfo.shutouts}</p>
        )
      }

      if (playerInfo.goals_against) {
        goalsAgainst = (
          <p>Goals Against: {playerInfo.goals_against}</p>
        )
      }

      let videoPlayer = (

        <iframe className="videoSpacing" id="player" type="text/html" width="426" height="260"
          allowFullScreen="allowFullScreen"
          src="http://www.youtube.com/embed/dwDpSKDyKRU?enablejsapi=1&origin=http://example.com"
          frameborder="0"
          title="defaultVideo"
        ></iframe>


      )

      if (playerInfo.video_link) {
        let videoCode = playerInfo.video_link;

        videoCode = videoCode.split('=');
        videoCode = videoCode[1];

        let videoUrl = `http://www.youtube.com/embed/${videoCode}?enablejsapi=1&origin=http://example.com`;

        videoPlayer = (

          <iframe className="videoSpacing" id="player" type="text/html" width="426" height="260"
            allowFullScreen="allowFullScreen"
            src={videoUrl}
            frameborder="0"
            title="playerVideo"
          ></iframe>
        )

      }
      // the following conditionally renders (by either forward, or goalie hockey positions) the stats which are displayed.
      if (playerInfo.position_id === 1 || playerInfo.position_id === 2) {
        playerPositionRender = (
          <div className="personInfo">
            {goals}
            {assists}
            {points}
            {gamesPlayed}
          </div>
        );
      } else {
        playerPositionRender = (
          <div className="personInfo">
            {savePercent}
            {wins}
            {losses}
            {ties}
            {shutouts}
            {goalsAgainst}
          </div>
        );
      }




      content = (
        <div className="profileContainer">
          <div className="infoRow">
              <div className="profilePicContainer">
                {profilePic}
            </div>
            <div className="personInfo infoContainer">
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
            <div className="personInfo infoContainer">
              {position}
              {teamName}
              {league}
              {height}
              {weight}

              {playerPositionRender}
            </div>

          </div>
          
          <div className="infoRow">
            <div className="videoContainer">
              {videoPlayer}
              <PlayerProfileDialog />
            </div>
            <div className="personInfo playerBioArrangement">
              {playerBio}
            </div>
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