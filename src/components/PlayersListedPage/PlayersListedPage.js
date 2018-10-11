import React, { Component } from 'react';
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
import moment from 'moment';
import './PlayersListedPage.css';
import DeleteIcon from '@material-ui/icons/Delete';

const mapStateToProps = state => ({
  user: state.user,
  player: state.player.player,
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
      deleteHeader = <TableCell>Delete</TableCell>;
      deleteButton = (id) => {
        return (<TableCell><Button variant="contained" color="secondary"onClick={() => this.deletePlayer(id)}><DeleteIcon />Delete</Button></TableCell>);
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
                  <TableCell>Name</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Birthdate</TableCell>
                  <TableCell>Points</TableCell>
                  <TableCell>Wins</TableCell>
                  {deleteHeader}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.player.map((player, i) => {
                  return (
                    <TableRow key={i}>
                    <TableCell onClick={() => this.toPlayerProfile(player.id)} >{player.first_name} {player.last_name}</TableCell>
                    <TableCell onClick={() => this.toPlayerProfile(player.id)} >{player.position_name}</TableCell>
                    <TableCell onClick={() => this.toPlayerProfile(player.id)} >{moment(player.birth_date).format('MM/DD/YYYY')}</TableCell>
                    <TableCell onClick={() => this.toPlayerProfile(player.id)} >{player.points}</TableCell>
                    <TableCell onClick={() => this.toPlayerProfile(player.id)} >{player.wins}</TableCell>
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
      <div className="mainContainer">
        <Nav />
        <div className="pageContainer">
          {content}
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PlayersListedPage);