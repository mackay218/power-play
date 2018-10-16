import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import './PlayerProfilePage.css';
import axios from 'axios'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';

import InputLabel from '@material-ui/core/InputLabel';





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

      toggleView: true,
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
    // let playerScreenContent = null;

    // {
      //Main display for the player's profile
    //   playerScreenContent = (
    //     <div>
    //       <div>
    //         {/* <Image className="profilePic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdOlQy6phKYtRd7nc9Ow1m0GWOML-yUM8Tt1te62LT-8eIcS84w" alt="Avatar" /> */}
    //         <div className="container">
    //           <h4>{this.props.player}</h4>
    //         </div>
    //       </div>
    //       <div className="playerProfileContainer">
    //         <Paper>
    //           <Table>
    //             <TableHead className="table-head">
    //               <TableRow>
    //                 <TableCell>First Name</TableCell>
    //                 <TableCell>Last Name</TableCell>
    //                 <TableCell>Birthdate</TableCell>
    //                 <TableCell>School</TableCell>
    //                 <TableCell>Grade</TableCell>
    //                 <TableCell>GPA</TableCell>
    //                 <TableCell>League</TableCell>
    //                 <TableCell>Team</TableCell>
    //               </TableRow>
    //             </TableHead>
    //             <TableBody>
    //               <TableRow>
    //                 <TableCell>{this.state.profile.last_name}</TableCell>
    //                 <TableCell>{this.state.profile.first_name}</TableCell>
    //                 <TableCell>{this.state.profile.birth_date}</TableCell>
    //                 <TableCell>{this.state.profile.points}</TableCell>
    //                 <TableCell>{this.state.profile.wins}</TableCell>
    //                 <TableCell>{this.state.profile.wins}</TableCell>
    //                 <TableCell>{this.state.profile.wins}</TableCell>
    //                 <TableCell>{this.state.profile.wins}</TableCell>
    //               </TableRow>
    //             </TableBody>
    //           </Table>
    //           <Table>
    //             <TableHead className="table-head">
    //               <TableRow>
    //                 <TableCell>Position</TableCell>
    //                 <TableCell>Weight</TableCell>
    //                 <TableCell>Goals</TableCell>
    //                 <TableCell>Assists</TableCell>
    //                 <TableCell>Points</TableCell>
    //                 <TableCell>Games Played</TableCell>
    //               </TableRow>
    //             </TableHead>
    //             <TableBody>
    //               <TableRow>
    //                 <TableCell>{this.state.person_id}</TableCell>
    //                 <TableCell>{this.state.profile.position_id}</TableCell>
    //                 <TableCell>{this.state.profile.birth_date}</TableCell>
    //                 <TableCell>{this.state.profile.points}</TableCell>
    //                 <TableCell>{this.state.profile.wins}</TableCell>
    //                 <TableCell>{this.state.profile.wins}</TableCell>
    //               </TableRow>
    //             </TableBody>
    //           </Table>
    //           <Table>
    //             <TableHead className="table-head">
    //               <TableRow>
    //                 <TableCell>Position</TableCell>
    //                 <TableCell>Weight</TableCell>
    //                 <TableCell>Wins</TableCell>
    //                 <TableCell>Losses</TableCell>
    //                 <TableCell>Ties</TableCell>
    //                 <TableCell>Save %</TableCell>
    //                 <TableCell>Games Played</TableCell>
    //               </TableRow>
    //             </TableHead>
    //             <TableBody>
    //               <TableRow>
    //                 <TableCell>{this.state.person_id}</TableCell>
    //                 <TableCell>{this.state.profile.position_id}</TableCell>
    //                 <TableCell>{this.state.profile.birth_date}</TableCell>
    //                 <TableCell>{this.state.profile.points}</TableCell>
    //                 <TableCell>{this.state.profile.wins}</TableCell>
    //                 <TableCell>{this.state.profile.wins}</TableCell>
    //                 <TableCell>{this.state.profile.wins}</TableCell>
    //               </TableRow>
    //             </TableBody>
    //           </Table>
    //                           <div>
    //               {/* {JSON.stringify(this.props.player)} */}
    //               <Button variant="contained" color="secondary" onClick={this.toggleDisplay}>Edit</Button>
    //             </div>
    //             <div>
    //               <PlayerProfileDialog />
    //             </div>
    //         </Paper>
    //       </div>
    //     </div>

    //   )
    // }

    if (this.state.position_id === '3') {
      positionalContent = (
        <div>
          <div>
            <label>Goalie Options:</label>
            <TextField type="number" label="Wins" value={this.state.profile.wins} onChange={this.handleProfileChange} name="wins" />
            <TextField type="number" label="Losses" value={this.state.profile.losses} onChange={this.handleProfileChange} name="losses" />
            <TextField type="number" label="Ties" value={this.state.profile.ties} onChange={this.handleProfileChange} name="ties" />
          </div>
          <div>
            <TextField type="number" label="Save %" value={this.state.profile.save_percent} onChange={this.handleProfileChange} name="save_percent" />
            <TextField type="number" label="Shutouts" value={this.state.profile.shutouts} onChange={this.handleProfileChange} name="shutouts" />
            <TextField type="number" label="Goals Against" value={this.state.profile.goals_against} onChange={this.handleProfileChange} name="goals_against" />
            <TextField type="number" label="Games Played" value={this.state.profile.games_played} onChange={this.handleProfileChange} name="games_played" />
          </div>
        </div>
      )
    } else if (this.state.profile.position_id === '2' || this.state.profile.position_id === '1') {
      positionalContent = (
        <div>
          <div>
            <label>Skater Options:</label>
            <TextField type="number" label="Goals" value={this.state.profile.goals} onChange={this.handleProfileChange} name="goals" />
            <TextField type="number" label="Assists" value={this.state.profile.assists} onChange={this.handleProfileChange} name="assists" />
            <TextField type="number" label="Points" value={this.state.profile.points} onChange={this.handleProfileChange} name="points" />
          </div>
          <div>
            <TextField type="number" label="Games Played" value={this.state.profile.games_played} onChange={this.handleProfileChange} name="games_played" />
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
              <div>
                <TextField type="text" label="First Name" value={this.state.profile.first_name} onChange={this.handleProfileChange} name="first_name" />
                <TextField type="text" label="Last Name" value={this.state.profile.last_name} onChange={this.handleProfileChange} name="last_name" />
                <TextField type="text" label="School" value={this.state.profile.school} onChange={this.handleProfileChange} name="school" />
                <TextField type="text" label="Team" value={this.state.profile.team_id} onChange={this.handleProfileChange} name="team_id" />
              </div>
              <div>
                <TextField type="text" label="Email" />
                <TextField type="number" label="Phone Number" value={this.state.profile.phone_number} onChange={this.handleProfileChange} name="phone_number" />
                <FormControl>
                  <Select value={this.state.profile.grade} onChange={this.handleProfileChange} name="grade">
                    <MenuItem value="Grade">Grade</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="11">11</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                    <MenuItem value="Graduate">Graduate</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <TextField type="number" label="GPA" value={this.state.profile.gpa} onChange={this.handleProfileChange} name="gpa" />
                <TextField type="text" label="Weight" value={this.state.profile.weight} onChange={this.handleProfileChange} name="weight" />
                <FormControl>
                  <InputLabel>Position</InputLabel>
                  <Select value={this.state.profile.position_id} onChange={this.handleProfileChange} name="position_id">
                    <MenuItem value="1">Forward</MenuItem>
                    <MenuItem value="2">Defence</MenuItem>
                    <MenuItem value="3">Goalie</MenuItem>
                  </Select>
                </FormControl>
                {/* {JSON.stringify(this.state.profile.position_id)} */}
              </div>
              <div>
                <TextField label="Video URL" value={this.state.profile.video_link} onChange={this.handleProfileChange} name="video_link" />
                <FormControl>
                  <InputLabel>League</InputLabel>
                  <Select value={this.state.profile.league_id} onChange={this.handleProfileChange} name="league_id">
                    <MenuItem value="1">1A</MenuItem>
                    <MenuItem value="2">2A</MenuItem>
                    <MenuItem value="3">3A</MenuItem>
                    <MenuItem value="4">4A</MenuItem>
                    <MenuItem value="5">5A</MenuItem>
                    <MenuItem value="6">6A</MenuItem>
                    <MenuItem value="7">7A</MenuItem>
                    <MenuItem value="8">8A</MenuItem>
                    <MenuItem value="9">1AA</MenuItem>
                    <MenuItem value="10">2AA</MenuItem>
                    <MenuItem value="11">3AA</MenuItem>
                    <MenuItem value="12">4AA</MenuItem>
                    <MenuItem value="13">5AA</MenuItem>
                    <MenuItem value="14">6AA</MenuItem>
                    <MenuItem value="15">7AA</MenuItem>
                    <MenuItem value="16">8AA</MenuItem>
                  </Select>
                </FormControl>
                <label>Date Of Birth:</label>
                {/* (WE WILL REPLACE THIS DROP-DOWN WITH A UI-MATERIALS CALENDAR) */}
                <FormControl>
                  <InputLabel>DOB</InputLabel>
                  <Select value={this.state.profile.birth_date} onChange={this.handleProfileChange} name="birth_date">
                    <MenuItem value="1">Jan, 1956</MenuItem>
                    <MenuItem value="2">Feb, 1776</MenuItem>
                    <MenuItem value="3">March, 2012</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <label>Notes:</label>
                <TextField value={this.state.profile.player_info} onChange={this.handleProfileChange} name="player_info" />
              </div>
              {/* we can implempent an image hosting API for client drag/drop HERE \/ */}
              <div>
                <Button variant="contained" color="secondary">Add a pic</Button>
              </div>
              <div>
                {/* <Button variant="contained" color="secondary" type="submit">Submit</Button> */}
              </div>
              <div>
                {positionalContent}
              </div>
            </form>
            {/* <div>
          {playerScreenContent}
        </div> */}
          </div>
        </div>
      );
    }

    // if (this.props.player.length > 0) {

    if (this.state.toggleView === false) {
      return (
        <div>
          {/* {playerScreenContent} */}
        </div>
      )
    } else {

      return (
        <div className="mainContainer">
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
export default connect(mapStateToProps)(PlayerProfilePage);