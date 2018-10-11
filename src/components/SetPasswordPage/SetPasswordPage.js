import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';

class SetPasswordPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPassword: '',
            confirmPassword: '',
            message: '',
            inviteCode: '',
        };
    }

    componentDidMount(){
        this.getInviteCode();
    }


    //function to get invite code from url user clicked on in email
    getInviteCode = () => {
        console.log('invite code:', this.props.match.params.inviteCode);
        
        this.setState({
            inviteCode: this.props.match.params.inviteCode
        });
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    setPassword = (event) => {
        event.preventDefault();

        if (this.state.newPassword === ''){
            this.setState({
                message: 'Please enter a new password.'
            });
        }
        else if(this.state.newPassword != '' && this.state.confirmPassword === ''){
            this.setState({
                message: 'Please confirm password.'
            });
        }
        else if(this.state.newPassword != this.state.confirmPassword){
            this.setState({
                message: 'Passwords do not match.'
            });
        }
        else{
            const body = {
                inviteCode: this.state.inviteCode,
                password: this.state.newPassword,
            }

            axios.put('/api/password/setPassword', body)
                .then((response) => {
                    if(response.status === 201){
                        this.props.history.replace('/login');
                    } else {
                        this.setState({
                            message: 'Resetting password failed please try again.'
                        });
                    }
                })
                .catch((error) => {
                    this.setState({
                        message: 'Ooops! Something went wrong! Is the server running?'
                    });
                });
        }
    } //end setPassword


    renderAlert() {
        if (this.state.message !== '') {
            return (
                <h2
                    className="alert"
                    role="alert"
                >
                    {this.state.message}
                </h2>
            );
        }
        return (<span />);
    }

    render(){
        return(
            <div>
                <Nav />
                {this.renderAlert()}
                <form onSubmit={this.setPassword} >
                    <h1>Set Password</h1>
                    <div>
                        <label htmlFor="newPassword">
                            new password
                            <input
                                type="password"
                                name="newPassword"
                                value={this.state.newPassword}
                                onChange={this.handleInputChangeFor('newPassword')}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">
                            new password
                            <input
                                type="password"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.handleInputChangeFor('confirmPassword')}
                            />
                        </label>
                    </div>
                    <button >Submit</button>
                </form>
            </div>


        )
    }

}

export default SetPasswordPage;