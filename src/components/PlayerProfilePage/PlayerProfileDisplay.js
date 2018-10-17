import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import './PlayerProfilePage.css';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


import PlayerProfileDialog from './PlayerProfileDialog';



const mapStateToProps = state => ({
  user: state.user,
  player: state.player.player,
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

      //Main display for the player's profile
      // playerScreenContent = (
      //   <div className="display">
      //     <div>
      //       {/* <Image className="profilePic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdOlQy6phKYtRd7nc9Ow1m0GWOML-yUM8Tt1te62LT-8eIcS84w" alt="Avatar" /> */}
      //       {/* className="container" */}
      //       <div>
      //         <h4>{this.props.player}</h4>
      //       </div>
      //     </div>
      //     {/* className="playerProfileContainer" */}
      //     <div>
      //       <Paper>
      //         <Table>
      //           <TableHead className="table-head">
      //             <TableRow>
      //               <TableCell>First Name</TableCell>
      //               <TableCell>Last Name</TableCell>
      //               <TableCell>Birthdate</TableCell>
      //               <TableCell>School</TableCell>
      //               <TableCell>Grade</TableCell>
      //               <TableCell>GPA</TableCell>
      //               <TableCell>League</TableCell>
      //               <TableCell>Team</TableCell>
      //             </TableRow>
      //           </TableHead>
      //           <TableBody>
      //             <TableRow>
      //               <TableCell>{this.state.profile.last_name}</TableCell>
      //               <TableCell>{this.state.profile.first_name}</TableCell>
      //               <TableCell>{this.state.profile.birth_date}</TableCell>
      //               <TableCell>{this.state.profile.points}</TableCell>
      //               <TableCell>{this.state.profile.wins}</TableCell>
      //               <TableCell>{this.state.profile.wins}</TableCell>
      //               <TableCell>{this.state.profile.wins}</TableCell>
      //               <TableCell>{this.state.profile.wins}</TableCell>
      //             </TableRow>
      //           </TableBody>
      //         </Table>
      //         <Table>
      //           <TableHead className="table-head">
      //             <TableRow>
      //               <TableCell>Position</TableCell>
      //               <TableCell>Weight</TableCell>
      //               <TableCell>Goals</TableCell>
      //               <TableCell>Assists</TableCell>
      //               <TableCell>Points</TableCell>
      //               <TableCell>Games Played</TableCell>
      //             </TableRow>
      //           </TableHead>
      //           <TableBody>
      //             <TableRow>
      //               <TableCell>{this.state.person_id}</TableCell>
      //               <TableCell>{this.state.profile.position_id}</TableCell>
      //               <TableCell>{this.state.profile.birth_date}</TableCell>
      //               <TableCell>{this.state.profile.points}</TableCell>
      //               <TableCell>{this.state.profile.wins}</TableCell>
      //               <TableCell>{this.state.profile.wins}</TableCell>
      //             </TableRow>
      //           </TableBody>
      //         </Table>
      //         <Table>
      //           <TableHead className="table-head">
      //             <TableRow>
      //               <TableCell>Position</TableCell>
      //               <TableCell>Weight</TableCell>
      //               <TableCell>Wins</TableCell>
      //               <TableCell>Losses</TableCell>
      //               <TableCell>Ties</TableCell>
      //               <TableCell>Save %</TableCell>
      //               <TableCell>Games Played</TableCell>
      //             </TableRow>
      //           </TableHead>
      //           <TableBody>
      //             <TableRow>
      //               <TableCell>{this.state.person_id}</TableCell>
      //               <TableCell>{this.state.profile.position_id}</TableCell>
      //               <TableCell>{this.state.profile.birth_date}</TableCell>
      //               <TableCell>{this.state.profile.points}</TableCell>
      //               <TableCell>{this.state.profile.wins}</TableCell>
      //               <TableCell>{this.state.profile.wins}</TableCell>
      //               <TableCell>{this.state.profile.wins}</TableCell>
      //             </TableRow>
      //           </TableBody>
      //             {/* <PlayerProfileDialog /> */}
      //         </Table>
      //       </Paper>
      //     </div>
      //   </div>

      // )

    let profilePic = null;

    if(this.state.profile.image_path){
      profilePic = (
        <img src={this.state.profile.image_path} />
      )
    }
    else{
      profilePic = (
        <img src="https://eadb.org/wp-content/uploads/2015/08/profile-placeholder.jpg" 
            alt="placeholder pic" 
        />
      )
    }

    let firstName = null;
    if(this.state.profile.first_name){
      firstName = (
        <h4>{this.state.profile.first_name}</h4>
      )
    }
    else{
      firstName = (
        <h4>First Name</h4>
      )
    }

    let lastName = null;
    if(this.state.profile.last_name){
      lastName = (
        <h4>{this.state.profile.last_name}</h4>
      )
    }
    else{
      lastName = (
        <h4>Last Name</h4>
      )
    }

    let birthDate = null;
    if(this.state.profile.birth_date){
      birthDate = (
        <h4>{this.state.profile.birth_date}</h4>
      )
    }
    else{
      birthDate = (
        <h4>01/01/01</h4>
      )
    }

    let playerPosition = null;

    let positionStats = null;

    if(this.state.profile.position_id === 1){
      playerPosition = (
        <h3>Forward</h3>
      );
      positionStats = (
        <div className="positionStats">
          <p>Goals: {this.state.profile.goals}</p>
          <p>Assists: {this.state.profile.assists}</p>
          <p>Points: {this.state.profile.points}</p>
          <p>Games Played: {this.state.profile.games_played}</p>
        </div>
      )
    }
    else if(this.state.profile.position_id === 2){
      playerPosition = (
        <h3>Defense</h3>
      )
      positionStats = (
        <div className="positionStats">
          <p>Goals: {this.state.profile.goals}</p>
          <p>Assists: {this.state.profile.assists}</p>
          <p>Points: {this.state.profile.points}</p>
          <p>Games Played: {this.state.profile.games_played}</p>
        </div>
      )
    }
    else if(this.state.profile.position_id === 3){
      playerPosition = (
        <h3>Goalie</h3>
      )
      positionStats = (
        <div className="positionStats">
          <p>Wins: {this.state.profile.wins}</p>
          <p>Losses: {this.state.profile.losses}</p>
          <p>Ties: {this.state.profile.ties}</p>
          <p>Games Played: {this.state.profile.games_played}</p>
          <p>Save %: {this.state.profile.save_percent}%</p>
          <p>Goals Against: {this.state.profile.goals_against}</p>
        </div>
      )
    }
    else{
      playerPosition = (
        <h3>Player Position</h3>
      )
      positionStats = (
        <div className="positionStats">
          <p>Goals: 0</p>
          <p>Assists: 0</p>
          <p>Points: 0</p>
          <p>Wins: 0</p>
          <p>Losses: 0</p>
          <p>Ties: 0</p>
          <p>Games Played: 0</p>
          <p>Save %: 0%</p>
          <p>Goals Against: 0</p>
        </div>
      )
    }

   


      playerScreenContent = (
        <div className="display">
          <div className="infoContainer">
            <div className="profilePicContainer">
              {profilePic}
            </div>
            <div className="infoContainer">
              {lastName}
              {firstName}
              {birthDate}
            </div>
          </div>
          <div className="infoContainer">
              {playerPosition}
              {positionStats}
            <iframe id="player" type="text/html" width="640" height="390"
              src="http://www.youtube.com/embed/dwDpSKDyKRU?enablejsapi=1&origin=http://example.com"
              frameborder="0"></iframe>
          </div>
        </div>
      )



    if (this.state.toggleView === false) {
      return (
        <div className="mainContainer"
          style={{ backgroundImage: 'url("./images/ice-background.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no repeat' }}
        >
          <Nav />
          <div className="pageContainer">
            {playerScreenContent}
            <PlayerProfileDialog />
          </div>
        </div>
      )
    } else {

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
  //   else {
  //     return (<div>loading</div>)
  //   }
  // }





}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PlayerProfileDisplay);