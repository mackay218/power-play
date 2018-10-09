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

  render() {
    let content = null;
    let formContent = null;
    if (this.state.position_id === "1" || this.state.position_id === "2") {
      formContent = (
        <div>
          <h4 className="center-text">Skater Options</h4>
          <input type="number" onChange={this.handleChange} placeholder="Points Min" name="pointsMin" />
          <input type="number" onChange={this.handleChange} placeholder="Points Max" name="pointsMax" />
          <input type="text" onChange={this.handleChange} placeholder="Birth Year Min" name="birthDayMin" />
          <input type="text" onChange={this.handleChange} placeholder="Birth Year max" name="birthDayMax" />
        </div>
      )
    }
    else if (this.state.position_id === "3") {
      formContent = (
        <div>
          <h4 className="center-text">Goalie Options</h4>
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
          <button onClick={this.logout}>Log Out</button>
          <form onSubmit={this.sendSortBy}>
            <h3 className="center-text">Search Players By:</h3>
            <input type="text" onChange={this.handleChange} placeholder="Player Name..." name="playerName" />
            <span>or </span>
            <select value={this.state.position_id} onChange={this.handleChange} name="position_id">
              <option value="">Position</option>
              <option value="1">Forward</option>
              <option value="2">Defense</option>
              <option value="3">Goalies</option>
            </select>
            <br />
            {formContent}
            <button type="submit">Sort</button>
          </form>
          <h2 className="center-text">Players</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
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
                return (<tr key={i}>
                  <td>{player.first_name} {player.last_name}</td>
                  <td>{player.position_name}</td>
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
                )
              })}
            </tbody>
          </table>
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
export default connect(mapStateToProps)(PlayersListedPage);