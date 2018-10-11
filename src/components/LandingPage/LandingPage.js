import React, { Component } from 'react';
import Nav from  '../Nav/Nav';
// styling imports
import '../LandingPage/LandingPage.css';


class LandingPage extends Component {

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


    // scrollToAbout = () => {
    //      console.log('in scroll click');
    //     const aboutDomNode = ReactDOM.findDOMNode(this.aboutRef.current);
    //     aboutDomNode.scrollIntoView();

    //      window.scrollTo(0, this.aboutRef.current);
    // }

    render() {
        return (
            <div className="mainContainer">
                <Nav />
                <div className="pageContainer">
                    <div className="missionContainer">
                        <img src="images/hockeyGif.gif" alt="hockeyGif" />
                        <div className="missionStatement">
                            <h1 className="missionHeader">
                                A Mission Statement A Mission Statement A Mission Statement</h1>
                            <h3 className="missionDetail">
                                We do the things. All the things. All the time.
                                We do the things. All the things. All the time.
                    We do the things. All the things. All the time.</h3>
                            <h3 className="missionDetail">
                                And we do them well. We do them with gusto. We accomplish them with gravitas.
                    </h3>
                        </div>

                    </div>
                    <div className="guideContainer">
                        <div className="guideSection">
                            <h3 className="guideHeaders">Build Your Profile</h3>
                            <img src="images/profile.svg" alt="profile-icon"/>
                            <p>Enter your stats.</p>
                        </div>
                        <div className="guideSection">
                            <h3 className="guideHeaders">Showcase Your Talent</h3>
                            <img src="images/video-player.svg" alt="video-icon"/>
                            <p>Load a clip of your skills in action.</p>
                        </div>
                        <div className="guideSection">
                            <h3 className="guideHeaders">Get Noticed</h3>
                            <img src="images/search.svg" alt="get-seen-icon"/>
                            <p>Your profile will be accessible to coaches across the country.</p>
                        </div>
                    </div>

                    <div className="testimonialContainer">

                        <div className="testimonialSection">
                            <img src="https://eadb.org/wp-content/uploads/2015/08/profile-placeholder.jpg" alt="placeholder" ></img>
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
                            <img src="https://eadb.org/wp-content/uploads/2015/08/profile-placeholder.jpg" alt="placeholder" ></img>
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
                            <img src="https://eadb.org/wp-content/uploads/2015/08/profile-placeholder.jpg" alt="placeholder" ></img>
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
                            <img alt="bio1"></img>
                            <p>A bio. A personal epic of Olympian scale.
                        <br></br>Avatars go right above this.
                        </p>

                        </div>

                        <div className="bioSections">
                            {/* material avatars go here */}
                            <img alt="bio2"></img>
                            <p>A bio. A personal epic of Olympian scale.
                        <br></br>Avatars go right above this.
                        </p>


                        </div>

                        <div className="bioSections">
                            {/* material avatars go here */}
                            <img alt="bio3"></img>
                            <p>A bio. A personal epic of Olympian scale.<br>
                            </br>Avatars go right above this.</p>
                        </div>

                    </div>
                    <button className="getStarted" onClick={this.toRegister}>Get started!</button>
                    {/* <button onClick={this.toLogin}>Log In</button> */}
                </div >
            </div>
           
        );
    };
}

export default LandingPage;