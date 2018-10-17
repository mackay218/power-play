const express = require('express');
const router = express.Router();

//Contains stripe API key
const stripe = require("stripe")(process.env.STRIPE_SK_KEY);


// Simulated cardholder

// const cardholder = stripe.issuing.cardholders.create({
//   name: 'Polar hock',
//   email: 'polar@example.com',
//   phone_number: '+18008675309',
//   status: 'active',
//   type: 'individual',
//   billing: {
//     name: 'Polar Hock',
//     address: {
//       line1: '1234 Main Street',
//       city: 'Minneapolis',
//       state: 'MN',
//       postal_code: '55555',
//       country: 'US',
//     },
//   },
// });




// Simulated card

// const card = stripe.issuing.cards.create({
//   cardholder: 'ich_1Cm3pZIyNTgGDVfzI83rasFP',
//   type: 'virtual',
//   currency: 'usd',
//   status: 'active',
// });



router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    let { status } = await stripe.charges.create({
      amount: 2995,
      currency: "USD",
      description: "Monthly Subscription charge",
      source: req.body.stripeToken
    });

    res.json({ status });
  } catch (err) {
    console.log(err);
    switch (err.code) {
      //Responses to when card error
      case 'incorrect_cvc':
        res.send({ error: err.message });
        break;
      case 'card_declined':
        res.send({ error: err.message })
        break;
      case 'amount_too_small':
        res.send({ error: err.message });
      default:
        res.status(500).end();
        break;
    }

  }
});


module.exports = router;
