import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import './PlayersListedPage.css';
import DeleteIcon from '@material-ui/icons/Delete';
import {withStyles} from '@material-ui/core/styles';

const mapStateToProps = state => ({
  user: state.user,
  player: state.player.player,
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
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: 'GET_ALL_PLAYERS' });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('landing_page');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    })
  }

  sendSortBy = (event) => {
    event.preventDefault();
    console.log('Sent sort info to server', this.state);
  }

  toPlayerProfile = (id) => {
    //this.props.history.push('admin_page')
    console.log(id);
  }

  deletePlayer = (id) => {
    this.props.dispatch({type: 'DELETE_PLAYER', payload: id});
  }

  render() {
    let content = null;
    let formContent = null;
    let deleteHeader = null;
    let deleteButton = null;

    if (this.props.user.role === "admin") {
      deleteHeader = <CustomTableCell>Delete</CustomTableCell>;
      deleteButton = (id) => {
        return (<CustomTableCell><Button variant="contained" color="secondary"onClick={() => this.deletePlayer(id)}><DeleteIcon />Delete</Button></CustomTableCell>);
      }
    }
    if (this.state.position_id === "1" || this.state.position_id === "2") {
      formContent = (
        <div>
          <h4 className="center-text">Skater Options</h4>
          <TextField type="number" onChange={this.handleChange} label="Points Min" name="pointsMin" />
          <TextField type="number" onChange={this.handleChange} label="Points Max" name="pointsMax" />
          <TextField type="text" onChange={this.handleChange} label="Birth Year Min" name="birthDayMin" />
          <TextField type="text" onChange={this.handleChange} label="Birth Year max" name="birthDayMax" />
        </div>
      )
    }
    else if (this.state.position_id === "3") {
      formContent = (
        <div>
          <h4 className="center-text">Goalie Options</h4>
          <TextField type="number" onChange={this.handleChange} label="Wins Min" name="winsMin" />
          <TextField type="number" onChange={this.handleChange} label="Wins Max" name="winsMax" />
          <TextField type="text" onChange={this.handleChange} label="Birth Year Min" name="birthDayMin" />
          <TextField type="text" onChange={this.handleChange} label="Birth Year max" name="birthDayMax" />
        </div>
      )
    }

    if (this.props.user.email && this.props.player) {
      content = (
        <div>
          <Button variant="contained" color="primary" onClick={this.logout}>Log Out</Button>
          <form className="search-form" onSubmit={this.sendSortBy}>
            <h3 className="center-text">Search Players By:</h3>
                <TextField type="text" label="Player Name" onChange={this.handleChange} name="playerName" />
                <span>or </span>
                <select value={this.state.position_id} onChange={this.handleChange} name="position_id">
                  <option value="">Position</option>
                  <option value="1">Forward</option>
                  <option value="2">Defense</option>
                  <option value="3">Goalies</option>
                </select>
            <br />
            {formContent}
            <Button variant="contained" type="submit">Sort</Button>
          </form>
          <h2 className="center-text">Players</h2>
          <Paper>
            <Table>
              <TableHead className="table-head">
                <TableRow>
                  <CustomTableCell>Name</CustomTableCell>
                  <CustomTableCell>Position</CustomTableCell>
                  <CustomTableCell>Birthdate</CustomTableCell>
                  <CustomTableCell>Points</CustomTableCell>
                  <CustomTableCell>Wins</CustomTableCell>
                  {deleteHeader}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.player.map((player, i) => {
                  return (
                    <TableRow key={i}>
                    <CustomTableCell onClick={() => this.toPlayerProfile(player.id)} >{player.first_name} {player.last_name}</CustomTableCell>
                    <CustomTableCell onClick={() => this.toPlayerProfile(player.id)} >{player.position_name}</CustomTableCell>
                    <CustomTableCell onClick={() => this.toPlayerProfile(player.id)} >{moment(player.birth_date).format('MM/DD/YYYY')}</CustomTableCell>
                    <CustomTableCell onClick={() => this.toPlayerProfile(player.id)} >{player.points}</CustomTableCell>
                    <CustomTableCell onClick={() => this.toPlayerProfile(player.id)} >{player.wins}</CustomTableCell>
                    {deleteButton(player.person_id)}
                  </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      );
    }
    else {
      content = (
        <p>Loading...</p>
      )
    }

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(PlayersListedPage));