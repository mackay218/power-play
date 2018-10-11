
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const playerRouter = require('./routes/player.router');
const coachRouter = require('./routes/coach.router');
const passwordRouter = require('./routes/password.router');
const paymentRouter = require('./routes/payment.router');

//DATABASE MOCK DATA ROUTE - DELETE BEFORE FINAL BUILD
const databaseFaker = require('./routes/databaseFaker.router');
app.use('/api/databaseFaker', databaseFaker);
/********************************************/

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/players', playerRouter);
app.use('/api/coaches', coachRouter);
app.use('/api/password', passwordRouter);
app.use('/api/charges', paymentRouter);

// Serve static files
app.use(express.static('build'));


// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
