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

const mapStateToProps = state => ({
  user: state.user,
  player: state.player.player,
  csv: state.player.csvList,
});

const CustomTableCell = withStyles(theme => ({
  head: {
    fontSize: 20,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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
      pointsMax: '',
      winsMin: '',
      winsMax: '',
      birthDayMin: '',
      birthDayMax: '',
      page: 0,
      open: null,
      playerInfoId: null,
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
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('/landing_page');
    }
    if (!this.props.user.isLoading && this.props.user.role === "player") {
      this.props.history.push('/player_profile_page');
    }
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: 'GET_ALL_PLAYERS' });
    this.props.dispatch({ type: 'GET_CSV_LIST'});

    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      window.scrollTo(0, this.scrollPosition)
    }
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('landing_page');
    }

    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      window.scrollTo(0, this.scrollPosition)
    }
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    })
  }

  handleNameChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
    setTimeout(() => this.props.dispatch({type: 'SEARCH_BY_NAME', payload: this.state}), 200);
  }

  sendSortBy = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      page: 0,
    });
    this.props.dispatch({ type: 'SORT_PLAYER_BY', payload: this.state });
  }

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

  previousPage = () => {
    if (this.state.page > 0) {
      this.setState({
        ...this.state,
        page: (this.state.page - 10),
      });
    }
    setTimeout(() => this.props.dispatch({ type: 'SORT_PLAYER_BY', payload: this.state }), 200);
  }

  nextPage = () => {
    this.setState({
      ...this.state,
      page: (this.state.page + 10),
    });
    setTimeout(() => this.props.dispatch({ type: 'SORT_PLAYER_BY', payload: this.state }), 200);
  }

  handleClickOpen = (id) => {
    this.setState({
      ...this.state,
      playerInfoId: id,
      open: true
    });
  };

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
    let playerMap = null;
    const csvData = this.props.csv;

    if (this.props.user.role === "admin" && this.props.player) {
      deleteHeader = <CustomTableCell>Delete</CustomTableCell>;
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
                <CustomTableCell><PlayerDialog id={player.id} /></CustomTableCell>
                <CustomTableCell>
                  <Button variant="contained" color="secondary" onClick={() => this.deletePlayer(player.person_id)}><DeleteIcon />Delete</Button>
                </CustomTableCell>
              </TableRow>
            )
          })}
        </TableBody>
      );
    }
    if (this.props.user.role === "coach" && this.props.player) {
      playerMap = (
        <TableBody>
          {this.props.player.map((player) => {
            return (
              <TableRow key={player.id}>
                <CustomTableCell>{player.first_name} {player.last_name}</CustomTableCell>
                <CustomTableCell>{player.position_name}</CustomTableCell>
                <CustomTableCell>{moment(player.birth_date).format('MM/DD/YYYY')}</CustomTableCell>
                <CustomTableCell>{player.points}</CustomTableCell>
                <CustomTableCell>{player.wins}</CustomTableCell>
                <CustomTableCell><PlayerDialog id={player.id} /></CustomTableCell>
              </TableRow>
            )
          })}
        </TableBody>
      )
    }

    if (this.state.position_id === "1" || this.state.position_id === "2") {
      formContent = (
        <div className="form-column">
          <h4>Skater Options</h4>
          <div className="position-options">
            <TextField type="number" onChange={this.handleChange} label="Points Min" name="pointsMin" />
            <TextField type="number" onChange={this.handleChange} label="Points Max" name="pointsMax" />
            <TextField type="text" onChange={this.handleChange} label="Birthdate Min" name="birthDayMin" />
            <TextField type="text" onChange={this.handleChange} label="Birthdate Max" name="birthDayMax" />
          </div>
        </div>
      )
    }
    else if (this.state.position_id === "3") {
      formContent = (
        <div className="form-column">
          <h4>Goalie Options</h4>
          <div className="position-options">
            <TextField type="number" onChange={this.handleChange} label="Wins Min" name="winsMin" />
            <TextField type="number" onChange={this.handleChange} label="Wins Max" name="winsMax" />
            <TextField type="text" onChange={this.handleChange} label="Birthdate Min" name="birthDayMin" />
            <TextField type="text" onChange={this.handleChange} label="Birthdate Max" name="birthDayMax" />
          </div>
        </div>
      )
    }

    if (this.props.user.email && this.props.player) {
      content = (
        <div>
          <form className="search-form" onSubmit={this.sendSortBy}>
            <div className="form-column">
              <h3>Search Players By:</h3>
              <div className="form-container">
                <TextField type="text" label="Last Name" className="input-width" value={this.state.playerName} onChange={this.handleNameChange} name="playerName" />
                <div className="or"><p>or</p></div>
                <FormControl className="input-width">
                  <InputLabel>Position</InputLabel>
                  <Select value={this.state.position_id} inputProps={{ id: 'position-simple' }} onChange={this.handleChange} name="position_id">
                    <MenuItem value="1">Forward</MenuItem>
                    <MenuItem value="2">Defense</MenuItem>
                    <MenuItem value="3">Goalies</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {formContent}
            </div>
            <Button variant="contained" type="submit">Search</Button>
          </form>
          <h2 className="center-text">Players</h2>
          <div className="page-buttons">
            <Button variant="contained" onClick={this.previousPage}>Previous</Button>
            <CSVLink data={csvData} className="color-red" seperator={","} filename={"hockey-players.csv"} target="_blank">Download Players</CSVLink>
            <Button variant="contained" onClick={this.nextPage}>Next</Button>
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
                  {deleteHeader}
                </TableRow>
              </TableHead>
              {playerMap}
            </Table>
          </Paper>
          <div className="page-buttons">
            <Button variant="contained" onClick={this.previousPage}>Previous</Button>
            <Button variant="contained" onClick={this.nextPage}>Next</Button>
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