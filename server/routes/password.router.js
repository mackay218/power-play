const express = require('express');
// const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const router = express.Router();

const moment = require('moment');

const nodemailer = require("nodemailer");

const Chance = require('chance');
const chance = new Chance();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', //do I need to change this line?
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.my_gmail_email,
        clientId: process.env.my_oauth_client_id,
        clientSecret: process.env.my_oauth_client_secret,
        refreshToken: process.env.my_oauth_refresh_token,
        accessToken: process.env.my_oauth_access_token
    }
});

//function to add new coach and send invite email
//only called by Admin
router.post('/coachInvite', (req, res) => {
    console.log(req.body);

    const coachInfo = req.body;
    
    const coachName = coachInfo.firstName; // this may change depending on client side route

    const emailAddress = coachInfo.emailAddress; //this may change depending on client side route

    const inviteCode = chance.string();

    const role = 'coach'; 

    const statusType = 'pending';
    const reason = 'awaiting response from invite';

    const activityType = 'invite sent';
    const activityTime = new Date();

    (async () => {

        const client = await pool.connect();

        try{
            //insert status for coach in account_status
            let queryText = `INSERT INTO account_status(status_type, reason) 
                                VALUES ($1, $2) RETURNING "id";`;
            let values = [statusType, reason];

            const accountStatusResult = await client.query(queryText, values);

            let accountStatusId = accountStatusResult.rows[0].id;

            queryText = `INSERT INTO activity_log(time, activity_type)
                            VALUES ($1, $2) RETURNING "id";`;
            
            values = [activityTime, activityType];
            
            const activityLogResult = await client.query(queryText, values);

            let activityLogId = activityLogResult.rows[0].id;

            queryText = `INSERT INTO person(email, role, coach_name, invite, status_id, activity_log_id)
                            VALUES ($1, $2, $3, $4, $5, $6,) RETURNING "id";`;
            
            values = [emailAddress, role, coachName, inviteCode, accountStatusId, activityLogId];

            const personResult = await client.query(queryText, values);

            let personId = personResult.rows[0].id;

            await client.query('COMMIT');

            //if creating a coach works call function to send invite
            if(personId.length > 0){    
                this.sendInviteCode(inviteCode);
            }

            res.sendStatus(201);
        }
        catch (error) {
            console.log('ROLLBACK', error);
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }

    })().catch((error) => {
        console.log('CATCH', error);
        res.sendStatus(500);
    });
});

sendInviteCode = (inviteCode) => {

    console.log(inviteCode);

    // const mail = {
    //     from: "Polaris Hockey <polarishockey@gmail.com>",
    //     to: req.body.emailAddress,
    //     subject: "testing nodemailer eh",
    //     text: 'we invite you so join us' + req.body.emailAddress,
    //     html: `<p>testing again eh ${req.body.emailAddress}</p>`
    // }

    // transporter.sendMail(mail, function (error, info) {
    //     if (error) {
    //         console.log('error sending mail:', error);
    //     }
    //     else {
    //         //see https://nodemailer.com/usage
    //         console.log("info.messageId: " + info.messageId);
    //         console.log("info.envelope: " + info.envelope);
    //         console.log("info.accepted: " + info.accepted);
    //         console.log("info.rejected: " + info.rejected);
    //         console.log("info.pending: " + info.pending);
    //         console.log("info.response: " + info.response);
    //     }
    //     transporter.close();
    // });
}

module.exports = router;