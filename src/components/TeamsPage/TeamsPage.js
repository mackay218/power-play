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
                                <li className="team-list">Bemidji State Univeristy</li>
                                <li className="team-list">Northern Michigan University</li>
                                <li className="team-list">Western Michigan University</li>
                                <li className="team-list">American International College</li>
                            </ul>
                        </div>
                        <div className="leagueDivision D3">
                            <h2>College D3</h2>
                            <ul>
                                <li className="team-list">Augsburg University</li>
                                <li className="team-list">Aurora University</li>
                                <li className="team-list">Bethel University</li>
                                <li className="team-list">Concordia College</li>
                                <li className="team-list">Gustavus Adolphus College</li>
                                <li className="team-list">St. John's University</li>
                                <li className="team-list">St. Mary's University</li>
                                <li className="team-list">St. Olaf College</li>
                                <li className="team-list">University of St. Thomas</li>
                                <li className="team-list">Marian University</li>
                                <li className="team-list">Trine University</li>
                                <li className="team-list">St. Scholastica</li>
                                <li className="team-list">University of Wisconsin Eau Claire</li>
                                <li className="team-list">Univeristy of Wisconsin Stout</li>
                                <li className="team-list">University of Wisconsin River Falls</li>
                                <li className="team-list">Finlandia University</li>
                                <li className="team-list"></li>
                            </ul>
                        </div>
                        <div className="leagueDivision Juniors">
                            <h2>Juniors</h2>
                            <ul>
                                <li className="team-list">Aberdeen Wings</li>
                                <li className="team-list">Austin Bruins</li>
                                <li className="team-list">Chippewa Falls Steel</li>
                                <li className="team-list">Johnstown Tomahawks</li>
                                <li className="team-list">Kenai Brown Bears</li>
                                <li className="team-list">MN Magicians</li>
                                <li className="team-list">MN Wilderness</li>
                                <li className="team-list">Minot Minotauros</li>
                                <li className="team-list">NE Generals</li>
                                <li className="team-list">Brookings Blizzard</li>
                                <li className="team-list">Alexandria Blizzard</li>
                                <li className="team-list">Bozeman Icedogs</li>

                                <li className="team-list">Granite City Lumberjacks</li>
                                <li className="team-list">Breezy Point Stars</li>

                                <li className="team-list">New Ulm Steel</li>
                                <li className="team-list">North Iowa Bulls</li>
                                <li className="team-list">Rochester Grizzlies</li>
                                <li className="team-list">MN Blue Ox</li>
                                <li className="team-list">MN Mullets</li>
                                <li className="team-list">Rum River</li>
                                <li className="team-list">Steele County Blades</li>
                                <li className="team-list">Hudson Havoc</li>
                                <li className="team-list">Fort Frances Lakers</li>
                                <li className="team-list">Tampa Bay Jr. Lightning</li>
                                <li className="team-list">Oklahoma City Blazers</li>
                                <li className="team-list">Thief River Falls Norskies</li>
                                <li className="team-list">Swan Valley Stampeders</li>
                                <li className="team-list">Steinbach Pistons</li>
                                <li className="team-list">Winkler Flyers</li>
                                <li className="team-list">Bonnyville Pontiacs</li>
                                <li className="team-list">Green Bay Gamblers</li>
                                <li className="team-list">Madison Capitols</li>
                                <li className="team-list">Youngstown Phantoms</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default TeamsPage;