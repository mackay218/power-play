const express = require('express');
const router = express.Router();

//Contains stripe API key
const stripe = require("stripe")(process.env.STRIPE_SK_KEY);

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    let { status } = await stripe.charges.create({
      amount: 29,
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
        break;
        case '':



      default:
        res.status(500).end();
        break;
    }

  }
});


module.exports = router;
