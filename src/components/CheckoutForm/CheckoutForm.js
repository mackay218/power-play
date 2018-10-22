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

    componentDidUpdate() {
        if (this.state.complete === false && this.props.registered === true)
            this.setState({
                complete: this.props.registered,
            })
    }

    // Function to handle Stripe registration
    handleSubmit = () => {
        this.props.stripe.createToken({ name: "Name" })
            .then((token) => {
                console.log('Token in submit function', token);
                this.props.dispatch({ type: 'CHECKOUT', payload: { token: token.token.id, registerInfo: this.props.registerInfo } });
                swal('Purchase Complete').then(() => {
                    this.props.history.push('/login');
                });
            }).catch((error) => {
                swal('You must enter your credit card information',{ icon: 'error'});
                console.log('error', error);
            })
    }

    // Resets state and sends the user to the login page
    toLogIn = () => {
        this.setState({
            complete: false,
        })
        this.props.dispatch({type: 'RESET_REGISTERED'})
        this.props.history.push('/login');
    }

    render() {
        return (
            // text related to payment form and holds stripe card element 
            <div>
                <h5>Payment Form</h5>
                <p>Sign up for a monthly subscription</p>
                {/* Form for entering credit card information (provided by 'react-stripe-element') */}
                <CardElement />
                <br />
                {/* Button to trigger registration */}
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>Register ($29.95/Month)</Button>
                <div>
                {/* Link to send the ser to the log in [page] */}
                <Link style={{color:"#eb1b3b"}} to="/login">Cancel</Link>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(injectStripe(CheckoutForm));