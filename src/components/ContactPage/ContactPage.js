import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './ContactPage.css';


class ContactPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            emailMessage: '',
            message: '',
        }
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

    //function to save input in local state
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    //function to send message to server
    submitForm = (event) => {
        event.preventDefault();

        if(this.state.name.length === 0 || this.state.email.length === 0 ||
            this.state.emailMessage.length === 0){
            this.setState({
                message: 'Please fill out all fields.',
            });
        }
        else{
            axios.post('/api/contact', this.state)
                .then((response) => {
                    console.log(response);
                    //clear form
                    this.setState({
                        name: '',
                        email: '',
                        emailMessage: '',
                        message: '',
                    });
                })
                .catch((error) => {
                    console.log('error sending message:', error);
                });
        }
    }


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
            <div className="mainContainer"
                style={{ backgroundImage: 'url("./images/ice-background.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no repeat' }}
            >
                <Nav/>
                <div className="pageContainer">
                    {this.renderAlert()}
                    <form className="contactForm">
                        <h1>Contact</h1>
                        <TextField
                            type="text"
                            label="Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleInputChangeFor('name')}
                            style={{ width: 200 }}
                        ></TextField>
                        <TextField
                            type="email"
                            label="Email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChangeFor('email')}
                            style= {{width: 200}}
                        ></TextField>
                        <TextField
                            type="text"
                            label="Message"
                            name="message"
                            value={this.state.emailMessage}
                            onChange={this.handleInputChangeFor('emailMessage')}
                            style= {{width: 400}}
                        ></TextField>
                        <Button className="contactSend" onClick={this.submitForm}>Send</Button>
                    </form>
                </div>
            </div>
       

        );
    }
}

export default connect()(ContactPage);