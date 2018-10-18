import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import './SetPasswordPage.css';

import Moment from 'moment';
import { extendMoment } from 'moment-range';

import swal from 'sweetalert';

const moment = extendMoment(Moment);




class SetPasswordPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPassword: '',
            confirmPassword: '',
            message: '',
            inviteCode: '',
            expired: true,
        };
    }

    scrollPosition = 0

    componentWillReceiveProps() {
        const element = ReactDOM.findDOMNode(this);
        if (element != null) {
            this.scrollPosition = window.scrollY
        }
    }

    componentDidMount() {
        this.getInviteCode();

        setTimeout(console.log('state', this.state), 1000);

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


    //function to get invite code from url user clicked on in email
    getInviteCode = () => {
        console.log('invite code:', this.props.match.params.inviteCode);

        let inviteCode = this.props.match.params.inviteCode;

        inviteCode = inviteCode.split('');

        let indexToSplit = inviteCode.length - 8;

        inviteCode = inviteCode.slice(indexToSplit);
        inviteCode = inviteCode.join('');
        console.log('joined inviteCode', inviteCode);

        let rightNow = new Date();

        let beginDate = moment(inviteCode, 'MMDDYYYY');
        beginDate = moment(beginDate).format();

        let expireDate = moment(beginDate).add(2, 'days');
        expireDate = moment(expireDate).format();

        console.log('beginDate', beginDate);
        console.log('expireDate', expireDate);

        const range = moment.range(beginDate, expireDate);

        console.log('range', range);

        if (range.contains(rightNow)) {
            console.log('in range');
            this.setState({
                inviteCode: this.props.match.params.inviteCode,
                expired: false,
            });
        }
        else if (range.contains(rightNow) === false) {
            console.log('not in range');
            this.setState({
                inviteCode: this.props.match.params.imviteCode,
                expired: true,
                message: 'Your set/reset password code is expired',
            });
        }
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    setPassword = (event) => {
        console.log('in setPassword');

        event.preventDefault();

        if (this.state.newPassword === '') {
            swal('Please enter a new password' ,
             {icon:'warning'})
        
        }
        else if (this.state.newPassword !== '' && this.state.confirmPassword === '') {
            swal('Please Confirm Password' ,
             {icon:'warning'})
        
        }
        else if (this.state.newPassword !== this.state.confirmPassword) {
            swal('Passwords Do not Match' ,
             {icon:'warning'})
        }
        else {
            const body = {
                inviteCode: this.state.inviteCode,
                password: this.state.newPassword,
            }

            axios.put('/api/password/setPassword', body)
                .then((response) => {
                    
                    if (response.status === 201) {
                        this.props.history.replace('/login');
                        swal('Password Reset Successful' , 
                        {icon:'success'})
                    } else {
                        swal('Unable to reset password. Please Try again.',
                            { icon: 'warning' })
                    }
                })
                .catch((error) => {
                swal('Unable to reset password.',
                        { icon: 'warning' })
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

    render() {

        let passwordForm = null;

        if (this.state.expired === false && this.state.inviteCode) {
            passwordForm = (
                <form class="setPasswordForm" >
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
                            value={this.state.confirmPassword}
                            onChange={this.handleInputChangeFor('confirmPassword')}
                        />
                    </div>
                    <Button onClick={this.setPassword}>Submit</Button>
                </form>
            )
        }

        return (
            <div className="mainContainer">
                <Nav />
                <div className="pageContainer">
                    {this.renderAlert()}
                    {passwordForm}
                </div>
            </div>
        )
    }
}

export default SetPasswordPage;