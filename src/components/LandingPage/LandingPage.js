import React, { Component } from 'react';

class LandingPage extends Component {

    toLogin = () => {
        this.props.history.push('login');
    }

    render() {
        return (
            <div>
                <p>Landing Page</p>
                <button onClick={this.toLogin}>Log In</button>
            </div>
        );
    };
}

export default LandingPage;