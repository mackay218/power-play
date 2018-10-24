import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Nav from '../Nav/Nav';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import moment from 'moment';
import './PlayersListedPage.css';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import PlayerDialog from './PlayerDialogue';
import { CSVLink, } from 'react-csv';
import SuspendIcon from '@material-ui/icons/RemoveCircleOutline';

const mapStateToProps = state => ({
  user: state.user,
  player: state.player.player,
  csv: state.player.csvList,
});
// Custom styles for table data
const CustomTableCell = withStyles(theme => ({
  head: {
    fontSize: 20,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
// Custom styles for entire table 
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class PlayersListedPage extends Component {

  constructor() {
    super();
    this.state = {
      playerName: '',
      position_id: '',
      pointsMin: '',
      winsMin: '',
      birthDayMin: '',
      birthDayMax: '',
      page: 0,
      open: null,
      playerInfoId: null,
    }
  }

  scrollPosition = 0
  // Resets page postion when changing pages
  componentWillReceiveProps() {
    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      this.scrollPosition = window.scrollY
    }
  }

  componentDidMount() {
    // Redirects users to pages based on their role
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('/landing_page');
    }
    if (!this.props.user.isLoading && this.props.user.role === "player") {
      this.props.history.push('/player_profile_page');
    }
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: 'GET_ALL_PLAYERS' });
    this.props.dispatch({ type: 'GET_CSV_LIST' });
    // Resets page postion when changing pages
    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      window.scrollTo(0, this.scrollPosition)
    }
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('landing_page');
    }
    // Resets page postion when changing pages
    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      window.scrollTo(0, this.scrollPosition)
    }
  }
  // Function for handling changes in the search form
  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    })
  }
  // Handle Change for position drop down (resets stat search)
  handlePositionChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
      winsMin: '',
      pointsMin: '',
    })
  }
  // Function for handling searching by name
  handleNameChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
    setTimeout(() => this.props.dispatch({ type: 'SEARCH_BY_NAME', payload: this.state }), 200);
  }
  // Function for handling filtering by stats
  sendSortBy = (event) => {
    event.preventDefault();
    
    this.props.dispatch({ type: 'SORT_PLAYER_BY', payload: this.state });
    this.setState({
      ...this.state,
      page: 0,
    });
  }
  // Function for removing a player from the site
  deletePlayer = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able undo this action!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.dispatch({ type: 'DELETE_PLAYER', payload: id });
        swal('The player was deleted', {
          icon: 'success'
        });
      }
      else {
        swal('The player was not deleted', {
          dangerMode: true,
        });
      }
    })
  }
  // Function for suspending a player
  suspendPlayer = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once suspended, they will not appear in searches!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willSuspend) => {
      if (willSuspend) {
        this.props.dispatch({ type: 'SUSPEND_PLAYER', payload: { id: id, reasons: { reason: 'Coach suspended', reasonBody: '' } } });
        swal('The player was suspended', {
          icon: 'success'
        }).then(() => {
          this.props.dispatch({ type: 'GET_ALL_PLAYERS' })
        });
      }
      else {
        swal('The player was not suspended', {
          dangerMode: true,
        });
      }
    })
  }
  // Function for returning to the previous table page
  previousPage = () => {
    if (this.state.page > 0) {
      this.setState({
        ...this.state,
        page: (this.state.page - 10),
      });
    }
    setTimeout(() => this.props.dispatch({ type: 'SORT_PLAYER_BY', payload: this.state }), 200);
  }
  // Function for going to the next table page
  nextPage = () => {
    this.setState({
      ...this.state,
      page: (this.state.page + 10),
    });
    setTimeout(() => this.props.dispatch({ type: 'SORT_PLAYER_BY', payload: this.state }), 200);
  }
  // Function for opening the player dialog 
  handleClickOpen = (id) => {
    this.setState({
      ...this.state,
      playerInfoId: id,
      open: true
    });
  };
  // Funciton for closing the player dialog
  handleClose = () => {
    this.setState({
      ...this.state,
      open: false
    });
  };

  render() {
    let content = null;
    let formContent = null;
    let deleteHeader = null;
    let suspendHeader = null;
    let playerMap = null;
    const csvData = this.props.csv;
    // Changes the map function to have a delete button if the user is and administrator
    if (this.props.user.role === "admin" && this.props.player) {
      deleteHeader = <CustomTableCell>Delete</CustomTableCell>;
      suspendHeader = <CustomTableCell>Suspend</CustomTableCell>;
      playerMap = (
        <TableBody>
          {this.props.player.map((player) => {
            return (
              <TableRow key={player.id}>
                <CustomTableCell>{player.last_name}, {player.first_name}</CustomTableCell>
                <CustomTableCell>{player.position_name}</CustomTableCell>
                <CustomTableCell>{moment(player.birth_date).format('MM/DD/YYYY')}</CustomTableCell>
                <CustomTableCell>{player.points}</CustomTableCell>
                <CustomTableCell>{player.wins}</CustomTableCell>
                <CustomTableCell><PlayerDialog id={player.person_id} /></CustomTableCell>
                <CustomTableCell>
                  <Button variant="contained" style={{ backgroundColor: "orange", color: "white" }} onClick={() => this.suspendPlayer(player.person_id)}><SuspendIcon /> Suspend</Button>
                </CustomTableCell>
                <CustomTableCell>
                  <Button variant="contained" color="secondary" onClick={() => this.deletePlayer(player.person_id)}><DeleteIcon />Delete</Button>
                </CustomTableCell>
              </TableRow>
            )
          })}
        </TableBody>
      );
    }
    // Sets the map function if the user is a coach
    if (this.props.user.role === "coach" && this.props.player) {
      playerMap = (
        <TableBody>
          {this.props.player.map((player) => {
            return (
              <TableRow key={player.id}>
                <CustomTableCell>{player.last_name}, {player.first_name}</CustomTableCell>
                <CustomTableCell>{player.position_name}</CustomTableCell>
                <CustomTableCell>{moment(player.birth_date).format('MM/DD/YYYY')}</CustomTableCell>
                <CustomTableCell>{player.points}</CustomTableCell>
                <CustomTableCell>{player.wins}</CustomTableCell>
                <CustomTableCell><PlayerDialog id={player.person_id} /></CustomTableCell>
              </TableRow>
            )
          })}
        </TableBody>
      )
    }
    // sets search options based on the position that is chosen
    if (this.state.position_id === "2" || this.state.position_id === "3") {
      formContent = (
        <div className="form-column">
          <h4>Skater Options</h4>
          <div className="position-options">
            <TextField type="number" value={this.state.pointsMin} onChange={this.handleChange} label="Points Scored" name="pointsMin" />
            <TextField type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange} label="Birthdate Min" name="birthDayMin" />
            <TextField type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange} label="Birthdate Max" name="birthDayMax" />
          </div>
        </div>
      )
    }
    else if (this.state.position_id === "4") {
      formContent = (
        <div className="form-column">
          <h4>Goalie Options</h4>
          <div className="position-options">
            <TextField type="number" value={this.state.winsMin} onChange={this.handleChange} label="Games Won" name="winsMin" />
            <TextField type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange} label="Birthdate Min" name="birthDayMin" />
            <TextField type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange} label="Birthdate Max" name="birthDayMax" />
          </div>
        </div>
      )
    }

    if (this.props.user.email && this.props.player) {
      content = (
        <div>
          {/* Form for searching by name/stats */}
          <form className="search-form" onSubmit={this.sendSortBy}>
            {JSON.stringify(this.state)}
            <div className="form-column">
              <h3>Search Players By:</h3>
              <div className="form-container">
                <TextField type="text" label="Last Name" className="input-width" value={this.state.playerName} onChange={this.handleNameChange} name="playerName" />
                <div className="or"><p>or</p></div>
                <FormControl className="input-width">
                  <InputLabel>Position</InputLabel>
                  <Select value={this.state.position_id} inputProps={{ id: 'position-simple' }} onChange={this.handlePositionChange} name="position_id">
                    <MenuItem value="2">Forward</MenuItem>
                    <MenuItem value="3">Defense</MenuItem>
                    <MenuItem value="4">Goalies</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {/* Changes inputs based on chosen position */}
              {formContent}
            </div>
            {/* Button to trigger seach by stats */}
            <Button variant="contained" color="primary" type="submit">Search</Button>
          </form>
          <h2 className="center-text">Players</h2>
          <div className="center-text">
            {/* Link for downloading a csv file of the players list */}
            <CSVLink data={csvData} className="color-red" seperator={","} filename={"hockey-players.csv"} target="_blank">
              <Button variant="contained"
                color="primary">Download Players
              </Button>
            </CSVLink>
          </div>
          <div className="page-buttons">
            {/* Buttons for changing the table page */}
            <Button variant="contained" color="primary" onClick={this.previousPage}>Previous</Button>
            <Button variant="contained" color="primary" onClick={this.nextPage}>Next</Button>
          </div>
          <Paper>
            <Table>
              <TableHead className="table-head">
                <TableRow>
                  <CustomTableCell>Name</CustomTableCell>
                  <CustomTableCell>Position</CustomTableCell>
                  <CustomTableCell>Birthdate</CustomTableCell>
                  <CustomTableCell>Points</CustomTableCell>
                  <CustomTableCell>Wins</CustomTableCell>
                  <CustomTableCell>Player Details</CustomTableCell>
                  {/* Only renders if the user is an administrator */}
                  {suspendHeader}
                  {deleteHeader}
                </TableRow>
              </TableHead>
              {/* Changes based on the role of the user viewing the table */}
              {playerMap}
            </Table>
          </Paper>
          <div className="page-buttons">
            {/* Buttons for changing table pages */}
            <Button variant="contained" color="primary" onClick={this.previousPage}>Previous</Button>
            <Button variant="contained" color="primary" onClick={this.nextPage}>Next</Button>
          </div>
        </div>
      );
    }
    else {
      content = (
        <p>Loading...</p>
      )
    }

    return (
      <div className="mainContainer"
        // Sets the background image of the site
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
export default connect(mapStateToProps)(withStyles(styles)(PlayersListedPage));