const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_dUQIFPQY2uUrRFrCBqQkufhY'
  : 'pk_test_dUQIFPQY2uUrRFrCBqQkufhY';

export default STRIPE_PUBLISHABLE;