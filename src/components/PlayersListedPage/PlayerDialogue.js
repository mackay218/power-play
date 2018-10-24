import React, { Component } from 'react';
import { connect } from 'react-redux';

//dialog for forgot password 
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import Nav from '../Nav/Nav';


const mapStateToProps = state => ({
  user: state.user,
  info: state.player.playerInfo,
});

class PlayerDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }
  // Funciton for opening the player dialog
  handleClickOpen = (id) => {
    console.log('handleClickOpen', id);
    this.props.dispatch({ type: 'GET_PLAYER_INFO', payload: id });
    this.setState({ open: true });
    //console.log(id, this.state);
  };
  // Function for closing the player dialog
  handleClose = () => {
    this.setState({ open: false });
    this.props.dispatch({type: 'RESET_PLAYER_INFO'});
  };

  render() {
    let positionInfo = null;

    //placeholder profile pic
    let profilePic = (
      <img src="https://eadb.org/wp-content/uploads/2015/08/profile-placeholder.jpg"
        alt="placeholder" />
    )
    // Sets the video settings
    let videoPlayer = (
      <iframe id="player" type="text/html" width="426" height="260"
        allowFullScreen="allowFullScreen"
        src="http://www.youtube.com/embed/a8rRW5Ugg0I?enablejsapi=1&origin=http://example.com"
        frameBorder="0"
        title="defaultVideo"
        >
      </iframe>
    )
    // if the player has uploaded a video, sets the video player to play that video
    if(this.props.info.video_link){
      let videoCode = this.props.info.video_link;
      
      videoCode = videoCode.split('=');
      videoCode = videoCode[1];

      // Injects the players videocode into the url
      let videoUrl = `http://www.youtube.com/embed/${videoCode}?enablejsapi=1&origin=http://example.com`;

      videoPlayer = (
        <iframe id="player" type="text/html" width="426" height="260"
          allowFullScreen="allowFullScreen"
          src={videoUrl}
          frameBorder="0"
          title="playerVideo"
          >
        </iframe>
      )

    }
    // If the user has uploaded an image, sets the placeholder image to their image
    if(this.props.info.image_path){
      profilePic = (
        <img src={this.props.info.image_path} alt="profile pic"/>
      )
    }
    // Changes information displayed based on hockey postion
    if (this.props.info.position_name === "Forward" || this.props.info.position_name === "Defense") {
      positionInfo = (
        <div>
          <p>Goals: {this.props.info.goals}</p>
          <p>Assists: {this.props.info.assists}</p>
          <p>Points: {this.props.info.points}</p>
        </div>
      )
    }
    else if (this.props.info.position_name === "Goalie") {
      positionInfo = (
        <div>
          <p>Save Percent: {this.props.info.save_percent}</p>
          <p>Games_played: {this.props.info.games_played}</p>
          <p>Wins: {this.props.info.wins}</p>
          <p>Losses: {this.props.info.losses}</p>
          <p>Ties: {this.props.info.ties}</p>
          <p>Shutouts: {this.props.info.shutouts}</p>
          <p>Goals Against: {this.props.info.goals_against}</p>
        </div>
      )
    }
    return (
      <div>
        {/* Button to open the player dialog */}
        <Button variant="contained" color="primary" onClick={() => { this.handleClickOpen(this.props.id) }}>View details</Button>
        <Dialog fullScreen open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <Nav />
          <div className="dialog">
            <DialogActions>
              {/* Button to close the player dialog */}
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </DialogActions>
            <h2 className="dialog-head center" >{this.props.info.last_name}, {this.props.info.first_name}</h2>
            <div>
              {/* Grid container that holds all the player information */}
              <Grid container className="dialog-body" >
                  <div className="profileMedia">
                    <div className="profilePicContainer">
                      {profilePic}
                    </div>
                    <div className="videoContainer">
                      {videoPlayer}
                    </div>
                  </div>
             
                <Grid className="left" item md={4}>
                  <h3 className="dialog-head center">Position Info</h3>
                  <p>Position: {this.props.info.position_name}</p>
                  <p>League: {this.props.info.league_name}</p>
                  <p>Team: {this.props.info.team_name}</p>
                  {positionInfo}
                </Grid>
                <Grid className="left" item md={4}>
                  <h3 className="dialog-head">Personal Info</h3>
                  <p>Birthdate: {moment(this.props.info.birth_date).format('MM/DD/YYYY')}</p>
                  <p>School: {this.props.info.school_name}</p>
                  <p>Height: {this.props.info.height}</p>
                  <p>Weight: {this.props.info.weight}</p>
                  <p>GPA: {this.props.info.gpa}</p>
                  <p>ACT Score: {this.props.info.act_score}</p>
                  <p>School Year: {this.props.info.school_year}</p>
                  <p>Player Bio: {this.props.info.player_info}</p>
                </Grid>
                <Grid className="left" item md={4}>
                  <h3 className="dialog-head center">Contact Info</h3>
                  <p>Email: {this.props.info.email}</p>
                  <p>Phone#: {this.props.info.phone_number}</p>
                </Grid>
              </Grid>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PlayerDialog);