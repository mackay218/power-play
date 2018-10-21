import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';

const mapStateToProps = state => ({
    registered: state.registered.registered,
})

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = { complete: false };
    }
    // sends token to the server 
    // async submit(ev) {
    //     
    //     let response = await fetch("/charge", {
    //         method: "POST",
    //         body: token.id
    //     });
    //     if (response.ok) console.log("Purchase Complete!")
    //     
    // }

    componentDidUpdate() {
        if (this.state.complete === false && this.props.registered === true)
            this.setState({
                complete: this.props.registered,
            })
    }

    handleSubmit = () => {
        
        this.props.stripe.createToken({ name: "Name" })
            .then((token) => {
                console.log('Token in submit function', token);
                this.props.dispatch({ type: 'CHECKOUT', payload: { token: token.token.id, registerInfo: this.props.registerInfo } });
                swal('Processing transaction').then(() => {
                    this.props.history.push('/login');
                });
            }).catch((error) => {
                swal('You must enter your credit card information',{ icon: 'error'});
                console.log('error', error);
            })
    }

    toLogIn = () => {
        this.setState({
            complete: false,
        })
        this.props.dispatch({type: 'RESET_REGISTERED'})
        this.props.history.push('/login');
    }

    render() {
        let toLogInButton = null
        if (this.state.complete === false) {
            toLogInButton = <Link style={{color:"#eb1b3b"}} to="/login">Cancel</Link>
        }
        else if (this.state.complete === true) {
            toLogInButton = <Button variant="contained" color="primary" onClick={this.toLogIn}>Log In</Button>
        }
        if (this.state.complete === true) return <div><h1>Purchase Complete</h1> {toLogInButton}</div>;
        return (
            // text related to payment form and holds stripe card element 
            <div>
                <h4>Payment Form</h4>
                <p>Sign up for a monthly subscription</p>
                <CardElement />
                <br />
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>Register ($29.95/Month)</Button>
                <div>
                    {toLogInButton}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(injectStripe(CheckoutForm));