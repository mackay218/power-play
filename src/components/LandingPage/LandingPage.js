import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Nav from  '../Nav/Nav';
// styling imports
import '../LandingPage/LandingPage.css';
import Button from '@material-ui/core/Button';


class LandingPage extends Component {

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


    toLogin = () => {
        this.props.history.push('login');
    }

    toRegister = () => {
        this.props.history.push('register');
    }

    toProfile = () => {
        this.props.history.push('register');
    }

    constructor(props) {
        super(props)
        this.aboutRef = React.createRef();
    }


    // scrollToAbout = () => {
    //      console.log('in scroll click');
    //     const aboutDomNode = ReactDOM.findDOMNode(this.aboutRef.current);
    //     aboutDomNode.scrollIntoView();

    //      window.scrollTo(0, this.aboutRef.current);
    // }

    render() {
        return (
            <div className="mainContainer"
                style={{ backgroundImage: 'url("./images/ice-background.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no repeat' }}
                >
                <Nav />
                <div className="pageContainer">
                    <div className="missionContainer">
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
                                <img className="arrow" src="images/right-arrow.svg"></img>
                                <div className="guideSection" onClick={this.toRegister}>
                                    <h3 className="guideHeaders">Showcase Your Talent</h3>
                                    <img className="guideImg" src="images/video-player.svg" alt="video-icon" />
                                    <p>Load a clip of your skills in action.</p>
                                </div>
                                <img className="arrow" src="images/right-arrow.svg"></img>
                                <div className="guideSection" onClick={this.toRegister}>
                                    <h3 className="guideHeaders">Get Noticed</h3>
                                    <img className="guideImg" src="images/recruitment.svg" alt="get-seen-icon" />
                                    <p>Your profile will be accessible to coaches across the country.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="testimonialContainer">
                        <div className="testimonialSection">
                            <div className="pictureFrame">
                                <img src="images/Chris-Amsden.jpg" alt="placeholder" />
                            </div>
                            <h4>Chris Amsden</h4>
                            <p>"Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat cupidatat
                                non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum."
                            </p>
                        </div>
                        <div className="testimonialSection">
                            <div className="pictureFrame">
                                <img src="images/Justin-Daly.jpg" alt="placeholder" ></img>
                            </div>
                            <h4>Justin Daly</h4>
                            <p>"Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat cupidatat
                                non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum."
                            </p>
                        </div>
                        <div className="testimonialSection">
                            <div className="pictureFrame">
                                <img src="images/Sean-Lang.jpg" alt="placeholder" ></img>
                            </div>
                            <h4>Sean Lang</h4>
                            <p>"Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat cupidatat
                                non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum."
                            </p>
                        </div>
                    </div>
                    <div className="aboutContainer" id="#aboutNavigate"
                        ref={aboutRef => this.aboutRef = aboutRef}>

                        <div className="bioSections">
                            {/* material avatars go here */}
                            <img src="images/founders.jpg" alt="bio1" width="450px" height="300px"/>
                            <br />
                            <span><b style={{fontSize: '20px'}}>Logan Sharp(Vice President), Mike Bowman (President), and Austin Hill(Chief Operating Officer)</b>
                            <br />are the founders of Power Play Recruiting, a revolutionary online scouting servive that helps
                            <br />connect coaches to hockey players. With over 60 years of experience playing, coaching, and
                            <br />scouting at all levels of hockey - from youth ti professional, we have been furthering hockey
                            <br />players careers at all levels for many years, through our large and trusted network of coaches
                            <br />and hockey insiders. We look forward to the opportunity to serve and assist in your hockey journey!</span>
                        </div>
                    </div>
                    <Button variant="contained" color="primary" className="getStarted" onClick={this.toRegister}>Get started!</Button>
                    <br />
                </div >
            </div>
           
        );
    };
}

export default LandingPage;