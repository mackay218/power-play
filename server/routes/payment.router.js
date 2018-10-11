const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


var stripe = require("stripe")("sk_test_XViNXrM3ecY7ZuRpE8KLSoeD");

var customer = await stripe.customers.create(
    { email: 'polarishockey@gmail.com' }
);
// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:

stripe.customers.create({
    email: 'polarishockey@gmail.com'
}).then(function (customer) {
    return stripe.customers.createSource(customer.id, {
        source: 'tok_visa'
    });
}).then(function (source) {
    return stripe.charges.create({
        amount: 2995,
        currency: 'usd',
        customer: source.customer
    });
}).then(function (charge) {
    // New charge created on a new customer
}).catch(function (err) {
    // Deal with an error
});

//Will Timeout the time stripe form is open
stripe.setTimeout(20000); 

const token = request.body.stripeToken; // Using Express

const charge = stripe.charges.create({
    amount: 999,
    currency: 'usd',
    description: 'Example charge',
    source: token,
});






module.exports = router;
