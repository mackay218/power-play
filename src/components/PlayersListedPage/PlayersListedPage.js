import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  user: state.user,
  player: state.player.player,
});

class PlayersListedPage extends Component {

  constructor() {
    super();
    this.state = {
      playerName: '',
      position: '',
      skaterPosition: '',
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

  render() {
    let content = null;
    let tableContent = null;
    let formContent = null;
    if (this.state.position === "skater") {
      formContent = (
        <div>
          <select onChange={this.handleChange} name="skaterPosition">
            <option>Position...</option>
            <option>Forward</option>
            <option>Defense</option>
          </select>
          <br />
          <input type="number" onChange={this.handleChange} placeholder="Points Min" name="pointsMin" />
          <input type="number" onChange={this.handleChange} placeholder="Points Max" name="pointsMax" />
          <input type="text" onChange={this.handleChange} placeholder="Birth Year Min" name="birthDayMin" />
          <input type="text" onChange={this.handleChange} placeholder="Birth Year max" name="birthDayMax" />
        </div>
      )
    }
    else if (this.state.position === "goalie") {
      formContent = (
        <div>
          <input type="number" onChange={this.handleChange} placeholder="Wins Min" name="winsMin" />
          <input type="number" onChange={this.handleChange} placeholder="Wins Max" name="winsMax" />
          <input type="text" onChange={this.handleChange} placeholder="Birth Year Min" name="birthDayMin" />
          <input type="text" onChange={this.handleChange} placeholder="Birth Year max" name="birthDayMax" />
        </div>
      )
    }

    if (this.props.user.email && this.props.player) {
      content = (
        <div>
          <h1 className="center-text">Players</h1>
          <form onSubmit={this.sendSortBy}>
            <h3 className="center-text">Search</h3>
            <select value={this.state.position} onChange={this.handleChange} name="position">
              <option value="">All</option>
              <option value="skater">Skaters</option>
              <option value="goalie">Goalies</option>
            </select>
            <input type="text" onChange={this.handleChange} placeholder="Player Name..." name="playerName"/>
            <br />
            {formContent} 
            <button type="submit">Sort</button>
          </form>
          <h3>Skater Results</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>League</th>
                <th>Team</th>
                <th>Birthdate</th>
                <th>Height</th>
                <th>Weight</th>
                <th>GPA</th>
                <th>Goals</th>
                <th>Assists</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {this.props.player.map((player, i) => {
                if (player.position_name === "fwd" || player.position_name === "def") {
                  tableContent = <tr key={i}>
                    <td>{player.first_name} {player.last_name}</td>
                    <td>{player.league_name}</td>
                    <td>{player.team_name}</td>
                    <td>{player.birth_date}</td>
                    <td>{player.height}</td>
                    <td>{player.weight}</td>
                    <td>{player.gpa}</td>
                    <td>{player.goals}</td>
                    <td>{player.assists}</td>
                    <td>{player.points}</td>
                  </tr>
                  return tableContent
                }
                else if (player.position_name === "gol") {
                  tableContent = null;
                  return tableContent;
                }
              })}
            </tbody>
          </table>
          <h3>Goalie Results</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>League</th>
                <th>Team</th>
                <th>Birthdate</th>
                <th>Height</th>
                <th>Weight</th>
                <th>GPA</th>
                <th>Wins</th>
                <th>Save %</th>
                <th>Shutouts</th>
              </tr>
            </thead>
            <tbody>
              {this.props.player.map((player, i) => {
                if (player.position_name === "gol") {
                  tableContent = <tr key={i}>
                    <td>{player.first_name} {player.last_name}</td>
                    <td>{player.league_name}</td>
                    <td>{player.team_name}</td>
                    <td>{player.birth_date}</td>
                    <td>{player.height}</td>
                    <td>{player.weight}</td>
                    <td>{player.gpa}</td>
                    <td>{player.wins}</td>
                    <td>{player.save_percent}</td>
                    <td>{player.shutouts}</td>
                  </tr>
                  return tableContent
                }
                else if (player.position_name === "fwd" || player.position_name === "def") {
                  tableContent = null;
                  return tableContent
                }
              })}
            </tbody>
          </table>
        </div>
      );
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
export default connect(mapStateToProps)(PlayersListedPage);