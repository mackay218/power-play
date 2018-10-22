import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Nav from '../Nav/Nav';
// styling imports
import '../LandingPage/LandingPage.css';
import Button from '@material-ui/core/Button';


class LandingPage extends Component {

    scrollPosition = 0

    // Resets page position when changing pages
    componentWillReceiveProps() {
        const element = ReactDOM.findDOMNode(this);
        if (element != null) {
            this.scrollPosition = window.scrollY
        }
    }
    // Resets page position when changing pages
    componentDidMount() {
        const element = ReactDOM.findDOMNode(this);
        if (element != null) {
            window.scrollTo(0, this.scrollPosition)
        }
    }
    // Resets page position when changing pages
    componentDidUpdate() {
        const element = ReactDOM.findDOMNode(this);
        if (element != null) {
            window.scrollTo(0, this.scrollPosition)
        }
    }

    // Function to send the user to the login page
    toLogin = () => {
        this.props.history.push('login');
    }
    // Function to send the user to the registration page
    toRegister = () => {
        this.props.history.push('register');
    }
    // Function to send the user to the register page (should be replaced with to profile during refactoring)
    toProfile = () => {
        this.props.history.push('register');
    }

    constructor(props) {
        super(props)
        this.aboutRef = React.createRef();
    }

    render() {
        return (
            <div className="mainContainer"
                // Sets the background image of the site
                style={{ backgroundImage: 'url("./images/ice-background.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no repeat' }}
            >   
                {/* renders the navigation bar */}
                <Nav />
                <div className="pageContainer">
                    <div className="missionContainer">
                        {/* Container for the sites mission statement and background gif */}
                        <img className="hockeyGif" src="images/hockeyGif.gif" alt="hockeyGif" />
                        <div className="missionStatement">
                            <h1 className="missionHeader">
                                POWER PLAY RECRUITING
                            </h1>
                            <h3 className="missionDetail">
                                Let us be your extra man!
                            </h3>
                            <h3 className="missionDetail">
                                Our mission is to connect players with appropriate teams to further their hockey careers!!
                            </h3>
                            <div className="guideContainer" >
                                <div className="guideSection" onClick={this.toRegister}>
                                    <h3 className="guideHeaders">Build Your Profile</h3>
                                    <img className="guideImg" src="images/profile.svg" alt="profile-icon" />
                                    <p>Enter your stats.</p>
                                </div>
                                <img className="arrow" src="images/right-arrow.svg" alt="arrow"></img>
                                <div className="guideSection" onClick={this.toRegister}>
                                    <h3 className="guideHeaders">Showcase Your Talent</h3>
                                    <img className="guideImg" src="images/video-player.svg" alt="video-icon" />
                                    <p>Load a clip of your skills in action.</p>
                                </div>
                                <img className="arrow" src="images/right-arrow.svg" alt="arrow"></img>
                                <div className="guideSection" onClick={this.toRegister}>
                                    <h3 className="guideHeaders">Get Noticed</h3>
                                    <img className="guideImg" src="images/recruitment.svg" alt="get-seen-icon" />
                                    <p>We work with coaches across the country</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="testimonialContainer">
                        {/* Container for player testimonials */}
                        <div className="testimonialSection">
                            <div className="pictureFrame">
                                <img src="images/Chris-Amsden.jpg" alt="placeholder" />
                            </div>
                            <h4>Chris Amsden</h4>
                            <p>
                                St. Peter Highschool
                            </p>
                            <p>
                                Gustavus Adolphus College
                            </p>
                        </div>
                        <div className="testimonialSection">
                            <div className="pictureFrame">
                                <img src="images/Justin-Daly.jpg" alt="placeholder" ></img>
                            </div>
                            <h4>Justin Daly</h4>
                            <p>
                                Delano High School
                            </p>
                            <p>
                                Kenal River Brown Bears
                            </p>
                        </div>
                        <div className="testimonialSection">
                            <div className="pictureFrame">
                                <img src="images/Sean-Lang.jpg" alt="placeholder" ></img>
                            </div>
                            <h4>Sean Lang</h4>
                            <p>
                                Apple Valley Highschool
                            </p>
                            <p>
                                St. John's University
                            </p>
                        </div>
                    </div>
                    <div className="aboutContainer" id="#aboutNavigate"
                        ref={aboutRef => this.aboutRef = aboutRef}>

                        <div className="bioSections">
                            {/* Container for founders bio */}
                            <img className="founderPic" src="images/founders.jpg" alt="bio1" width="450px" height="300px" />
                            <br />
                            <span><b style={{ fontSize: '20px' }}>Logan Sharp(Vice President), Mike Bowman (President), and Austin Hill(Chief Operating Officer)</b>
                                <br />are the founders of Power Play Recruiting, a revolutionary online scouting service that helps
                            <br />connect coaches to hockey players. With over 60 years of experience playing, coaching, and
                            <br />scouting at all levels of hockey - from youth ti professional, we have been furthering hockey
                            <br />players careers at all levels for many years, through our large and trusted network of coaches
                            <br />and hockey insiders. We look forward to the opportunity to serve and assist in your hockey journey!</span>
                        </div>
                    </div>
                    {/* Button for sending the user to the registration page */}
                    <Button variant="contained" color="primary" className="getStarted" onClick={this.toRegister}>Get started!</Button>
                    <br />
                </div >
            </div>

        );
    };
}

export default LandingPage;