const express = require('express');
const router = express.Router();

//Contains stripe API key
const stripe = require("stripe")(process.env.STRIPE_SK_KEY);

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    let {status} = await stripe.charges.create({
      amount: 2995,
      currency: "usd",
      description: "Monthly Subscription charge",
      source: req.body.stripeToken
    });

    res.json({status});
  } catch (err) {
    console.log(err);
    switch(err.code) {
      case 'incorrect_cvc':
        res.send({error: err.message});
        break;
      default: 
        res.status(500).end();
      break;
    }
  }
});


module.exports = router;
