import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import './SetPasswordPage.css';

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
            <div className="mainContainer">
                <Nav />
                <div className="pageContainer">
                    {this.renderAlert()}
                    <form class="setPasswordForm" onSubmit={this.setPassword} >
                        <h1>Set Password</h1>
                        <div>
                            <TextField 
                                type="password"
                                name="newPassword"
                                label="new password"
                                value={this.state.newPassword}
                                onChange={this.handleInputChangeFor('newPassword')}
                            />
                        </div>
                        <div>
                            <TextField
                                type="password"
                                name="newPassword"
                                label="confirm password"
                                value={this.state.newPassword}
                                onChange={this.handleInputChangeFor('conformPassword')}
                            />
                        </div>
                        <Button >Submit</Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default SetPasswordPage;