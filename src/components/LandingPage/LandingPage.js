import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// styling imports
import '../LandingPage/LandingPage.css';

class LandingPage extends Component {

    toLogin = () => {
        this.props.history.push('login');
    }

    render() {
        return (
            <div className="landingPageContainer">
                <div className="nav">
                
                    <Link to="/register">
                        Register
                </Link>
                    <Link to="/login">
                        Log In
                </Link>
                </div>

                <p>Landing Page</p>

                <div className="missionContainer">
                    <h1 className="missionHeader">
                        A Mission Statement A Mission Statement A Mission Statement</h1>
                    <br></br>
                    <h3 className="missionDetail">
                        We do the things. All the things. All the time.
                        We do the things. All the things. All the time.
                    We do the things. All the things. All the time.</h3>
                </div>
                <div className="guideContainer">

                    <div className="guideSections">
                        <h1 className="guideHeaders">Build Your Profile</h1>
                        <p>Enter your stats.</p>
                    </div>
                    {/* <br></br> */}
                    <span></span>
                    <div className="guideSections">
                        <h1 className="guideHeaders">Showcase Your Talent</h1>
                        <p>Load a clip of your skills in action.</p>
                    </div>
                    {/* <br></br> */}
                    <span></span>
                    <div className="guideSections">
                        <h1 className="guideHeaders">Get Noticed</h1>
                        <p>Your profile will be accessible to coaches across the country.</p>
                    </div>
                </div>

                <div className="aboutContainer">

                    <div className="bioSections">
                        {/* material avatars go here */}
                        <img></img>
                        <p>A bio. An personal epic of Olympian scale.</p>

                    </div>

                    <div className="bioSections">
                        {/* material avatars go here */}
                        <img></img>
                        <p>A bio. An personal epic of Olympian scale.</p>
                    </div>

                    <div className="bioSections">
                        {/* material avatars go here */}
                        <img></img>
                        <p>A bio. An personal epic of Olympian scale.</p>
                    </div>

                </div>

                <button onClick={this.toLogin}>Log In</button>
            </div >
        );
    };
}

export default LandingPage;