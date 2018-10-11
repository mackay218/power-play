import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';

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


    handleSubmit = () => {
        this.props.stripe.createToken({ name: "Name" })
            .then((token) => {
                console.log('Token in submit funk' , token);
                axios({
                    method: 'POST',
                    url: 'api/charge',
                    data: {stripeToken: token.token.id}
                }).then((response) => {
                    // check for errors in the response
                    


                    
                    // if no errors, move on
                    console.log('Sent successfully', response)
                    this.setState({ complete: true });
                }).catch((error) => {
                    console.log(error, 'error')
                })
            });
    }


    render() {
        if (this.state.complete) return <h1>Purchase Complete</h1>;
        return (
            // text related to payment form and holds stripe card element 
            <div className="checkout">
                <h4>Payment Form</h4>
                <p>Would you like to sign up for a monthly subscription - PPR?</p>
                <CardElement />
                <button className="payButton" onClick={this.handleSubmit}>Pay $29.95</button>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);