import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Nav from '../Nav/Nav';
// styling imports
import '../LandingPage/LandingPage.css';

import './TeamsPage.css';

class TeamsPage extends Component{
    toLogin = () => {
        this.props.history.push('login');
    }

    toRegister = () => {
        this.props.history.push('register');
    }

    constructor(props) {
        super(props)
        this.aboutRef = React.createRef();
    }

    scrollPosition = 0

    componentWillReceiveProps() {
        const element = ReactDOM.findDOMNode(this);
        if (element != null) {
            this.scrollPosition = window.scrollY
        }
    }

    componentDidMount() {
        const element = ReactDOM.findDOMNode(this);
        if (element != null) {
            window.scrollTo(0, this.scrollPosition)
        }
    }

    componentDidUpdate() {
        const element = ReactDOM.findDOMNode(this);
        if (element != null) {
            window.scrollTo(0, this.scrollPosition)
        }
    }

    render(){


        return(
            <div className="mainContainer"
                style={{ backgroundImage: 'url("./images/ice-background.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no repeat' }}

            >
                <Nav/>
                <div className="pageContainer">
                    <h1>Teams</h1>
                    <div className="divisionsContainer">
                        <div className="leagueDivision D1">
                            <h2>College D1</h2>
                            <ul>
                                <li>Bemidji State Univeristy</li>
                                <li>Northern Michigan University</li>
                                <li>Western Michigan University</li>
                                <li>American International College</li>
                            </ul>
                        </div>
                        <div className="leagueDivision D3">
                            <h2>College D3</h2>
                            <ul>
                                <li>Augsburg University</li>
                                <li>Aurora University</li>
                                <li>Bethel University</li>
                                <li>Concordia College</li>
                                <li>Gustavus Adolphus College</li>
                                <li>St. John's University</li>
                                <li>St. Mary's University</li>
                                <li>St. Olaf College</li>
                                <li>University of St. Thomas</li>
                                <li>Marian University</li>
                                <li>Trine University</li>
                                <li>St. Scholastica</li>
                                <li>University of Wisconsin Eau Claire</li>
                                <li>Univeristy of Wisconsin Stout</li>
                                <li>University of Wisconsin River Falls</li>
                                <li>Finlandia University</li>
                                <li></li>
                            </ul>
                        </div>
                        <div className="leagueDivision Juniors">
                            <h2>Juniors</h2>
                            <ul>
                                <li>Aberdeen Wings</li>
                                <li>Austin Bruins</li>
                                <li>Chippewa Falls Steel</li>
                                <li>Johnstown Tomahawks</li>
                                <li>Kenai Brown Bears</li>
                                <li>MN Magicians</li>
                                <li>MN Wilderness</li>
                                <li>Minot Minotauros</li>
                                <li>NE Generals</li>
                                <li>Brookings Blizzard</li>
                                <li>Alexandria Blizzard</li>
                                <li>Bozeman Icedogs</li>
                                <li>Breezy Point Stars</li>
                                <li>Granite City Lumberjacks</li>
                                <li>New Ulm Steel</li>
                                <li>North Iowa Bulls</li>
                                <li>Rochester Grizzlies</li>
                                <li>MN Blue Ox</li>
                                <li>MN Mullets</li>
                                <li>Rum River</li>
                                <li>Steele County Blades</li>
                                <li>Hudson Havoc</li>
                                <li>Fort Frances Lakers</li>
                                <li>Tampa Bay Jr. Lightning</li>
                                <li>Oklahoma City Blazers</li>
                                <li>Thief River Falls Norskies</li>
                                <li>Swan Valley Stampeders</li>
                                <li>Steinbach Pistons</li>
                                <li>Winkler Flyers</li>
                                <li>Bonnyville Pontiacs</li>
                                <li>Green Bay Gamblers</li>
                                <li>Madison Capitols</li>
                                <li>Youngstown Phantoms</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default TeamsPage;