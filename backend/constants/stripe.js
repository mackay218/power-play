const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? 'sk_test_XViNXrM3ecY7ZuRpE8KLSoeD'
    : 'sk_test_XViNXrM3ecY7ZuRpE8KLSoeD';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;